import RoomDataModel, { Room } from "../model/room_model";

export function createRoom(input:Partial<Room>)
{
    return RoomDataModel.create(input);
}