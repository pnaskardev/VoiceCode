import express, { Express } from "express";

import router from './routes/index_route';

export const createApp = async (): Promise<Express> => {
    
    const app = express();

    // // Configuration

    // Middleware
    app.use(express.json());
    
    // app.use(cors({
    //     origin: originList()
    // }));

    // API Routes
    app.use(router);
    app.use("/", (req,res)=>
    {
        res.sendStatus(200);
    });
   

    // Swagger UI
    // const swaggerDocument = yaml.load("./openapi.yaml");
    // app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    return app;
};