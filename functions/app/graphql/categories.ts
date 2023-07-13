import { gql } from "@urql/core";

export const DELETE_ALL_CATEGORIES = gql`
    mutation deleteAllCategories {
        delete_categories(where: {}) {
            affected_rows
        }
    }
`

export const INSERT_CATEGORIES = gql`
    mutation insertCategories($objects: [categories_insert_input!]!) {
        insert_categories(objects: $objects) {
            affected_rows
        }
    }
`;

export const GET_ALL_CATEGORY_IDS = gql`
    query getAllCategoryIds {
        categories {
            id
        }
    }
`