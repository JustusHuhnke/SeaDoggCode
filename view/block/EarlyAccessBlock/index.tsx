import {EarlyModalBlock} from "_blocks";
import {ButtonComponent} from "_components/ButtonComponent";
import {PureComponent} from "_components/PureComponent";
import {component, block, section} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";
import {IEarlyAccess, IEarlyAccessState} from "./interface";

const buttonComponent = new Rbem(component, "button");

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
                <h2 className={block.early__heading}>The best experience from renting boats</h2>
                <p className={block.early__text}>We will open soon... <br/> If you want to know when we will open - subscribe to our news.</p>
                <ButtonComponent className={[block.early__button, buttonComponent.get(null, 'green')]} title={'Get early access'} onClick={this.toggleModal.bind(this.toggleModal, true)} />
                <EarlyModalBlock open={this.state.open} onRequestClose={this.toggleModal.bind(this.toggleModal, false)}/>
            </PureComponent>
        );
    }

    private toggleModal(open: boolean) {
        this.setState({open});
    }
}
export default EarlyAccessBlock;
