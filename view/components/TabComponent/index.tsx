import {component} from "_style";
import classnames from "_utils/classnames";
import Rbem from "_utils/rbem";
import * as React from "react";
import {ITabComponent} from "./interface";

const tabStyle = new Rbem(component, "tab");

export class Tab extends React.PureComponent<ITabComponent, {}> {

    public static defaultProps: ITabComponent = {
        className: tabStyle.get(),
        selected: 0,
    };

    constructor(props: any) {
        super(props);
        this.changeActive = this.changeActive.bind(this);
    }

    public changeActive(active: number) {
        (console as any).log(active);
    }

    public render() {
        const {className, children} = this.props;

        const tabsHeader: React.ReactNode[] = (Array.isArray(children) && children || [children]).filter((element: React.ReactNode) => (element as any).type.displayName === "TabHeader");
        const tabsBlock: React.ReactNode[] = (Array.isArray(children) && children || [children]).filter((element: React.ReactNode) => (element as any).type.displayName === "TabHeader");
        const classes = classnames(tabStyle.get(), className);

        return (
            <div className={classes}>
                <ul className={tabStyle.get("header")}>
                    {tabsHeader}
                </ul>
                <div className={tabStyle.get("block")}>
                    {tabsBlock}
                </div>
            </div>
        );
    }
}

export class TabHeader extends React.PureComponent<ITabComponent, {}> {

    public static displayName = "TabHeader";

    public static defaultProps: ITabComponent = {
        className: tabStyle.get("link"),
    };

    public render() {
        const {className, children} = this.props;
        const classes = classnames(className, tabStyle.get("link"));
        return (
            <li className={classes}>
                {children}
            </li>
        );
    }
}

export class TabBlock extends React.PureComponent<ITabComponent, {}> {

    public static displayName = "TabBlock";

    public static defaultProps: ITabComponent = {
        className: tabStyle.get("panel"),
    };

    public render() {
        const {className, children} = this.props;
        const classes = classnames(className, tabStyle.get("panel"));
        return (
            <div className={classes}>
                {children}
            </div>
        );
    }
}
