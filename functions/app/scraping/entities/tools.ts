import { Tools, Tools_Set_Input } from "../../graphql/schema.graphql";
import { scrapeOpenGraph } from "../modules/opengraph";


export async function hydrateTool(tool: Tools) {
    const updateInput: Tools_Set_Input = {
        ...tool,
    }
    if (tool.website_url) {
        const opengraphData = await scrapeOpenGraph(tool.website_url);
        updateInput.og_data = opengraphData;
    }
    return updateInput;
}