import express, { Express } from "express";

export const createApp = async (): Promise<Express> => {
    
    const app = express();

    // // Configuration

    // Middleware
    app.use(express.json());
    
    // app.use(cors({
    //     origin: originList()
    // }));

    // API Routes
    app.use("/", (req,res)=>
    {
        res.status(200).send("Hii Server is running");
    });
   

    // Swagger UI
    // const swaggerDocument = yaml.load("./openapi.yaml");
    // app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    return app;
};