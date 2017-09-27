import {EarlyModalBlock} from "_blocks";
import {ButtonComponent} from "_components/ButtonComponent";
import {PureComponent} from "_components/PureComponent";
import {block, component, section} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";
import {IEarlyAccess, IEarlyAccessState} from "./interface";

const buttonStyle = new Rbem(component, "button");

export class EarlyAccessBlock extends React.Component<IEarlyAccess, IEarlyAccessState> {

    constructor(props: IEarlyAccess) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            open: false,
        };
    }

    public render() {
        const styleList = [section.section, block.early];
        return (
            <PureComponent tag="section" className={styleList}>
                <div className={section.container}>
                    <div className={section.row}>
                        <h2 className={block.early__heading}>Connect. Share. Experience.</h2>
                        <p className={block.early__text}>Our mission is to revolutionize the world of boating. By connecting those, that like us share a passion for the ocean and it’s adventures, we are able to provide unique breathtaking experiences.</p>
                    </div>
                    <div className="row">
                        <ButtonComponent className={[block.early__button, buttonStyle.get(null, "green")]} title={"Get early access"} onClick={this.toggleModal.bind(this.toggleModal, true)} />
                    </div>
                </div>
                <EarlyModalBlock open={this.state.open} onRequestClose={this.toggleModal.bind(this.toggleModal, false)}/>
            </PureComponent>
        );
    }

    private toggleModal(open: boolean) {
        this.setState({open});
    }
}
export default EarlyAccessBlock;
