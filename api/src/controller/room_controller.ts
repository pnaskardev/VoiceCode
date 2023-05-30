import {Request,Response} from "express";
import { logger } from "../utils/observability";
import { sendError } from "../utils/response_util";
import UserModel from "../model/user_model";
import RoomDataModel from "../model/room_model";
import { createRoom } from "../service/room_service";

export async function joinRoomHandler(req:Request,res:Response) 
{   
    const {id,roomId}=req.body;

    try 
    {
        /*
            when you have updated the roomId in the user data 
            find the room by the id and return the data so that 
            they can show the data in the editor 
        */
        const roomData=await RoomDataModel.findById(roomId);
        if(!roomData)
        {
            return res.status(400).json("Room not found");
        }

        // if the user doesnt has the roomId already stored
        // in the roomIds list store that 
        const user=await UserModel.findByIdAndUpdate(
            id,
            { $addToSet: { roomIds: roomId } },
            { new: true }
        );   
        if (!user) 
        {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(roomData);

    } catch (error:any) 
    {
        logger.error(error);
        sendError(res, error.message);
    }
}

export async function editRoomDataHandler(req:Request,res:Response) 
{
    const {roomId,title,body,input,language}=req.body;
    // Check if body is undefined and replace it with an empty string
    const sanitizedBody = body ?? "";

    // Check if input is undefined and replace it with an empty string
    const sanitizedInput = input ?? "";

    try 
    {
        // const roomData=await RoomDataModel.findByIdAndUpdate(roomId);
        const updatedRoom = await RoomDataModel.findByIdAndUpdate(
            roomId,
            { title: title, body:sanitizedBody, input: sanitizedInput, language: language },
            { new: true ,overwrite: true}
        );

        if(!updatedRoom)
        {
            return res.status(404).json({ error: 'Room not found' });
        }
        return res.status(200).json(updatedRoom);
        
    } catch (error:any) {
        logger.error(error);
        sendError(res, error.message);
    }

}

export async function createRoomHandler(req:Request,res:Response) 
{
    const body=req.body;
    console.log(body);
    try 
    {
        createRoom(body);
        res.status(200).send("Room has been created");
    } 
    catch (error:any) {
        logger.error(error);
        sendError(res, error.message);
    }
}