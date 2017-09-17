import {LogoComponent} from "_components/LogoComponent";
import {PureComponent} from "_components/PureComponent";
import {block} from "_style";
import * as React from "react";
import {IHeader} from "./interface";

export class HeaderBlock extends React.Component<IHeader, undefined> {

    public render() {
        const styleList = [block.header];
        return (
            <PureComponent tag="header" className={styleList}>
                <LogoComponent />
            </PureComponent>
        );
    }
}
export default HeaderBlock;
