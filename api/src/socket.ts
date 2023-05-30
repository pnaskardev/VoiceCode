import {Server,Socket} from 'socket.io'; 
import { logger } from './utils/observability';

export function configureSocket(io:Server) 
{
    io.on('connection',(socket:Socket)=>{
        logger.info(socket.id);
        socket.on('joinroom',(roomId:string)=>
        {
            logger.info(`roomId:${roomId}`);
            socket.join(roomId);
            socket.broadcast.to(roomId).emit('userjoined');
        });

        socket.on('leaveroom', (roomId: string) => {
            socket.leave(roomId);
        });

    });
}