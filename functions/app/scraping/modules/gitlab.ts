import { RepositoryData } from "./repository";

export async function getGitlabRepositoryData(repositoryUrl: string): Promise<RepositoryData> {
    const url = new URL(repositoryUrl);
    const [owner, name] = url.pathname.split("/").filter(Boolean);
    const apiUrl = `https://gitlab.com/api/v4/projects/${owner}%2F${name}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return {
        name: data.name,
        tags: data.tag_list,
        commitCount: data.statistics.commit_count,
        stars: data.star_count,
        forks: data.forks_count,
        watchers: data.watchers_count,
        createdAt: data.created_at,
        updatedAt: data.last_activity_at,
    }
}