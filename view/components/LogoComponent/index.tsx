import {IconComponent} from "_components/IconComponent";
import {component} from "_style";
import classnames from "_utils/classnames";
import * as React from "react";
import {ILogoComponent} from "./interface";

export class LogoComponent extends React.Component<ILogoComponent, {}> {

    public static defaultProps: ILogoComponent = {
        className: component.logo,
    };

    public render() {

        const {className, ...otherProps} = this.props;
        const classes = classnames(component.logo, className);

        return (
            <span className={classes} {...otherProps}>
               <IconComponent name="logo" viewBox="0 0 29 30" className={component.icon__logo} />
               <IconComponent name="logo_text" viewBox="0 0 93 19" className={component.icon__logo_text} />
            </span>
        );

    }
}

export default LogoComponent;
