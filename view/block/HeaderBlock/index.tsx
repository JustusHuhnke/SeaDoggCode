import {IconComponent} from "_components/IconComponent";
import {LogoComponent} from "_components/LogoComponent";
import {NavigationComponent} from "_components/NavigationComponent";
import {PureComponent} from "_components/PureComponent";
import {IState} from "_reducers";
import {block} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";
import {connect} from "react-redux";
import {IHeader, IHeaderState} from "./interface";

const headerStyle = new Rbem(block, "header");

class Header extends React.Component<IHeader, IHeaderState> {
    public state: IHeaderState = {
        menuExpanded: false,
    };

    constructor(props: IHeader) {
        super(props);
        this.toggleMenuVisibility = this.toggleMenuVisibility.bind(this);
    }

    public render() {
        const {homeTransparent = true, dispatch, ...oterProps} = this.props;
        const {menuExpanded} = this.state;
        const styleList = [block.header, {
            [block["header--transparent"]]: homeTransparent,
        }];

        return (
            <PureComponent tag="header" className={styleList} {...oterProps}>
                <LogoComponent className={headerStyle.get("logo")} />
                <NavigationComponent />
                <span className={headerStyle.get("menu-button")}>
                    <IconComponent name="menu" viewBox="0 0 22 18" onClick={this.toggleMenuVisibility.bind(this, !menuExpanded)} />
                </span>
            </PureComponent>
        );
    }

    private toggleMenuVisibility(menuExpanded: boolean) {
        this.setState({menuExpanded});
    }
}

export const HeaderBlock = connect((state: IState) => ({
    homeTransparent: state.navigation.get("homeTransparent"),
}))(Header as any);
export default HeaderBlock;
