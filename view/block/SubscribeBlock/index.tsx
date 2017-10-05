import {toggleModal} from "_actions";
import {ButtonComponent} from "_components/ButtonComponent";
import {PureComponent} from "_components/PureComponent";
import {block, component, section} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";
import {ISubscribe} from "./interface";

const subscribeStyle = new Rbem(block, "subscribe");
const buttonStyle = new Rbem(component, "button");

export class SubscribeBlock extends React.Component<ISubscribe, {}> {

    public render() {
        const styleList = [section.section, block.subscribe];
        return (
            <PureComponent tag="section" className={styleList} {...this.props}>
                <p className={subscribeStyle.get("text")}>Want to know more?</p>

                <ButtonComponent className={buttonStyle.get(null, "white")} title={"Get early access"} onClick={toggleModal.bind(toggleModal, true)} />
            </PureComponent>
        );
    }
}

export default SubscribeBlock;
