import { Client, cacheExchange, fetchExchange } from '@urql/core';

export const useUrqlClient = () => new Client({
    url: 'http://graphql-engine:8080/v1/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
        headers: {
            'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        }
    }
});