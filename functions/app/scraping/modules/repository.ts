import { getGithubRepositoryData } from "./github";
import { getGitlabRepositoryData } from "./gitlab";

export type RepositoryData = {
    name: string;
    tags: string[];
    commitCount: number;
    stars: number;
    forks: number;
    watchers: number;
    createdAt: string;
    updatedAt: string;
}

export async function getRepositoryData(repositoryUrl: string): Promise<RepositoryData> {
    if (isHostedOnGithub(repositoryUrl)) {
        return await getGithubRepositoryData(repositoryUrl);
    }
    if (isHostedOnGitlab(repositoryUrl)) {
        return await getGitlabRepositoryData(repositoryUrl);
    }
};

function isHostedOnGithub(url: string): boolean {
    return url.includes("https://github.com");
}

function isHostedOnGitlab(url: string): boolean {
    return url.includes("https://gitlab.com");
}