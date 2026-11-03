import serverless from "serverless-http";
import { app } from "./app";

// API Gateway (HTTP API, payload v2) -> Express
export const handler = serverless(app);
