import {ReactNode} from "react";

export interface IHeaderState {
    menuExpanded: boolean;
}
export interface IHeader {
    children?: ReactNode;
    dispatch?: any;
    homeTransparent?: boolean;
}
