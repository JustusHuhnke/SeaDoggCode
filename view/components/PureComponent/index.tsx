import classnames from "_utils/classnames";
import * as React from "react";
import {IPureComponent} from "./interface";

export class PureComponent extends React.PureComponent<IPureComponent, {}> {

    public static defaultProps: IPureComponent = {
        tag: "div",
    };

    constructor(props: IPureComponent) {
        super(props);
    }

    public render() {
        const {tag, inputRef, children, className = null, ...otherProps} = this.props;
        const Tag = tag;
        const classes = classnames(className);
        return <Tag ref={inputRef} className={classes} {...otherProps}>{children}</Tag>;
    }
}
