import {toggleModal} from "_actions";
import {EarlyModalBlock} from "_blocks";
import {ButtonComponent} from "_components/ButtonComponent";
import {PureComponent} from "_components/PureComponent";
import {block, component, section} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";
import {IEarlyAccess} from "./interface";

const buttonStyle = new Rbem(component, "button");

export class EarlyAccessBlock extends React.Component<IEarlyAccess, {}> {

    constructor(props: IEarlyAccess) {
        super(props);
    }

    public render() {
        const styleList = [section.section, block.early];
        return (
            <PureComponent tag="section" className={styleList}>
                <div className={section["container-fluid"]}>
                    <div className={section.row}>
                        <h2 className={block.early__heading}>Connect, Embark and Experience</h2>
                        <p className={block.early__text}>Our mission is to revolutionize ocean experiences while conserving marine life. We provide a safe, convenient &amp; fun platform that allows members of the local community to benefit from a service solely focused on it's users.</p>
                    </div>
                    <div className="row">
                        <ButtonComponent className={[block.early__button, buttonStyle.get(null, "green")]} title={"Get early access"} onClick={toggleModal.bind(toggleModal, true)} />
                    </div>
                </div>
                <EarlyModalBlock onRequestClose={toggleModal.bind(toggleModal, false)}/>
            </PureComponent>
        );
    }
}
export default EarlyAccessBlock;
