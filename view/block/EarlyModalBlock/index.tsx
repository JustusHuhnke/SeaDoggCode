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
            step: 0,
            user: Map({
                name: "",
                email: "",
                phone: "",
            }),
            checkList: List([
                {
                    icon: "renter",
                    viewBox: "0 0 40 36",
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
                    icon: "captain",
                    viewBox: "0 0 44 31",
                    checked: false,
                    name: "captain",
                    title: "Captain",
                },
                {
                    icon: "experience",
                    viewBox: "0 0 42 36",
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
                    <h2 className={modalStyle.get("heading")}>Get early access</h2>
                    <p className={modalStyle.get("text")}>Select your user type. We don't limit you to just one!</p>
                    <div className={modalStyle.get("first_screen")}>
                        {
                            checkList.map(({title, icon, viewBox, checked}: IEarlyCheck, key) => (
                                <div className={modalStyle.get("role-check")} key={key} onClick={this.selectType.bind(this, key, !checked)}>
                                    <IconComponent
                                        name={icon}
                                        viewBox={viewBox}
                                        className={{
                                            [iconStyle.get("check")]: true,
                                            [iconStyle.get("check", "active")]: checked,
                                        }}
                                    />
                                    <IconComponent
                                        name="check_circle"
                                        viewBox="0 0 20 20"
                                        className={{
                                            [iconStyle.get("check_circle")]: true,
                                            [iconStyle.get("check_circle", "active")]: checked,
                                        }}
                                    />
                                    <span
                                        className={classnames({
                                            [modalStyle.get("role-title")]: true,
                                            [modalStyle.get("role-title", "active")]: checked,
                                        })}
                                    >
                                        {title}
                                    </span>
                                </div>
                            )).toArray()}
                    </div>
                    <ButtonComponent
                        title={"next"}
                        disabled={firstButton}
                        className={{
                            [buttonStyle.get(null, "green")]: !firstButton,
                            [modalStyle.get("button")]: true,
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
                    <h2 className={modalStyle.get("heading")}>Get early access</h2>
                    <p className={modalStyle.get("text")}>Please, fill in this short form</p>
                    <div className={modalStyle.get("second_screen")}>
                        <div className={modalStyle.get("input-field")}>
                            <InputComponent placeholder={"Your name"} type="input" onChange={this.changeValue.bind(this, "name")} value={user.get("name")} />
                        </div>
                        <div className={modalStyle.get("input-field")}>
                            <InputComponent placeholder={"Email"} type="input" onChange={this.changeValue.bind(this, "email")} value={user.get("email")} />
                        </div>
                        <div className={modalStyle.get("input-field")}>
                            <InputComponent placeholder={"Phone"} mask={"+1-999-999-9999"} onChange={this.changeValue.bind(this, "phone")} value={user.get("phone")} />
                        </div>
                    </div>
                    <ButtonComponent
                        title={"Get early access"}
                        disabled={secondButton}
                        className={{
                            [buttonStyle.get(null, "green")]: !secondButton,
                            [modalStyle.get("button")]: true,
                        }}
                        onClick={this.sendUser}
                    />
                    <div className={modalStyle.get("back-control")}>
                        <span onClick={this.nextStep.bind(this, 0)}>Back</span>
                    </div>
                </div>
                <div
                    className={classnames({
                        [modalStyle.get("tab")]: true,
                        [modalStyle.get("tab", "active")]: step === 2,
                    })}
                >
                    <div className={modalStyle.get("third_screen")}>
                        <h2 className={modalStyle.get("heading")}>Welcome aboard!</h2>
                        <p className={modalStyle.get("text")}>You have successfully subscribed to SeaDogg. Further updates and information will be provided through our Newsletter.</p>
                        <ButtonComponent
                            title={"Close (5 sec)"}
                            className={`${buttonStyle.get(null, "green")} ${modalStyle.get("button")}`}
                            onClick={toggleModal.bind(toggleModal, false)}
                        />
                    </div>
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
        if (process.env.BROWSER) {
            const {socket} = require("../../../client/socket");
            let user = this.state.user.toJS();
            user = {...user, checkList: this.state.checkList.filter((e) => e.checked).map((e) => e.name).toArray()};

            socket.emit("saveEarly", user, () => {
                this.nextStep(2);
                setTimeout(() => {
                    toggleModal(false);
                }, 5000);
            });
        }
    }
}

export const EarlyModalBlock: any = connect((state: IState) => ({
    earlyModal: state.home.get("earlyModal"),
}))(EarlyModal as any);
export default EarlyModalBlock;
