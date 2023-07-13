import { GET_ALL_CATEGORY_IDS } from "../graphql/categories";
import { Mutation_RootInsert_Tool_Categories_OneArgs, Query_Root } from "../graphql/schema.graphql";
import { DELETE_ALL_TOOL_CATEGORIES, INSERT_TOOL_CATEGORIES } from "../graphql/tool_categories";
import { GET_ALL_TOOL_IDS } from "../graphql/tools";
import { useUrqlClient } from "../urql/useUrqlClient";
import { faker } from "@faker-js/faker";

type ReturnType = Mutation_RootInsert_Tool_Categories_OneArgs["object"];

const toolIds = [];
const categoryIds = [];

async function fetchData() {
    if (toolIds.length > 0 && categoryIds.length > 0) {
        return true;
    }
    toolIds.push(...(await useUrqlClient().query<Query_Root>(GET_ALL_TOOL_IDS, {})).data.tools.map((t) => t.id));
    categoryIds.push(...(await useUrqlClient().query<Query_Root>(GET_ALL_CATEGORY_IDS, {})).data.categories.map((c) => c.id));
    return toolIds.length > 0 && categoryIds.length > 0;
}

export async function fakeToolCategory(merge?: Partial<ReturnType>): Promise<ReturnType> {
    if (!(await fetchData())) {
        throw new Error("Failed to fetch data");
    }
    const out: Partial<ReturnType> = {};
    out.tool_id = faker.helpers.arrayElement(toolIds);
    out.category_id = faker.helpers.arrayElement(categoryIds);

    return {
        ...out,
        ...merge
    }
}

export async function deleteAllToolCategories() {
    const result = await useUrqlClient().mutation(DELETE_ALL_TOOL_CATEGORIES, {});
    return result;
}

export async function seedToolCategories(count: number) {
    const objects = [];
    for (let i = 0; i < count; i++) {
        objects.push(await fakeToolCategory());
    }
    const { data, error } = await useUrqlClient().mutation(INSERT_TOOL_CATEGORIES, {
        objects
    });
    return {
        toolCategoryData: data,
        toolCategoryError: error
    };
}