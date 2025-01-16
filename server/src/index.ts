import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { Player } from './player/entities/Player';
import { RoomService } from './room/RoomService';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const httpServer = http.createServer();

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado:', socket.id);
    socket.emit("respuesta", {respuesta: "hola"});
    socket.emit("connectionStatus", { status: true });
    const player: Player = {
        id: socket,
        x: 0,
        y: 0,
        status: 0,
        direction: 0,
        visibility: true
    }
    RoomService.getInstance().addPlayer(player);
    socket.emit("game", {
        type : "newPlayer",
        
    })
    /* socket.on('mensaje', (data) => {
         console.log('Mensaje recibido:', data);
         socket.emit('respuesta', { mensaje: 'Mensaje recibido con éxito.' });
     });*/
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado:', socket.id);
    });
});


app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: 'Hello World!',
    });
});

const HOST: String = "10.108.2.1";

try {
    httpServer.listen(PORT,  Number(HOST) , () => {
        console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
    });
} catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
}

