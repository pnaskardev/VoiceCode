import {Request,Response} from "express";

import { CreateSessionInput } from "../schema/auth_schema";
import { findUserByEmail } from "../service/user_service";
import { signAccessToken, signRefreshToken } from "../service/auth_service";
export async function createSessionHandler
(
    req:Request<Record<string, never>,Record<string, never>,CreateSessionInput>,
    res:Response
) 
{
    const message="Invalid email or password";

    const {email,password}=req.body;

    const user=await findUserByEmail(email);
    if(!user)
    {
        return res.send(message);
    }

    if(!user.verified)
    {
        return res.send("Please verify you email");
    }

    const isValid=await user.validatePassword(password);
    if(!isValid)
    {
        return res.send(message);
    }

    // SIGN A ACCESS TOKEN 
    const accessToken=signAccessToken(user);
    // SIGN A REFRESH TOKEN
    const refreshToken=await signRefreshToken({userId:user._id.toString()});
    // SEND THE TOKENS 

    return res.send({
        accessToken,
        refreshToken
    });

}