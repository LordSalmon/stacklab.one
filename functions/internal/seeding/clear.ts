import { Request, Response } from "express";
import { isInternalRequest } from "../../app/middlewares/isInternalRequest";
import { deleteAllCategories } from "../../app/seeding/category";
import { deleteAllToolCategories } from "../../app/seeding/tool_category";
import { deleteAllTools } from "../../app/seeding/tool";

export default async function clear(req: Request, res: Response) {
    if (!isInternalRequest(req)) {
        return res.status(401).send('Unauthorized');
    }
    await Promise.all([
        deleteAllToolCategories(),
        deleteAllCategories(),
        deleteAllTools(),
    ]);
    return res.status(200).send("Clearing the database finished");
}