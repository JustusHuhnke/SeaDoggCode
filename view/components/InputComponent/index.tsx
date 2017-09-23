import {PureComponent} from "_components/PureComponent";
import {component} from "_style";
import classnames from "_utils/classnames";
import * as React from "react";
import {IInputComponent} from "./interface";

export class InputComponent extends React.PureComponent<IInputComponent, {}> {

    public static defaultProps: IInputComponent = {
        className: component.button,
    };

    public render() {

        const {className, ...otherProps} = this.props;
        const classes = classnames(className, component.button);

        return (
            <PureComponent tag={"span"} className={classes} {...otherProps}>
                <input/>
            </PureComponent>
        );
    }
}

export default InputComponent;
