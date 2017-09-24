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
        className: inputBlock.get("input"),
        type: "input",
    };

    public render() {

        const {className, classNameLayout, type, autosize, label, error, ...otherProps} = this.props;
        const classes = classnames(inputBlock.get(type), className);
        const classesLayout = classnames({
            [inputBlock.get()]: true,
            [inputBlock.get(null, "error")]: !!error,
        }, classNameLayout);
        const id = type + makeId();
​
        return (
            <PureComponent tag={"span"} className={classesLayout}>
                {typeof label === "string" && <label htmlFor={id} className={inputBlock.get("label")}>{label}</label>}

                {type === "input" && autosize === true && <AutosizeInput id={id} inputClassName={classes} {...otherProps} />}
                {type === "textarea" && autosize === true && <AutosizeTextarea id={id} className={classes} {...otherProps} />}
                {type === "input" && autosize !== true && <input id={id} className={classes} {...otherProps} />}
                {type === "textarea" && autosize !== true && <textarea id={id} className={classes} {...otherProps} />}

                {typeof error === "string" && <div className={inputBlock.get(null, "error")}>{error}</div>}
            </PureComponent>
        );
    }
}

export default InputComponent;
