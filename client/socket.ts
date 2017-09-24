import * as io from "socket.io-client";
export const ss = require("socket.io-stream");

export const socket = io(process.env.NODE_ENV === "production" ? (window as any).location.origin : "http://localhost:1337", {
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    transports: ["websocket", "polling", "flashsocket"],
});

export const streamConnect = ss(socket);

//
// socket.on("connect", () => {
//     socket.emit("chat message", (+new Date()).toString());
//
// });
// socket.on("chat", (answ: string) => {
//     console.log("event", answ);
// });
// socket.on("disconnect", () => {
//     console.log("disconnect");
// });
