
import config, {logConfig} from "_config";
import UserModel from "_server/db/models/User";
import {ISocket, ISocketServer} from "_server/socket/interface";
import * as pino from "pino";
import {initStraem} from "./stream";
const log = pino({...logConfig, name: "Socket Stream"}, config.pretty);

export const socketInit = (io: ISocketServer) => {
    io.of("/socket_user").on("connection", (socket: ISocket) => {
        // console.log("socket_user", socket);
        socket.on("saveEarly", async ({email, name, phone, checkList}: any, cb) => {
            try {
                const user = new UserModel({
                    email,
                    firstName: name,
                    phoneNumber: phone,
                    checkList,
                });

                await user.save();
                cb();
            } catch (err) {
                log.log(err);
            }
        });
    });

    io.of("/socket_transfer").on("connection", (socket: ISocket) => {
        initStraem(socket);
    });
};
