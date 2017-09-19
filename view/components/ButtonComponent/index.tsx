import {IconComponent} from "_components/IconComponent";
import {PureComponent} from "_components/PureComponent";
import {component} from "_style";
import classnames from "_utils/classnames";
import * as React from "react";
import {IButtonComponent} from "./interface";

export class ButtonComponent extends React.PureComponent<IButtonComponent, {}> {

    public static defaultProps: IButtonComponent = {
        className: component.button,
        type: "button",
        title: "",
    };

    public render() {

        const {type, className, icon, iconClass, title, titleClass, ...otherProps} = this.props;
        const classes = classnames(className, component.button);

        return (
            <button className={classes} type={type} {...otherProps}>
                {!!icon && <IconComponent name={icon} className={iconClass} />}
                <PureComponent tag="span" className={titleClass}>{title}</PureComponent>
            </button>
        );
    }
}

export default ButtonComponent;
