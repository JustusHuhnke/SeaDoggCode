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
                        <p className={block.early__text}>Our mission is to revolutionize the world of boating by providing a convenient, safe &amp; fun platform that encourages members of the boating community to take the opportunity to benefit from a service, that focuses on the interests of the user &amp; community.</p>
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
