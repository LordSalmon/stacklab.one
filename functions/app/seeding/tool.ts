import { Mutation_RootInsert_Tools_OneArgs, Tools, Users } from "../graphql/schema.graphql";
import { faker } from "@faker-js/faker";
import { useUrqlClient } from "../urql/useUrqlClient";
import { DELETE_ALL_TOOLS, INSERT_TOOLS } from "../graphql/tools";

type ReturnType = Mutation_RootInsert_Tools_OneArgs["object"];

export function fakeTool(merge?: Partial<ReturnType>): ReturnType {
    const out: Partial<ReturnType> = {};
    out.title = faker.word.noun();
    out.description_short = faker.lorem.sentence();
    out.is_free = faker.datatype.boolean(0.8);
    out.is_maintained = faker.datatype.boolean(0.4);
    out.stars = faker.datatype.boolean(0.8) ? faker.number.int({min: 0, max: 200_000}) : null;
    return {
        ...out,
        ...merge
    }
};

export async function deleteAllTools() {
    const result = await useUrqlClient().mutation(DELETE_ALL_TOOLS, {});
    return result;
}

export async function seedTools(count: number) {
    const { data, error } = await useUrqlClient().mutation(INSERT_TOOLS, {
        objects: Array.from({ length: count }).map(() => {
            return fakeTool();
        })
    });
    return {
        toolData: data,
        toolError: error
    }
}