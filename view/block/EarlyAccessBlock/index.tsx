import {PureComponent} from "_components/PureComponent";
import {block, section} from "_style";
import * as React from "react";
import {IEarlyAccess} from "./interface";

export class EarlyAccessBlock extends React.Component<IEarlyAccess, undefined> {

    public render() {
        const styleList = [section.section, block.early];
        return (
            <PureComponent tag="section" className={styleList}>
                Text Early Access
            </PureComponent>
        );
    }
}
export default EarlyAccessBlock;
