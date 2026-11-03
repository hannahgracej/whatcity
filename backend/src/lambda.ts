import serverlessExpress from "@codegenie/serverless-express";
import { app } from "./app";

// API Gateway HTTP API payload format 2.0. The Express app stays the
// source of truth for routes; this adapter only translates the event.
export const handler = serverlessExpress({ app });
