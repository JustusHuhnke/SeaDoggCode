import {classNames} from "_style";
import {Map} from "immutable";
import {ReactNode} from "react";

interface ImmutableMap<T> extends Map<string, any> {
    get<K extends keyof T>(name: K): T[K];
}

export type IImageParams = ImmutableMap<{
    main: string; // default Image
    ultra: string; // 2k
    full: string; // 1920
    hd: string; // 1366
    wide: string; // 768
    half: string; // 480
}>;

export interface IImageComponent {
    viewBox?: string;
    children?: ReactNode;
    className?: classNames;
    src: IImageParams;
}
