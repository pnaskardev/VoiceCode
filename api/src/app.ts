import express, { Express } from "express";

import router from './routes/index_route';
import deserializeUser from "./middleware/deserialize";

export const createApp = async (): Promise<Express> => {
    
    const app = express();

    // // Configuration

    // Middleware
    app.use(express.json());
    app.use(deserializeUser);
    // app.use(cors({
    //     origin: originList()
    // }));

    // API Routes
    app.use(router);

    // Swagger UI
    // const swaggerDocument = yaml.load("./openapi.yaml");
    // app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    return app;
};