import { NhostClient } from '@nhost/nhost-js'

export const nhostClient = new NhostClient({
    adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    authUrl: "http://localhost:1337/v1",
    storageUrl: "http://localhost:1337/v1",
    graphqlUrl: "http://localhost:1337/v1",
    functionsUrl: "http://localhost:1337/v1",
});
