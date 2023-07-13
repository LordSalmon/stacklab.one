import { gql } from "@urql/core";

export const DELETE_ALL_LANGUAGES = gql`
    mutation deleteAllLanguages {
        delete_languages(where: {}) {
            affected_rows
        }
    }
`;

export const INSERT_LANGUAGES  = gql`
    mutation insertLanguages($objects: [languages_insert_input!]!) {
        insert_languages(objects: $objects) {
            affected_rows
        }
    }
`;

export const GET_ALL_LANGUAGE_IDS = gql`
    query getAllLanguageIds {
        languages {
            id
        }
    }
`;