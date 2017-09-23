import {classNames} from "_style";
import {ReactNode} from "react";

export interface IInputComponent {

    children?: ReactNode;
    className?: classNames;

    type?: "input" | "textarea";
    autosize?: boolean;

    [key: string]: any;

}
