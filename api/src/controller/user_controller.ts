import { Request,Response } from "express";
import {CreateUserInput, VerifyUserInput} from '../schema/user_schema';
import { createUser, findUserById } from "../service/user_service";
import sendEmail from "../utils/mailer";
import { logger } from "../config/observability";

// export async function createUserHandler(req:Request<Record<string, any>,Record<string, any>,CreateUserInput>,res:Response)
export async function createUserHandler(
    req: Request<Record<string, never>, Record<string, never>, CreateUserInput>,
    res: Response
) 
{
    const body=req.body;
    console.log({body});
    try 
    {
        const user=await createUser(body);

        await sendEmail({
            from:'priyanshunaskar89@gmail.com',
            to:user.email,
            subject:"Please verify your account",
            text:`Verification code ${user.verificationCode}, Id:${user._id}`
        });
        res.status(200).send("User succesfully created");    
    } catch (error:any) 
    {
        if(error.code===11000)
        {
            return res.status(409).send("Account already exists");
        }
        return res.status(500).send(error);    
    }
}

export async function verifyUserHandler(req:Request<VerifyUserInput>,res:Response)
{
    const id=req.params.id;
    const verificationCode=req.params.verificationCode;

    logger.info(id);
    logger.info(verificationCode);

    try 
    {
        // FIND THE USER BY ID
        const user=await findUserById(id);
        if(!user)
        {
            return res.send("Could not verify user");
        }

        // CHECK TO SEE IF THEY HAVE ALREADY VERIFIED
        if(user.verified)
        {
            res.send("User is already verified");
        }
    
        // CHECK TO SEE IF THE VERIFICATION CODE MATCHES
        if(user.verificationCode===verificationCode)
        {
            user.verified=true;
            return res.send("User succesfully verified");
        }
        return res.send("Could not verify user");
    } catch (error) {
        logger.error(error); 
        return res.send("Could not verify user");
    }
    // const user=await findUserById(id);
    
    // CHECK TO SEE IF THEY HAVE ALREADY VERIFIED
    // if(!user)
    // {
    //     return res.send("Could not verify user");
    // }
    // CHECK TO SEE IF THEY HAVE ALREADY VERIFIED
    // if(user.verified)
    // {
    //     res.send("User is already verified");
    // }

    // CHECK TO SEE IF THE VERIFICATION CODE MATCHES
    // if(user.verificationCode===verificationCode)
    // {
    //     user.verified=true;
    //     return res.send("User succesfully verified");
    // }
    // return res.send("Could not verify user");
}