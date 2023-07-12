import { Client, cacheExchange, fetchExchange } from '@urql/core';

export const useUrqlClient = new Client({
    url: 'http://localhost:1337/v1/graphql',
    exchanges: [cacheExchange, fetchExchange],
});