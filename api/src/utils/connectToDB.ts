import mongoose from "mongoose";
import dotenv from"dotenv";
import { logger } from "../config/observability";

dotenv.config();
export const connectToDb = async () => {
    try 
    {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.arxjams.mongodb.net/?retryWrites=true&w=majority`);
        logger.info('Connected to DB');
    } catch (e) {
        logger.info(`ENV is ${e}`);
        process.exit(1);
    }
};
