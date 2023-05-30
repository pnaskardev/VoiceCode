import {object,string,TypeOf} from "zod";

export const createRoomDataSchema = object({
    body:object({
        title: string({
            required_error:"Title is required"
        }).nonempty({message:"Title can't be empty"}),
        body: string().optional(),
        input: string().optional(),
        language: string().optional(),
    })
});

export const verifyRoomDataSchema = object({
    params: object({
        id: string(),
    }),
});

export type CreateRoomInput=TypeOf<typeof createRoomDataSchema>["body"];

export type VerifyRoomInput=TypeOf<typeof verifyRoomDataSchema>["params"];

