import { gql } from "@urql/core";

export const DELETE_ALL_TOOL_CATEGORIES = gql`
    mutation deleteAllToolCategories {
        delete_tool_categories(where: {}) {
            affected_rows
        }
    }
`

export const INSERT_TOOL_CATEGORIES = gql`
    mutation insertToolCategories($objects: [tool_categories_insert_input!]!) {
        insert_tool_categories(objects: $objects) {
            affected_rows
        }
    }
`