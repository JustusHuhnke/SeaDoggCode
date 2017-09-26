import {component} from "_style";
import classnames from "_utils/classnames";
import noob from "_utils/noob";
import Rbem from "_utils/rbem";
import {List} from "immutable";
import * as React from "react";
import * as Dropzone from "react-dropzone";
import {IProgressUpload, IReturnFile, IUploadComponent, IUploaded} from "./interface";

const dropdownStyle = new Rbem(component, "dropdown");
let ss: any;
let streamConnect: any;
if (process.env.BROWSER) {
    ss = require("_socket").ss;
    streamConnect = require("_socket").streamConnect;
}

export class UploadComponent extends React.PureComponent<IUploadComponent, {}> {

    public static defaultProps: IUploadComponent = {
        className: dropdownStyle.get(),
        onProgress: noob,
        onUploaded: noob,
        onError: noob,
    };

    constructor(props: IUploadComponent) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    public render() {

        const {className, onProgress, onUploaded, onError, beforeStart, ...otherProps} = this.props;
        const classes = classnames(className, dropdownStyle.get());

        return (
            <Dropzone className={classes} onDrop={this.onDrop} {...otherProps} />
        );
    }

    private async onDrop(files: File[]) {
        if (process.env.BROWSER) {
            const {onProgress, onUploaded, onError, beforeStart} = this.props;
            const fileLength = files.length;

            if (beforeStart instanceof Function && !beforeStart(files) || beforeStart !== false) {
                return;
            }

            if (fileLength) {
                let progressAnswer = List(new Array(fileLength));
                let progressError = List(new Array(fileLength));
                let progressUploaded: List<IUploaded> = List(new Array(fileLength));

                await Promise.all(files.map((file, key) => {
                    return new Promise((resolve) => {
                        this.upload(file, (data: IProgressUpload, index: number) => {
                            progressAnswer = progressAnswer.set(index, data);
                            onProgress(progressAnswer.toArray());
                        }, (data: any, index) => {
                            progressError = progressError.set(index, data);
                            onError(data);
                            resolve();
                        }, (data: IUploaded, index: number) => {
                            progressUploaded = progressUploaded.set(index, data);
                            resolve();
                        }, key);
                    });
                }));
                const pu = progressUploaded.filter((e) => !!e).toArray();
                const pe = progressError.filter((e) => !!e).toArray();
                onUploaded(pu, pe);
            }

        }
    }
    private upload(file: File, onProgress: (data: IProgressUpload, index: number) => void, onError: (data: any, key: number) => void, onUploaded: (data: IUploaded, index: number) => void, key: number) {
        const stream = ss.createStream();
        let size = 0;

        // upload a file to the server.
        streamConnect.emit("file", stream, {size: file.size, name: file.name, type: file.type}, (error: object, data: IReturnFile) => {
            if (error === null) {
                onUploaded({
                    name: data.name,
                    path: data.path,
                    size: file.size,
                    realName: file.name,
                    type: file.type,
                }, key);
            } else {
                onError(error, key);
            }
        });

        const blob = ss.createBlobReadStream(file);
        blob.on("data", (chunk: any) => {
            size += chunk.length;
            onProgress({
                chunk: chunk.length,
                fileSize: file.size,
                sizeUploaded: size,
                percent: Math.floor(size / file.size * 100),
            }, key);
        });
        blob.pipe(stream);
    }
}

export default UploadComponent;
