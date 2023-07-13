import { faker } from "@faker-js/faker";
import { GET_ALL_LANGUAGE_IDS } from "../graphql/languages";
import { Mutation_RootInsert_Tool_Languages_OneArgs, Query_Root } from "../graphql/schema.graphql";
import { GET_ALL_TOOL_IDS } from "../graphql/tools";
import { useUrqlClient } from "../urql/useUrqlClient";
import { DELETE_ALL_TOOL_LANGUAGES, INSERT_TOOL_LANGUAGES } from "../graphql/tool_languages";

type ReturnType = Mutation_RootInsert_Tool_Languages_OneArgs["object"];

let toolIds = [];
let languageIds = [];

async function fetchData() {
    if (toolIds.length > 0 && languageIds.length > 0) {
        return true;
    }
    toolIds.push(...(await useUrqlClient().query<Query_Root>(GET_ALL_TOOL_IDS, {}, {
        requestPolicy: "network-only"
    })).data.tools.map((t) => t.id));
    languageIds.push(...(await useUrqlClient().query<Query_Root>(GET_ALL_LANGUAGE_IDS, {}, {
        requestPolicy: "network-only"
    })).data.languages.map((c) => c.id));
    return toolIds.length > 0 && languageIds.length > 0;
}

export async function fakeToolLanguage(merge?: Partial<ReturnType>): Promise<ReturnType> {
    if (!(await fetchData())) {
        throw new Error("Failed to fetch data");
    }
    const out: Partial<ReturnType> = {};
    out.language_id = faker.helpers.arrayElement(languageIds);
    out.tool_id = faker.helpers.arrayElement(toolIds);

    return {
        ...out,
        ...merge
    }   
}

export async function deleteAllToolLanguages() {
    const result = await useUrqlClient().mutation(DELETE_ALL_TOOL_LANGUAGES, {});
    return result;
}

export async function seedToolLanguages(count: number) {
    const objects = [];
    for(let i = 0; i < count; i++) {
        objects.push(await fakeToolLanguage());
    }
    const { data, error } = await useUrqlClient().mutation(INSERT_TOOL_LANGUAGES, {
        objects,
    });
    // clear fetched data
    toolIds = [];
    languageIds = [];

    return {
        toolLanguageData: data,
        toolLanguageError: error
    };
}