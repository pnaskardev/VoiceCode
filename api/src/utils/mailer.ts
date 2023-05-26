import nodemailer from 'nodemailer';


export async function createTestCreds() 
{
    const creds= await nodemailer.createTestAccount();
    console.log({creds});
}

createTestCreds();

// eslint-disable-next-line @typescript-eslint/no-empty-function
async function sendEmail(){}

export default sendEmail;
