import { Request,Response } from "express";
import {CreateUserInput} from '../schema/user_schema';
import { createUser } from "../service/user_service";
import sendEmail from "../utils/mailer";

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

