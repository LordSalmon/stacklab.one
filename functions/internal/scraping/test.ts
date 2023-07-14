import { Request, Response } from "express";
import { getRepositoryData } from "../../app/scraping/modules/repository";

export default async function (req: Request, res: Response) {
    const repoData = await getRepositoryData("https://github.com/facebook/react");
    return res.status(200).json(repoData);
}