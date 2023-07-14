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

export const UPDATE_TOOL = gql`
    mutation updateTool($id: uuid!, $set: tools_set_input!) {
        update_tools_by_pk(pk_columns: {id: $id}, _set: $set) {
            id
        }
    }
`;

const hydrationToolFragment = gql`
    fragment hydrationToolFragment on tools {
        id
        title
        description_short
        stars
        is_free
        is_maintained
        website_url
        repository_url
        tags
        created_at
        updated_at
        hydrated_at
        og_data
    }
`;

export const GET_OUTDATED_TOOLS = gql`
    query getOutdatedTools($hydrationDate: timestamptz!) {
        tools(where: {
            _and: [
                {
                    _or: [
                        {
                            hydrated_at: {
                                _lte: $hydrationDate
                            }
                        },
                        {
                            hydrated_at: {
                                _is_null: true
                            }
                        }
                    ]
                }
            ]
        }) {
            ...hydrationToolFragment
        }
    }
    ${hydrationToolFragment}
`;