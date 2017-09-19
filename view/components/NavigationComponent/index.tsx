import {LinkComponent} from "_components/LinkComponent";
import {PureComponent} from "_components/PureComponent";
import {INavigationElement} from "_reducer/navigation";
import {IState} from "_reducers";
import {component} from "_style";
import classnames from "_utils/classnames";
import {List} from "immutable";
import * as React from "react";
import {connect} from "react-redux";
import {INavigationComponent} from "./interface";

const NavElement: React.StatelessComponent<INavigationElement> = ({title, link}, key) => (
    <li key={key} className={component.navigation__list__item}>
        <LinkComponent href={link} title={title} className={component.navigation__list__item__link} />
    </li>
);

class Navigation extends React.PureComponent<INavigationComponent, undefined> {

    public static defaultProps: INavigationComponent = {
        className: component.navigation,
        list: List([]),
    };

    public render() {

        const {className, list, dispatch, ...otherProps} = this.props;
        const classes = classnames(component.navigation, className);

        return (
            <nav className={classes} {...otherProps}>
                <PureComponent tag={"ul"} className={component.navigation__list}>
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
