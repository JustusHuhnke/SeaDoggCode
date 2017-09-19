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
        const classes = classnames(className);

        return (
            <span className={classes} {...otherProps}>
               <IconComponent name="download" className={[component.icon__logo]} />
            </span>
        );

    }
}

export default LogoComponent;
