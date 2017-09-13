import {component} from "_style";
import * as cx from "classnames";
import * as React from "react";
// import * as Select from "react-select";
import {Creatable} from 'react-select';
import {ISelect} from "./interface";

export class SelectComponent extends React.Component<ISelect, undefined> {

    public static defaultProps: ISelect = {
        className: component.select,
        defaultValue: "one",
        name: null,
        options: [
            {
                label: "One",
                value: "one",
            },
            {
                label: "Two",
                value: "two",
            },
        ],
    };

    public render() {

        const {name, defaultValue, options, className, ...otherProps} = this.props;
        const classes = cx(className);

        return (
            <Creatable
                name={name}
                value={defaultValue}
                options={options}
                className={classes}
                {...otherProps}
            />);

    }
}

export default SelectComponent;