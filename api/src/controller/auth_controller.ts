import {Request,Response} from "express";

import { CreateSessionInput } from "../schema/auth_schema";
import { findUserByEmail, findUserById } from "../service/user_service";
import { findSessionById, signAccessToken, signRefreshToken } from "../service/auth_service";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
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

export async function refreshAccessTokenHandler(req:Request,res:Response) 
{
    const refreshToken =get(req,'headers.x-refresh'); 
    if(refreshToken)
    {
        const decoded=verifyJwt<{session:string}>(refreshToken.toString(),'refreshTokenPublicKey');

        if(!decoded)
        {
            return res.status(401).send("Could not refresh token");
        }

        const session =await findSessionById(decoded.session);

        if(!session || !session.valid)
        {
            return res.status(401).send("Could not refresh token");
        }

        const user=await findUserById(String(session.user));
        if(!user)
        {
            return res.status(401).send("Could not refresh token");
        }

        const accessToken = signAccessToken(user);
        return res.send({accessToken});
    }
   
}