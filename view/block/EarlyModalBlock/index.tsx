// import SelectComponent from "_components/SelectComponent";
import {toggleModal} from "_actions";
import ButtonComponent from "_components/ButtonComponent";
import IconComponent from "_components/IconComponent";
import {InputComponent} from "_components/InputComponent";
import LogoComponent from "_components/LogoComponent";
import {IState} from "_reducers";
import {component} from "_style";
import classnames from "_utils/classnames";
import Rbem from "_utils/rbem";
import {List, Map} from "immutable";
// import {List} from "immutable";
import * as React from "react";
import * as Modal from "react-modal";
import {connect} from "react-redux";
import {IEarlyCheck, IEarlyModal, IEarlyState} from "./interface";

const modalStyle = new Rbem(component, "modal");
const iconStyle = new Rbem(component, "icon");
const buttonStyle = new Rbem(component, "button");
const ModalBlock = process.env.BROWSER && ((Modal as any).default || Modal);
const emailRegexp = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/i;

export class EarlyModal extends React.Component<IEarlyModal | any, IEarlyState> {

    public static defaultProps: IEarlyModal = {
        earlyModal: false,
    };

    constructor(props: IEarlyModal) {
        super(props);
        this.sendUser = this.sendUser.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.selectType = this.selectType.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            step: 1,
            user: Map({
                name: "",
                email: "",
                phone: "",
            }),
            checkList: List([
                {
                    icon: "boat",
                    viewBox: "0 0 40 40",
                    checked: false,
                    name: "renter",
                    title: "Renter",
                },
                {
                    icon: "boat",
                    viewBox: "0 0 40 40",
                    checked: false,
                    name: "boat",
                    title: "Boat owner",
                },
                {
                    icon: "boat",
                    viewBox: "0 0 40 40",
                    checked: false,
                    name: "captain",
                    title: "Captain",
                },
                {
                    icon: "boat",
                    viewBox: "0 0 40 40",
                    checked: false,
                    name: "adventure",
                    title: "Adventurer",
                },
            ]),
        };
    }

    public render() {
        const {earlyModal, ...otherProps} = this.props;
        const {checkList, step, user} = this.state;
        const firstButton = !(checkList as any).filter(({checked}: IEarlyCheck) => checked).size;
        const secondButton = !(user.get("name").length > 2 && emailRegexp.test(user.get("email")) && user.get("phone").replace(/\D/ig, "").length >= 11);

        return ModalBlock && (
            <ModalBlock
                isOpen={earlyModal}
                contentLabel="Modal"
                overlayClassName={[modalStyle.get("overlay"), modalStyle.get("overlay", "full")].join(" ")}
                className={modalStyle.get("block")}
                {...otherProps}
            >
                <LogoComponent className={modalStyle.get("logo")}/>
                <IconComponent name={"close"} className={modalStyle.get("close")} onClick={toggleModal.bind(toggleModal, false)} />
                <div
                    className={classnames({
                        [modalStyle.get("tab")]: true,
                        [modalStyle.get("tab", "active")]: step === 0,
                    })}
                >
                    <h2>Get early access</h2>
                    <h5>Select your experiences</h5>
                    <div>
                        {
                            checkList.map(({title, icon, viewBox, checked}: IEarlyCheck, key) => (
                                <div key={key} onClick={this.selectType.bind(this, key, !checked)}>
                                    <IconComponent
                                        name={icon}
                                        viewBox={viewBox}
                                        className={{
                                            [iconStyle.get("check")]: true,
                                            [iconStyle.get("check", "active")]: checked,
                                        }}
                                    />
                                    <span>{title}</span>
                                </div>
                            )).toArray()}
                    </div>
                    <ButtonComponent
                        title={"next"}
                        disabled={firstButton}
                        className={{
                            [buttonStyle.get(null, "green")]: !firstButton,
                        }}
                        onClick={this.nextStep.bind(this, 1)}
                    />
                </div>
                <div
                    className={classnames({
                        [modalStyle.get("tab")]: true,
                        [modalStyle.get("tab", "active")]: step === 1,
                    })}
                >
                    <InputComponent placeholder={"Your name"} type="input" onChange={this.changeValue.bind(this, "name")} value={user.get("name")} />
                    <InputComponent placeholder={"Your email"} type="input" onChange={this.changeValue.bind(this, "email")} value={user.get("email")} />
                    <InputComponent placeholder={"Your phone"} mask={"+1-999-999-9999"} onChange={this.changeValue.bind(this, "phone")} value={user.get("phone")} />
                    <ButtonComponent
                        title={"next"}
                        disabled={secondButton}
                        className={{
                            [buttonStyle.get(null, "green")]: !secondButton,
                        }}
                        onClick={this.sendUser}
                    />
                    <div>
                        <span onClick={this.nextStep.bind(this, 0)}>Back</span>
                    </div>
                </div>
                <div
                    className={classnames({
                        [modalStyle.get("tab")]: true,
                        [modalStyle.get("tab", "active")]: step === 2,
                    })}
                >
                    <h2>Congratulations!</h2>
                    <h5>You have already subscribed and when we launch our site you will find out about this one of the first.</h5>
                    <ButtonComponent
                        title={"Close (5 sec)"}
                        className={buttonStyle.get(null, "green")}
                        onClick={toggleModal.bind(toggleModal, false)}
                    />
                </div>
            </ModalBlock>
        );
    }

    private selectType(key: number, checked: boolean) {
        let {checkList} = this.state;
        const getCheck = checkList.get(key);
        checkList = checkList.set(key, {...getCheck, checked});
        this.setState({checkList});
    }

    private nextStep(step: number) {
        this.setState({step});
    }

    private changeValue(type: string, value: Event) {
        let {user} = this.state;
        user = user.set(type, (value.target as any).value);
        this.setState({user});
    }

    private sendUser() {
        this.nextStep(2);
    }
}

export const EarlyModalBlock: any = connect((state: IState) => ({
    earlyModal: state.home.get("earlyModal"),
}))(EarlyModal as any);
export default EarlyModalBlock;
