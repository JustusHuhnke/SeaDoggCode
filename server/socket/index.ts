
import {ISocket, ISocketServer} from "_server/socket/interface";
import {initStraem} from "./stream";

export const socketInit = (io: ISocketServer) => {
    io.of("/socket_user").on("connection", (socket: ISocket) => {
        // console.log("socket_user", socket);
    });

    io.of("/socket_transfer").on("connection", (socket: ISocket) => {
        initStraem(socket);
    });
};
