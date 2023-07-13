import { gql } from "@urql/core";

export const DELETE_ALL_TOOL_LANGUAGES = gql`
    mutation deleteAllToolLanguages {
        delete_tool_languages(where: {}) {
            affected_rows
        }
    }
`;

export const INSERT_TOOL_LANGUAGES = gql`
    mutation insertToolLanguages($objects: [tool_languages_insert_input!]!) {
        insert_tool_languages(objects: $objects) {
            affected_rows
        }
    }
`;