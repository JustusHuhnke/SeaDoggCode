import {PureComponent} from "_components/PureComponent";
import {component} from "_style";
import classnames from "_utils/classnames";
import makeId from "_utils/makeid";
import Rbem from "_utils/rbem";
import * as React from "react";
import {IInputComponent} from "./interface";
const AutosizeInput = require("react-input-autosize").default;
const AutosizeTextarea = require("react-textarea-autosize").default;
const InputNumber = require("react-number-format");
const InputMask = require("react-input-mask").default;

const inputBlock = new Rbem(component, "input-block");

export class InputComponent extends React.PureComponent<IInputComponent, {}> {

    public static defaultProps: IInputComponent = {
        className: inputBlock.get("input"),
        type: "input",
    };
    private IdLabel: string;
    private IdInput: string;
    private IdError: string;

    public componentWillMount() {
        const {type} = this.props;
        this.IdLabel = type + makeId();
        this.IdInput = type + makeId();
        this.IdError = type + makeId();
    }

    public render() {

        const {className, classNameLayout, type, autosize, label, disabled, mask, error, ...otherProps} = this.props;
        const classes = classnames(inputBlock.get(type === "number" ? "input" : type), className);
        const classesLayout = classnames({
            [inputBlock.get()]: true,
            [inputBlock.get(null, "error")]: !!error,
            [inputBlock.get(null, "disabled")]: !!disabled,
        }, classNameLayout);
        const children: any[] = [];

        if (typeof label === "string") {
            children.push(<label key={this.IdLabel} htmlFor={this.IdInput} className={inputBlock.get("label")}>{label}</label>);
        }

        children.push((() => {
            switch (false) {
                case !(type === "number"):
                    return <InputNumber key={this.IdInput} id={this.IdInput} className={classes} {...otherProps} />;
                case !(typeof mask === "string" && process.env.BROWSER):
                    return <InputMask key={this.IdInput} id={this.IdInput} className={classes} mask={mask} {...otherProps} />;
                case !(type === "input" && autosize === true):
                    return <AutosizeInput key={this.IdInput} id={this.IdInput} inputClassName={classes} disabled={disabled} {...otherProps} />;
                case !(type === "textarea" && process.env.BROWSER && autosize === true):
                    return <AutosizeTextarea key={this.IdInput} id={this.IdInput} className={classes} disabled={disabled} {...otherProps} />;
                case !(type === "textarea" && (!process.env.BROWSER || autosize !== true)):
                    return <textarea key={this.IdInput} id={this.IdInput} className={classes} disabled={disabled} {...otherProps} />;
                default:
                    return <input key={this.IdInput} id={this.IdInput} className={classes} disabled={disabled} {...otherProps} />;
            }
        })());

        if (typeof error === "string") {
            children.push(<div key={this.IdError} className={inputBlock.get(null, "error")}>{error}</div>);
        }

        return (
            <PureComponent tag={"span"} className={classesLayout} children={children} />
        );

    }
}

export default InputComponent;
