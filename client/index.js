import { io } from "./node_modules/socket.io-client/dist/socket.io.esm.min.js";
const socket = io("http://localhost:3000");
socket.on("connect", (data) => {
    console.log("estoy conectado");
    socket.on("respuesta", (dato) => {
        console.log(dato);
    });
}); 