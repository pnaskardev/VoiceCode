import express, { Express } from "express";
import swaggerUI from "swagger-ui-express";
import yaml from "yamljs";
import path from "path";

import { logger } from "./config/observability";

export const createApp = async (): Promise<Express> => {
    
    const app = express();

    // // Configuration
    // const config = await getConfig();
    // observability(config.observability);
    // await configureMongoose(config.database);
    // // Middleware
    // app.use(express.json());
    
    // app.use(cors({
    //     origin: originList()
    // }));

    // API Routes
    // app.use("/", (req,res)=>
    // {
    //     res.status(200).send("Hii Server is running");
    // });
   

    // Swagger UI
    // const swaggerDocument = yaml.load("./openapi.yaml");
    // app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    return app;
};