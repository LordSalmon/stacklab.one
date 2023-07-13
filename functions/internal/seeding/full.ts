import { Request, Response } from "express";
import { deleteAllToolCategories, seedToolCategories } from "../../app/seeding/tool_category";
import { isInternalRequest } from "../../app/middlewares/isInternalRequest";
import { deleteAllTools, seedTools } from "../../app/seeding/tool";
import { deleteAllCategories, seedCategories } from "../../app/seeding/category";
import { deleteAllToolLanguages, seedToolLanguages } from "../../app/seeding/tool_language";
import { deleteAllLanguages, seedLanguages } from "../../app/seeding/language";

const seederConfig = {
    tools: 1000,
    categories: 60,
    toolCategories: 1500,
    languages: 30,
    toolLanguages: 1200,
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
                deleteAllToolLanguages(),
                deleteAllCategories(),
                deleteAllTools(),
                deleteAllLanguages(),
            ]);
        }
        console.log("start seeding...");

        const { categoryData, categoryError } = await seedCategories(seederConfig.categories);
        errorOccurred = errorOccurred || !!categoryError;
        console.log("category seeding finished");

        const { toolData, toolError } = await seedTools(seederConfig.tools);
        errorOccurred = errorOccurred || !!toolError;
        console.log("tool seeding finished");

        const { languageData, languageError } = await seedLanguages(seederConfig.languages);
        errorOccurred = errorOccurred || !!languageError;
        console.log("language seeding finished");

        const { toolCategoryData, toolCategoryError } = await seedToolCategories(seederConfig.toolCategories);
        console.log(JSON.stringify(toolCategoryError, null, 2));
        errorOccurred = errorOccurred || !!toolCategoryError;
        console.log("tool category seeding finished");

        const { toolLanguageData, toolLanguageError } = await seedToolLanguages(seederConfig.toolLanguages);
        console.log(JSON.stringify(toolLanguageError, null, 2));
        errorOccurred = errorOccurred || !!toolLanguageError;
        console.log("tool language seeding finished");

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