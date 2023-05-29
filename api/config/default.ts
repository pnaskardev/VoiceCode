import dotenv from 'dotenv';
dotenv.config();
export default
{
    accessTokenPrivateKey:process.env.ACCESS_TOKEN_PRIVATE_KEY,
    refreshTokenPrivateKey:process.env.REFRESH_TOKEN_PRIVATE_KEY,
    smtp:
    {
        user: 'zj6fcfewxlafec3a@ethereal.email',    
        pass: 'Esph6Rty43vSWnDk7h',
        host: 'smtp.ethereal.email', 
        port: 587, 
        secure: false 
    } 
};
