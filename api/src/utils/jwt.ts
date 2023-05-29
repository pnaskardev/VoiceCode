import jwt from 'jsonwebtoken';
import config from 'config';
import dotenv from 'dotenv';

import { logger } from './observability';

dotenv.config();
export function signJwt
(
    
    object:object, 
    keyName:"accessTokenPrivateKey"|"refreshTokenPrivateKey",
    options?:jwt.SignOptions|undefined
) 
{
    // logger.info(keyName);
    // logger.info(config.get<string>(keyName));
    const signingKey=Buffer.from(
        config.get<string>(keyName),
        "base64"
    ).toString("ascii");

    return jwt.sign(object,signingKey,
        {
            ...(options && options),
            algorithm:"RS256"
        });
}

export function verifyJwt<T>(token:string,keyName:"accessTokenPublicKey"|"refreshTokenPublicKey") 
:T | null
{
    const publicKey=Buffer.from(
        config.get<string>(keyName),
        "base64"
    ).toString("ascii");

    try 
    {
        const decoded=jwt.verify(token,publicKey) as T;
        return decoded;    
    } catch (error) 
    {
        logger.error(error);
        return null;
    }
  
}

