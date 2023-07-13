import { Request, Response } from "express";
import { deleteAllToolCategories, seedToolCategories } from "../../app/seeding/tool_category";
import { isInternalRequest } from "../../app/middlewares/isInternalRequest";
import { deleteAllTools, seedTools } from "../../app/seeding/tool";
import { deleteAllCategories, seedCategories } from "../../app/seeding/category";

const seederConfig = {
    tools: 1000,
    categories: 60,
    toolCategories: 1500,
};

export default async (req: Request, res: Response) => {
    if (!isInternalRequest(req)) {
        return res.status(401).send('Unauthorized');
    }
    try {
        console.log("Running seeder");
        let errorOccurred = false;
        const fresh = req.query.fresh === 'true';

        if (fresh) {
            await Promise.all([
                deleteAllToolCategories(),
                deleteAllCategories(),
                deleteAllTools(),
            ]);
        }
        console.log("start seeding...");

        console.log("seeding categories...");
        const { categoryData, categoryError } = await seedCategories(seederConfig.categories);
        console.log(categoryData, categoryError);
        console.log("seeding categories finished")
        errorOccurred = errorOccurred || !!categoryError;

        console.log("seeding tools...");
        const { toolData, toolError } = await seedTools(seederConfig.tools);
        console.log("seeding tools finished");
        errorOccurred = errorOccurred || !!toolError;

        console.log("seeding tool categories...");
        const { toolCategoryData, toolCategoryError } = await seedToolCategories(seederConfig.toolCategories);
        console.log("seeding tool categories finished");
        errorOccurred = errorOccurred || !!toolCategoryError;

        if (errorOccurred) {
            console.error("An error occured when running the full seeder.");
            return res.status(500).send("An error occured when running the full seeder.");
        }
        return res.status(200).send("Seeding finished");
    } catch (e) {
        console.error("An error occured when running the full seeder.");
        console.error(e);
        return res.status(500).send("An error occured when running the full seeder.");
    }
}