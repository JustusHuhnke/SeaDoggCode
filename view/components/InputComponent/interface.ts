import {classNames} from "_style";
import {ReactNode} from "react";

export interface IInputComponent {

    children?: ReactNode;
    className?: classNames;
    classNameLayout?: classNames;

    type?: "input" | "textarea";
    autosize?: boolean;

    label?: string;
    error?: string | boolean;

    [key: string]: any;

}
