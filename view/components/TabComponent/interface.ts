import {classNames} from "_style";
import {ReactNode} from "react";

export interface ITabComponent {
    children?: ReactNode[] | ReactNode;
    className?: classNames;

    selected?: number;
}

export interface ITabHeader {
    children?: ReactNode[] | ReactNode;
    className?: classNames;
}

export interface ITabBlock {
    children?: ReactNode[] | ReactNode;
    className?: classNames;
}
