import {IconComponent} from "_components/IconComponent";
import {LogoComponent} from "_components/LogoComponent";
import {NavigationComponent} from "_components/NavigationComponent";
import {PureComponent} from "_components/PureComponent";
import {IState} from "_reducers";
import {block} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";
import {connect} from "react-redux";
import {IHeader} from "./interface";

const headerStyle = new Rbem(block, "header");

class Header extends React.Component<IHeader, {}> {
    // public state = {
    //     menuExpanded: false,
    // };
    //
    // private toggleMenuVisibility() {
    //     if (this.state.menuExpanded === false) {
    //         this.setState(menuExpanded, true);
    //     } else {
    //         this.setState(menuExpanded, false);
    //     }
    // }

    public render() {
        const {homeTransparent = true, dispatch, ...oterProps} = this.props;
        const styleList = [block.header, {
            [block["header--transparent"]]: homeTransparent,
        }];

        return (
            <PureComponent tag="header" className={styleList} {...oterProps}>
                <LogoComponent className={headerStyle.get("logo")} />
                <NavigationComponent />
                <span className={headerStyle.get("menu-button")}>
                    <IconComponent name="menu" viewBox="0 0 22 18" />
                </span>
            </PureComponent>
        );
    }
}

export const HeaderBlock = connect((state: IState) => ({
    homeTransparent: state.navigation.get("homeTransparent"),
}))(Header as any);
export default HeaderBlock;
