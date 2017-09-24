import {LinkComponent} from "_components/LinkComponent";
import {PureComponent} from "_components/PureComponent";
import {INavigationElement} from "_reducer/navigation";
import {IState} from "_reducers";
import {component} from "_style";
import classnames from "_utils/classnames";
import Rbem from "_utils/rbem";
import {List} from "immutable";
import * as React from "react";
import {connect} from "react-redux";
import {INavigationComponent} from "./interface";

const navigationStyle = new Rbem(component, "navigation");

const NavElement: React.StatelessComponent<INavigationElement> = ({title, link}, key) => (
    <li key={key} className={navigationStyle.get("item")}>
        <LinkComponent href={link} title={title} className={navigationStyle.get("link")} />
    </li>
);

class Navigation extends React.PureComponent<INavigationComponent, {}> {

    public static defaultProps: INavigationComponent = {
        className: component.navigation,
        list: List([]),
    };

    public render() {

        const {className, list, dispatch, ...otherProps} = this.props;
        const classes = classnames(navigationStyle.get(), className);

        return (
            <nav className={classes} {...otherProps}>
                <PureComponent tag={"ul"} className={navigationStyle.get("list")}>
                    {list.map(NavElement).toArray()}
                </PureComponent>
            </nav>
        );
    }
}

export const NavigationComponent = connect((state: IState) => ({
    list: state.navigation.get("home"),
}))(Navigation as any);
export default NavigationComponent;
