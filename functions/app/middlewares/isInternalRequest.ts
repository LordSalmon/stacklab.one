import { Request, Response, NextFunction } from "express";

export function isInternalRequest (req: Request) {
    return req.headers['x-hasura-admin-secret'] === process.env.HASURA_GRAPHQL_ADMIN_SECRET;
}