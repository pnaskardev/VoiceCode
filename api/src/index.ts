import express from "express";
import path from "path";
import dotenv from "dotenv";

import { createApp } from "./app";
import { logger } from "./config/observability";
import {connectToDb} from "./utils/connectToDB";

dotenv.config();

const main = async () => {
    const app = await createApp();
    const port = process.env.FUNCTIONS_CUSTOMHANDLER_PORT || process.env.PORT || 3100;

    connectToDb().then(()=>
    {
        app.listen(port, () => {
            logger.info(`Started listening on port ${port}`);
        });
    }).catch((error)=>
    {
        logger.error(error);
    });

   
    if (process.env.NODE_ENV === "dev") {
        logger.info(`ENV is ${process.env.NODE_ENV}`);
        app.use(express.static("../web/build"));
        app.get("*", (req, res) => {
            logger.info(`req:${req.url}`);
            res.status(200).sendFile(path.resolve(__dirname, "../..", "web", "build", "index.html"));
        });
    }
};

main(); 