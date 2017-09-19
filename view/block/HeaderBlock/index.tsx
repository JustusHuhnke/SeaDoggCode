import {LogoComponent} from "_components/LogoComponent";
import {NavigationComponent} from "_components/NavigationComponent";
import {PureComponent} from "_components/PureComponent";
import {IState} from "_reducers";
import {block} from "_style";
import * as React from "react";
import {connect} from "react-redux";
import {IHeader} from "./interface";

class Header extends React.Component<IHeader, {}> {

    public render() {
        const {homeTransparent = true, dispatch, ...oterProps} = this.props;
        const styleList = [block.header, {
            [block["header--transparent"]]: homeTransparent,
        }];
        return (
            <PureComponent tag="header" className={styleList} {...oterProps}>
                <LogoComponent />
                <NavigationComponent />
            </PureComponent>
        );
    }
}

export const HeaderBlock = connect((state: IState) => ({
    homeTransparent: state.navigation.get("homeTransparent"),
}))(Header as any);
export default HeaderBlock;
