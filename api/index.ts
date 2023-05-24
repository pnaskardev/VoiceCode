import express from "express";
import path from "path";
import dotenv from "dotenv"

import { createApp } from "./app";
import { logger } from "./config/observability";

dotenv.config();

const main = async () => 
{
    const app = await createApp();
    const port = process.env.FUNCTIONS_CUSTOMHANDLER_PORT || process.env.PORT || 3100;

    app.listen(port, () => {
        logger.info(`Started listening on port ${port}`);
    });
    if (process.env.NODE_ENV === 'dev') 
    {
        const PORT = process.env.PORT as unknown as number;
        logger.info(`ENV is ${process.env.NODE_ENV}`);
        app.use(express.static('web/build'));
        app.get('*', (req, res) => {
            logger.info('req: ', req.url);
            res.sendFile(path.resolve(__dirname, '..', 'web', 'build', 'index.html'));
        });
    }
};

main(); 