import UserModel, { User } from "../model/user_model";

export function createUser(input:Partial<User>)
{
    return UserModel.create(input);
}