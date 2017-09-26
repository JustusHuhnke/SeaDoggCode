import {classNames} from "_style";
import {ReactNode} from "react";

export interface IProgressUpload {
    chunk: number;
    fileSize: number;
    sizeUploaded: number;
    percent: number;
}

export interface IUploaded {
    name: string;
    realName: string;
    type: string;
    path: string;
    size: number;
}

export interface IReturnFile {
    name: string;
    path: string;
}

export interface IUploadComponent {
    children?: ReactNode;
    className?: classNames;

    onProgress?: (data: IProgressUpload[]) => void;
    onUploaded?: (uploads: IUploaded[], errors: any[]) => void;
    onError?: (data: any) => void;
    beforeStart?: boolean | ((data: File[]) => boolean);
}
