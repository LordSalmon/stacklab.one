import { gql } from "@urql/core";

export const GET_ALL_TOOLS = gql`
    query getAllTools {
        tools {
            id
            title
        }
    }
`