import {IconComponent} from "_components/IconComponent";
import {PureComponent} from "_components/PureComponent";
import {component} from "_style";
import classnames from "_utils/classnames";
import * as React from "react";
import {Link} from "react-router-dom";
import {ILinkComponent} from "./interface";

export class LinkComponent extends React.PureComponent<ILinkComponent, {}> {

    public static defaultProps: ILinkComponent = {
        href: "/",
        className: component.link,
    };

    public render() {

        const {href, rel, children, className, icon, iconClass, title, titleClass, ...otherProps} = this.props;
        const classes = classnames(className);

        return (
            <Link to={href} className={classes} rel={rel} {...otherProps}>
                {!!children && children}
                {!children && !!icon && <IconComponent name={icon} className={iconClass} />}
                {!children && !!title && <PureComponent tag="span" className={titleClass}>{title}</PureComponent>}
            </Link>
        );
    }
}

export default LinkComponent;
