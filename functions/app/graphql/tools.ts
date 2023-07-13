import { gql } from "@urql/core";

export const GET_ALL_TOOLS = gql`
    query getAllTools {
        tools {
            id
            title
        }
    }
`

export const INSERT_TOOLS = gql`
    mutation insertTools($objects: [tools_insert_input!]!) {
        insert_tools(objects: $objects) {
            affected_rows
        }
    }
`;

export const DELETE_ALL_TOOLS = gql`
    mutation deleteAllTools {
        delete_tools(where: {}) {
            affected_rows
        }
    }
`

export const GET_ALL_TOOL_IDS = gql`
    query getAllToolIds {
        tools {
            id
        }
    }
`;