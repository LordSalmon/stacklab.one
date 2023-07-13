import { Mutation_RootInsert_Categories_OneArgs } from "../graphql/schema.graphql";
import { faker } from "@faker-js/faker";
import { useUrqlClient } from "../urql/useUrqlClient";
import { DELETE_ALL_CATEGORIES, INSERT_CATEGORIES } from "../graphql/categories";

type ReturnType = Mutation_RootInsert_Categories_OneArgs["object"];

const categoryTitles = [
    "Data Science",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Data Visualization",
    "Data Engineering",
    "Data Analysis",
    "Frontend Development",
    "Backend Development",
    "Fullstack Development",
    "Mobile Development",
    "Database",
    "DevOps",
    "Cloud Computing",
    "Big Data",
    "Deployment",
    "Testing",
    "Security",
    "PDF Generators",
    "Webdev tools",
]

export function fakeCategory(merge?: Partial<ReturnType>): ReturnType {
    const out: Partial<ReturnType> = {};
    out.title = faker.helpers.arrayElement(categoryTitles);
    out.slug = out.title.toLowerCase().replace(/ /g, '-');
    return {
        ...out,
        ...merge
    };
}

export async function deleteAllCategories() {
    const result = await useUrqlClient().mutation(DELETE_ALL_CATEGORIES, {});
    return result;
}

export async function seedCategories(count: number) {
    const { data, error } = await useUrqlClient().mutation(INSERT_CATEGORIES, {
        objects: Array.from({ length: count }).map(() => {
            return fakeCategory();
        }),
    });
    return {
        categoryData: data,
        categoryError: error
    };
}