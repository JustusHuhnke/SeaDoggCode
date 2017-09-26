import config, {logConfig} from "_config";
import {ISocket, ISocketFile} from "_server/socket/interface";
import makeId from "_utils/makeid";
import {createWriteStream, existsSync, readFileSync, unlinkSync, writeFileSync} from "fs";
import * as md5 from "md5";
import * as mkdirp from "mkdirp";
import {join, parse} from "path";
import * as pino from "pino";

const ss = require("socket.io-stream");
const log = pino({...logConfig, name: "Socket Stream"}, config.pretty);

export const initStraem = (socket: ISocket) => {
    ss(socket).on("file", async (stream: NodeJS.ReadWriteStream, data: ISocketFile, callback: (error: object, data?: object) => void) => {
        try {
            const pathFolder = join(config.pathToUpload, "upload");
            const pathFolderTemp = join(config.pathToUpload, "upload", ".temp");
            const realName = parse(data.name);
            const tempFileName = md5(String(+new Date()) + "_" + makeId());
            const filePathTemp = join(pathFolderTemp, tempFileName);

            log.debug("path to upload folder", pathFolder);
            log.debug("file upload", data);
            log.debug("temp file name", realName, tempFileName);

            stream.on("finish", () => {
                const file = readFileSync(filePathTemp);
                const fileName = md5(file.toString());
                const filePath = join(pathFolder, fileName + realName.ext);

                writeFileSync(filePath, file); // write file
                unlinkSync(filePathTemp); // remove temp file

                log.debug("file uploaded", fileName, data);

                return callback instanceof Function && callback(null, {
                    name: fileName + realName.ext,
                    path: "/upload",
                });
            });
            stream.on("error", (error) => {
                log.error(error);
                return callback instanceof Function && callback(error);
            });

            await new Promise((resolve, reject) => {
                if (!existsSync(pathFolderTemp)) {
                    mkdirp(pathFolderTemp, (err) => {
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

            stream.pipe(createWriteStream(filePathTemp));
        } catch (error) {
            log.error(error);
            return callback instanceof Function && callback(error);
        }
    });
};
