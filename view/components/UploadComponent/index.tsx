import {component} from "_style";
import classnames from "_utils/classnames";
import Rbem from "_utils/rbem";
import * as React from "react";
import * as Dropzone from "react-dropzone";
import {IUploadComponent} from "./interface";

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
    };

    constructor(props: IUploadComponent) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    public render() {

        const {className, ...otherProps} = this.props;
        const classes = classnames(className, dropdownStyle.get());

        return (
            <Dropzone className={classes} onDrop={this.onDrop} {...otherProps} />
        );
    }

    private onDrop(files: File[]) {
        if (process.env.BROWSER) {
            const file = files[0];
            const stream = ss.createStream();
            let size = 0;

            // upload a file to the server.
            streamConnect.emit("file", stream, {size: file.size, name: file.name, type: file.type});
            const blob = ss.createBlobReadStream(file);
            blob.on("data", (chunk: any) => {
                size += chunk.length;
                // console.log(chunk.length, Math.floor(size / file.size * 100) + "%");
                // -> e.g. '42%'
            });
            blob.pipe(stream);
        }
    }
}

export default UploadComponent;
