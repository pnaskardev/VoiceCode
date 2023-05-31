import { Request,Response } from "express";
import {CreateUserInput, ForgotPasswordInput, ResetPasswordInput, VerifyUserInput} from '../schema/user_schema';
import { createUser, findUserByEmail, findUserById } from "../service/user_service";
import sendEmail from "../utils/mailer";
import { logger } from "../utils/observability";
import { nanoid } from "nanoid";

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
        res.status(200).send(user._id);    
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
            await user.save();
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

export async function forgotPasswordHandler(req:Request<object,object,ForgotPasswordInput>,res:Response) 
{
    const {email}=req.body;
    const message="If a user with that email is registered you wil recieve a password reset email";
    try 
    {
        const user=await findUserByEmail(email);
        if(!user)
        {
            logger.debug(`User with this email:-${email} does not exist`);
            return res.send(message);
        }

        if(!user.verified)
        {
            return res.send("User is not verified");
        }

        const passwordResetCode=nanoid();
        user.passwordResetCode=passwordResetCode;
        await user.save();

        await sendEmail({
            to:user.email,
            from:"priyanshunaskar89@gmail.com",
            subject:"Reset your password",
            text:`Password reset code ${passwordResetCode}, Id: ${user._id}`
        });

        logger.debug(`Password reset email sent to ${email}`); 
        return res. send(message);

    } catch (error) 
    {
        logger.error(error); 
        res.send(error);   
    }
}

export async function resetPasswordHandler
(
    req:Request<ResetPasswordInput['params'],
    Record<string, never>,
    ResetPasswordInput['body']>,
    res:Response
) 
{
    const {id,passwordResetCode}=req.params;

    const {password}=req.body;

    try 
    {
        const user=await findUserById(id);
        if(!user || !user.passwordResetCode || user.passwordResetCode!==passwordResetCode)
        {
            return res.status(400).send('Could not reset password');
        }

        user.passwordResetCode=null;
        user.password=password;
        await user.save();

        return res.send("Succesfully updated password");


    } catch (error:any) {
        logger.error(error);
        return res.status(400).send(error.message);
    }
}

export async function getCurrentUserHandler(req:Request,res:Response) 
{
    return res.send(res.locals.user);
}