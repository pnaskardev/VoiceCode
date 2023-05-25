import { getModelForClass, prop,modelOptions, Severity, pre,DocumentType } from "@typegoose/typegoose";
import * as argon2 from "argon2";
import { nanoid } from "nanoid";
import { logger } from "../config/observability";

@pre<User>("save",async function () 
{
    if(!this.isModified("password"))
    {
        return;
    }
    
    const hash=await argon2.hash(this.password);
    this.password=hash;
})

@modelOptions({
    schemaOptions:
    {
        timestamps:true
    },
    options:
    {
        allowMixed:Severity.ALLOW
    }
})
export class User
{
    // prop({lowercase:true,required:true,unique:true})
    @prop({lowercase:true,required:true,unique:true})
        email:string;

    @prop({required:true})
        firstName:string;
    
    @prop({required:true})
        lastname:string;

    @prop({required:true})
        password:string;

    @prop({required:true, default:()=>{nanoid();}})
        verificationCode:string;

    @prop({required:true})
        passwordResetCode:string|null;

    @prop({required:true,default:false})
        verified:boolean;

    async validatePassword(this:DocumentType<User>,candidatePassword:string)
    {
        try 
        {
            return await argon2.verify(this.password,candidatePassword);
        } 
        catch (error) 
        {
            logger.error(error);
            return false;
        }
    }
    
}

const UserModel=getModelForClass(User);

export default UserModel;