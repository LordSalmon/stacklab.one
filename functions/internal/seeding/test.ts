import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import { nhostClient } from "../../app/nhost/useNhostClient";

export default (req: Request, res: Response) => {
    console.log("called it");
    console.log(nhostClient.adminSecret);
    return res.status(200).send(nhostClient.adminSecret);
}