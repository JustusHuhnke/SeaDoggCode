import {ButtonComponent} from "_components/ButtonComponent";
import {PureComponent} from "_components/PureComponent";
import {block, section} from "_style";
import * as React from "react";
import {IEarlyAccess} from "./interface";

export class EarlyAccessBlock extends React.Component<IEarlyAccess, undefined> {

    public render() {
        const styleList = [section.section, block.early];
        return (
            <PureComponent tag="section" className={styleList}>
                <h2 className={block.early__heading}>The best experience from renting boats</h2>
                <p className={block.early__text}>We will open soon... <br/> If you want to know when we will open - subscribe to our news.</p>
                <ButtonComponent className={block.early__button} title={"Get early access"} />
            </PureComponent>
        );
    }
}
export default EarlyAccessBlock;
