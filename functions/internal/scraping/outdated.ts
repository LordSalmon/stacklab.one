import { Request, Response } from "express";
import { useUrqlClient } from "../../app/urql/useUrqlClient";
import { GET_OUTDATED_TOOLS } from "../../app/graphql/tools";
import {subSeconds} from "date-fns";
import { config } from "../../app/config";
import { hydrateTool } from "../../app/scraping/entities/tools";
import { Query_Root } from "../../app/graphql/schema.graphql";
import { isInternalRequest } from "../../app/middlewares/isInternalRequest";

export default async function outdated(req: Request, res: Response) {
    if (!isInternalRequest(req)) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const { data, error } = await useUrqlClient().query<Query_Root>(GET_OUTDATED_TOOLS, {
        hydrationDate: subSeconds(new Date(), config.hydration.expiration).toISOString()
    });
    if (error) {
        return res.status(500).json({ error });
    }
    for (const tool of data.tools) {
        const updateInput = await hydrateTool(tool);
        if (Object.keys(updateInput.og_data).length > 0) {
            console.log(updateInput);
        }
    }
    return res.status(200).send("OK");
} 