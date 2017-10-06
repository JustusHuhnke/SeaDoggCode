import {classNames} from "_style";
import {ReactNode} from "react";

export interface ITabComponent {
    children?: ReactNode[] | ReactNode;
    className?: classNames;

    selected: string | number;
}
export interface ITabComponentState {
    idTab: string | number;
}

export interface ITabHeader {
    children?: ReactNode[] | ReactNode;
    className?: classNames;

    forId: string | number;
    isActive?: boolean;

    onClick?: (data: MouseEvent) => void;
    changeActive?: (data: string | number) => void;
}

export interface ITabBlock {
    children?: ReactNode[] | ReactNode;
    className?: classNames;
    isActive?: boolean;

    idTab: string | number;
}
