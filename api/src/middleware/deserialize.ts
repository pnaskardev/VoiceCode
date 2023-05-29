import { Request,Response,NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

const deserializeUser=async (req:Request,res:Response,next:NextFunction) => 
{
    const accessToken=(req.headers.authorization || "").replace(/^Bearer\s/,"");

    if(!accessToken)
    {
        return next();
    }

    const decoded =verifyJwt(accessToken,"accessTokenPublicKey");
    if(decoded)
    {
        // STORES IF USER HAS A VALID ACCESSCODE OR NOT IF YES GREAT!!
        // IF NOT USER HAS TO LOGIN AGAIN
        res.locals.user=decoded;
    }
    next();
};

export default deserializeUser;