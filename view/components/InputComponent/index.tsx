import {PureComponent} from "_components/PureComponent";
import {component} from "_style";
import classnames from "_utils/classnames";
import makeId from "_utils/makeid";
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
        const id = type + makeId();
​
        return (
            <PureComponent tag={"span"} className={classesLayout}>
                <label htmlFor={id} className={inputBlock.element("label").get()}>Text</label>

                {type === "input" && autosize === true && <AutosizeInput id={id} inputClassName={classes} {...otherProps} />}
                {type === "textarea" && autosize === true && <AutosizeTextarea id={id} className={classes} {...otherProps} />}
                {type === "input" && autosize !== true && <input id={id} className={classes} {...otherProps} />}

                <div className={inputBlock.element("error").get()}>Error message!</div>
            </PureComponent>
        );
    }
}

export default InputComponent;
