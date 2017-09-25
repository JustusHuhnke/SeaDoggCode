import config, {logConfig} from "_config";
import {ISocket, ISocketFile} from "_server/socket/interface";
import {createWriteStream, existsSync} from "fs";
import * as mkdirp from "mkdirp";
import {basename, join} from "path";
import * as pino from "pino";

const ss = require("socket.io-stream");
const log = pino({...logConfig, name: "Socket Stream"}, config.pretty);

export const initStraem = (socket: ISocket) => {
    ss(socket).on("file", async (stream: NodeJS.ReadWriteStream, data: ISocketFile) => {
        try {
            const pathFolder = join(config.pathToUpload, "upload");
            log.debug("path to upload folder", pathFolder);
            log.debug("file upload", data);

            await new Promise((resolve, reject) => {
                if (!existsSync(pathFolder)) {
                    mkdirp(pathFolder, (err) => {
                        if (err === null) {
                            resolve();
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    resolve();
                }
            });

            const filename = basename(data.name);
            stream.pipe(createWriteStream(join(pathFolder, filename)));
        } catch (error) {
            log.error(error);
        }
    });
};
