import { RepositoryData } from "./repository";
import { Octokit } from "@octokit/rest";
import puppeteer from "puppeteer";

export async function getGithubRepositoryData(repositoryUrl: string): Promise<RepositoryData> {
    const url = new URL(repositoryUrl);
    const [owner, name] = url.pathname.split("/").filter(Boolean);
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });
    const repositoryData = (await octokit.repos.get({
        owner,
        repo: name,
    })).data;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(repositoryUrl);
    let commitCount = 0;
    const commitElements = (await page.$x("/html/body/div[1]/div[6]/div/main/turbo-frame/div/div/div/div[2]/div[1]/div[3]/div[1]/div/div[4]/ul/li/a/span/strong"));
    if (commitElements.length > 0) {
        commitCount = parseInt(await commitElements[0].evaluate((node) => node.textContent)) || 0;
    }
    


    return {
        name: repositoryData.name,
        tags: repositoryData.topics,
        commitCount,
        stars: repositoryData.stargazers_count,
        forks: repositoryData.forks_count,
        watchers: repositoryData.watchers_count,
        createdAt: repositoryData.created_at,
        updatedAt: repositoryData.updated_at,
    }
}