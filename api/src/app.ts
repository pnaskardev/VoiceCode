import express from "express";

import router from './routes/index_route';
import deserializeUser from "./middleware/deserialize";
import { Server, ServerOptions } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import { configureSocket } from "./socket";
import { logger } from "./utils/observability";
import path from "path";
import cors from "cors";

export const createApp = async (): Promise<HTTPServer> => {
    
    const app = express();

    app.use(
        cors({
            origin: "http://localhost:5173"
        })
    );
    // Configuration

    // Socket Configuration
    const httpServer: HTTPServer = createServer(app);
    // const io=new Server(server,{
    //     cors:
    //     {
    //         origin:['http://localhost:3000']
    //     }
    // });  
    // const options: Partial<ServerOptions> = {
    //     cors: {
    //         origin: 'http://localhost:3000'
    //     }
    // };
    const options: Partial<ServerOptions> = {
        cors: {
            origin: "*"
        }
    };

    
    // const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> = new Server(httpServer, options);
    const io = new Server(httpServer, options);

    configureSocket(io);
    
    // Middleware
    app.use(express.json());
    app.use(deserializeUser);
    // app.use(cors({
    //     origin: originList()
    // }));

    // API Routes
    app.use(router);
    if (process.env.NODE_ENV === "development") {
        logger.info(`ENV is ${process.env.NODE_ENV}`);
        app.use(express.static("../web/build"));
        app.get("*", (req, res) => {
            logger.info(`req:${req.url}`);
            if(res.locals.user)
            {
                res.status(200).sendFile(path.resolve(__dirname, "../..", "web", "build", "index.html"));
            }
            else 
            {
                res.status(400).send("You dont have the permsission to access this route");
            }
        });
    }
  

    // Swagger UI
    // const swaggerDocument = yaml.load("./openapi.yaml");
    // app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    return httpServer;
};