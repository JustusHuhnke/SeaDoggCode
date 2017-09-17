import {INavigationElement} from "_reducer/navigation";
import {classNames} from "_style";
import {List} from "immutable";
import {ReactNode} from "react";

export interface INavigationComponent {
    children?: ReactNode;
    className?: classNames;
    dispatch?: any;

    list: List<INavigationElement>;
}
