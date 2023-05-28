import config from 'config';
import nodemailer,{SendMailOptions} from 'nodemailer';
import { logger } from './observability';


// export async function createTestCreds() 
// {
//     const creds= await nodemailer.createTestAccount();
//     console.log({creds});
// }

// createTestCreds();

const smtp=config.get<{
    user:string,
    pass:string,
    host:string,
    port:number,
    secure:boolean
}>('smtp');

const transporter=nodemailer.createTransport({
    ...smtp,
    auth:{user:smtp.user,pass:smtp.pass}
});
async function sendEmail(payload:SendMailOptions)
{
    transporter.sendMail(payload,(err,info)=>
    {
        if(err)
        {
            logger.error(err);
        }

        logger.info(`Preview URL:${nodemailer.getTestMessageUrl(info)}`);
        return;
    });
}

export default sendEmail;
