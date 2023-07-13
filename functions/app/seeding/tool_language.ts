import { faker } from "@faker-js/faker";
import { GET_ALL_LANGUAGE_IDS } from "../graphql/languages";
import { Mutation_RootInsert_Tool_Languages_OneArgs, Query_Root } from "../graphql/schema.graphql";
import { GET_ALL_TOOL_IDS } from "../graphql/tools";
import { useUrqlClient } from "../urql/useUrqlClient";

type ReturnType = Mutation_RootInsert_Tool_Languages_OneArgs["object"];

const toolIds = [];
const languageIds = [];

async function fetchData() {
    if (toolIds.length > 0 && languageIds.length > 0) {
        return true;
    }
    toolIds.push(...(await useUrqlClient().query<Query_Root>(GET_ALL_TOOL_IDS, {})).data.tools.map((t) => t.id));
    languageIds.push(...(await useUrqlClient().query<Query_Root>(GET_ALL_LANGUAGE_IDS, {})).data.languages.map((c) => c.id));
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