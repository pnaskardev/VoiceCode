import {Server,Socket} from 'socket.io'; 
import { logger } from './utils/observability';

export function configureSocket(io:Server) 
{
    io.on('connection',(socket:Socket)=>{
        logger.info(socket.id);
        
        // JOIN ROOM EVENT 
        socket.on('joinroom',(roomId:string)=>
        {
            logger.info(`roomId:${roomId}`);
            socket.join(roomId);
            socket.broadcast.to(roomId).emit('userjoined');
        });

        // CHANGE THE CODE WORKSPACE
        socket.on('updateBody', ({ value, roomId }) => {
            socket.broadcast.to(roomId).emit('updateBody', value);
        });

        // UPDATE THE INPUT TEST CASES AND ALL
        socket.on('updateInput', ({ value, roomId }) => {
            socket.broadcast.to(roomId).emit('updateInput', value);
        });

        // SET THE BODY IN THE DB 
        socket.on('setBody', ({ value, roomId }) => {
            socket.broadcast.to(roomId).emit('setBody', value);
        });

        // SET THE INPUT IN THE DB 
        socket.on('setInput', ({ value, roomId }) => {
            socket.broadcast.to(roomId).emit('setInput', value);
        });

        // SET THE LANGUAGE IN WHICH THE USER IS COMPILING FOR THE OTHER USER 
        socket.on('setLanguage', ({ value, roomId }) => {
            socket.broadcast.to(roomId).emit('setLanguage', value);
        });

        // SET THE OUT PUT FOR THE OTHER USER 
        socket.on('setOutput', ({ value, roomId }) => {
            socket.broadcast.to(roomId).emit('setOutput', value);
        });
        socket.on('leaveroom', (roomId: string) => {
            socket.leave(roomId);
        });

    });
}