import express, { Express } from "express";

import router from './routes/index_route';
import deserializeUser from "./middleware/deserialize";
import { Server, ServerOptions } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import { configureSocket } from "./socket";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { logger } from "./utils/observability";
import path from "path";

export const createApp = async (): Promise<HTTPServer> => {
    
    const app = express();

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
    if (process.env.NODE_ENV === "development") {
        logger.info(`ENV is ${process.env.NODE_ENV}`);
        app.use(express.static("../web/build"));
        app.get("*", (req, res) => {
            logger.info(`req:${req.url}`);
            res.status(200).sendFile(path.resolve(__dirname, "../..", "web", "build", "index.html"));
        });
    }
    app.use(router);

    // Swagger UI
    // const swaggerDocument = yaml.load("./openapi.yaml");
    // app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    return httpServer;
};