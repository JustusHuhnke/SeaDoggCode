import {classNames} from "_style";

interface ISelectOption {
    label: string;
    value: string;
}

export interface ISelect {
    className?: classNames;
    defaultValue: string;
    name: string;
    options: ISelectOption[];
}
