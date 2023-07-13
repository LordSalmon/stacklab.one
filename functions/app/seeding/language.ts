import { Mutation_RootInsert_Languages_OneArgs } from "../graphql/schema.graphql";
import { faker } from "@faker-js/faker";
import { useUrqlClient } from "../urql/useUrqlClient";
import { DELETE_ALL_LANGUAGES, INSERT_LANGUAGES } from "../graphql/languages";

type ReturnType = Mutation_RootInsert_Languages_OneArgs["object"];

const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "PHP",
    "Ruby",
    "Go",
    "Swift",
    "Kotlin",
    "Rust",
    "Scala",
    "Dart",
    "Elixir",
    "Clojure",
    "Haskell",
    "Erlang",
    "R",
    "Lua",
    "Perl",
    "Julia",
    "Groovy",
    "F#",
    "OCaml",
    "Scheme",
    "Bash",
    "PowerShell",
    "Objective-C",
    "Assembly",
    "Vim script",
    "CoffeeScript",
    "TeX",
];

export function fakeLanguage(merge?: Partial<ReturnType>): ReturnType {
    const out: Partial<ReturnType> = {};
    out.name = faker.helpers.arrayElement(languages);
    out.name_short = out.name;
    return {
        ...out,
        ...merge
    }
} 

export async function seedLanguages(count: number) {
    const { data, error } = await useUrqlClient().mutation(INSERT_LANGUAGES, {
        objects: Array.from({ length: count }).map(() => {
            return fakeLanguage();
        })
    });
    return {
        languageData: data,
        languageError: error
    }
}

export async function deleteAllLanguages() {
    const result = await useUrqlClient().mutation(DELETE_ALL_LANGUAGES, {});
    return result;
}