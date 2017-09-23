import {PureComponent} from "_components/PureComponent";
import {component} from "_style";
import classnames from "_utils/classnames";
import Rbem from "_utils/rbem";
import * as React from "react";
import {IInputComponent} from "./interface";
const AutosizeInput = require("react-input-autosize").default;
const AutosizeTextarea = require("react-textarea-autosize").default;

const inputBlock = new Rbem(component, "input-block");

export class InputComponent extends React.PureComponent<IInputComponent, {}> {

    public static defaultProps: IInputComponent = {
        className: inputBlock.element("input").get(),
        type: "input",
    };

    public render() {

        const {className, type, autosize, ...otherProps} = this.props;
        const classes = classnames(inputBlock.element(type).get(), className);
        const classesLayout = classnames(inputBlock.get(), className);
​
        return (
            <PureComponent tag={"span"} className={classesLayout}>
                {type === "input" && autosize === true && <AutosizeInput inputClassName={classes} {...otherProps} />}
                {type === "textarea" && autosize === true && <AutosizeTextarea className={classes} {...otherProps} />}
                {type === "input" && autosize !== true && <input className={classes} {...otherProps} />}
            </PureComponent>
        );
    }
}

export default InputComponent;
