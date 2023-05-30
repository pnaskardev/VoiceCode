import express from 'express';
import requireUser from '../middleware/require_user';
import validateResource from '../middleware/validate_resource';
import { createRoomDataSchema} from '../schema/room_schema';
import {createRoomHandler, editRoomDataHandler, joinRoomHandler } from '../controller/room_controller';

const roomRouter =express.Router();

/*
    The User is trying to join a room we need to find a room
    and send the user some data.
*/
roomRouter.get('/api/room',requireUser,joinRoomHandler);

/*
    The user is trying to update the roomdata 
    everytime the user submits or the user saves 
    the room should get update
*/ 
roomRouter.patch('/api/room/',requireUser,validateResource(createRoomDataSchema),editRoomDataHandler);

/*
    The user should be able to create a room
*/
roomRouter.post('/api/room/createRoom',requireUser,createRoomHandler);

export default roomRouter;