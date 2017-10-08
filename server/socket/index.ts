
import config, {logConfig} from "_config";
import UserModel from "_server/db/models/User";
import {ISocket, ISocketServer} from "_server/socket/interface";
import * as pino from "pino";
import {initStraem} from "./stream";
const nodemailer = require("nodemailer");
const log = pino({...logConfig, name: "Socket Stream"}, config.pretty);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "seadogg2017@gmail.com",
        pass: "uKsn3DRaPp9HCxyG",
    },
    debug: true,
}, {
    from: "SeaDogg <info@seadogg.com>",
    headers: {
        "X-Laziness-level": 1000,
    },
});

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

                const mailOptions = {
                    from: "SeaDogg <info@seadogg.com>",
                    to: `${name} <${email}>`,
                    subject: "Welcome aboard!",
                    html: "<p>You have successfully subscribed to SeaDogg. Further updates and information will be provided through our Newsletter.</p>",
                };

                transporter.sendMail(mailOptions, (err: any, info: any) => {
                    if (err) {
                        log.error("Email send error: ", err);
                    } else {
                        log.info("Email send ok: ", info);
                    }
                    cb();
                });

            } catch (err) {
                log.error(err);
            }
        });
    });

    io.of("/socket_transfer").on("connection", (socket: ISocket) => {
        initStraem(socket);
    });
};
