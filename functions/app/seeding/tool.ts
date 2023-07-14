import { Mutation_RootInsert_Tools_OneArgs, Tools, Users } from "../graphql/schema.graphql";
import { faker } from "@faker-js/faker";
import { useUrqlClient } from "../urql/useUrqlClient";
import { DELETE_ALL_TOOLS, INSERT_TOOLS } from "../graphql/tools";

const websiteUrls = [
    "https://vuejs.org",
    "https://reactjs.org",
    "https://angular.io",
    "https://svelte.dev",
    "https://emberjs.com",
    "https://nuxtjs.org",
    "https://nextjs.org",
    "https://sapper.svelte.dev",
    "https://www.gatsbyjs.com",
    "https://www.typescriptlang.org",
    "https://www.javascript.com",
    "https://www.rust-lang.org",
    "https://www.python.org",
    "https://www.php.net",
    "https://www.java.com",
    "https://www.ruby-lang.org",
    "https://www.cprogramming.com",
    "https://www.cplusplus.com",
];

const toolTitles = [
    "Vue.js",
    "React",
    "Angular",
    "Svelte",
    "Ember.js",
    "Nuxt.js",
    "Next.js",
    "Sapper",
    "Gatsby",
    "TypeScript",
    "JavaScript",
    "Rust",
    "Vercel",
    "Netlify",
    "Sanity",
    "GraphQL",
    "Apollo",
    "Prisma",
    "Hasura",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Google Cloud",
    "Azure",
    "Digital Ocean",
    "Heroku",
    "Cloudflare",
    "dateFns",
    "Luxon",
    "Moment.js",
    "Day.js",
    "Lodash",
    "Directus",
    "Strapi",
    "Keystone",
    "Ghost",
    "WordPress",
    "Drupal",
    "Joomla",
    "Magento",
    "Shopify",
    "BigCommerce",
    "Squarespace",
    "Wix",
];

type ReturnType = Mutation_RootInsert_Tools_OneArgs["object"];

export function fakeTool(merge?: Partial<ReturnType>): ReturnType {
    const out: Partial<ReturnType> = {};
    out.title = faker.helpers.arrayElement(toolTitles);
    out.description_short = faker.lorem.sentence();
    out.is_free = faker.datatype.boolean(0.8);
    out.is_maintained = faker.datatype.boolean(0.4);
    out.stars = faker.datatype.boolean(0.8) ? faker.number.int({min: 0, max: 200_000}) : null;
    out.website_url = faker.datatype.boolean(0.8) ? faker.helpers.arrayElement(websiteUrls) : null;
    return {
        ...out,
        ...merge
    }
};

export async function deleteAllTools() {
    const result = await useUrqlClient().mutation(DELETE_ALL_TOOLS, {});
    return result;
}

export async function seedTools(count: number) {
    const { data, error } = await useUrqlClient().mutation(INSERT_TOOLS, {
        objects: Array.from({ length: count }).map(() => {
            return fakeTool();
        })
    });
    return {
        toolData: data,
        toolError: error
    }
}