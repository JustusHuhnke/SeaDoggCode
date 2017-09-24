import {ButtonComponent} from "_components/ButtonComponent";
import {IconComponent} from "_components/IconComponent";
import {ImageComponent} from "_components/ImageComponent";
import InputComponent from "_components/InputComponent";
import {LinkComponent} from "_components/LinkComponent";
import {PureComponent} from "_components/PureComponent";
import {SelectComponent} from "_components/SelectComponent";
import {component} from "_style";
import Rbem from "_utils/rbem";
import {List} from "immutable";
import * as React from "react";
import {IHelloProps} from "./interface";

interface ITempTestComponent {
    valueForInput: string;
}

export class Test extends React.Component<IHelloProps, ITempTestComponent> {

    public static defaultProps: IHelloProps = {
        compiler: "Test",
        framework: "work",
    };

    constructor(props: IHelloProps) {
        super(props);
        this.changeInputValue = this.changeInputValue.bind(this);
        this.state = {
            valueForInput: "Change me!",
        };
    }

    public render() {

        // Icon
        const styleIconBem = new Rbem(component, "icon");
        const styleIcon = {
            [styleIconBem.get()]: true,
            [styleIconBem.get(null, "white")]: false,
            [styleIconBem.get(null, "red")]: true,
        };

        // Select
        const styleSelect = {
            [component.select]: true,
        };
        const selectOptions = List([
            {
                label: "One",
                value: "one",
            },
            {
                label: "Two",
                value: "two",
            },
        ]);

        // Image
        const imageCustom = List([
            {src: "http://via.placeholder.com/350x150?text=custom1", media: "(min-width: 1367px) and (max-width: 1920px)"},
            {src: "http://via.placeholder.com/350x150?text=custom2", media: "(min-width: 769px) and (max-width: 1366px)"},
        ]);

        return (
            <PureComponent>
                {this.props.children}
                <PureComponent tag="section">
                    List of components
                </PureComponent>
                <PureComponent tag="section">
                    Icons:
                    <IconComponent name="download" className={styleIcon} />
                </PureComponent>
                <PureComponent tag="section">
                    Selects default:
                    <SelectComponent className={styleSelect} options={selectOptions} />
                </PureComponent>
                <PureComponent tag="section">
                    Selects creatable:
                    <SelectComponent className={styleSelect} options={selectOptions} creatable={true} />
                </PureComponent>
                <PureComponent tag="section">
                    Image default:
                    <ImageComponent src={"image1.jpg"} alt={"Image Text"} />
                </PureComponent>
                <PureComponent tag="section">
                    On image default:
                    <ImageComponent src={"image1.jpg"} alt={"Image Text"} ones={true} />
                </PureComponent>
                <PureComponent tag="section">
                    One image custom:
                    <ImageComponent imgSrc={"http://via.placeholder.com/350x150?text=oneimage"} alt={"Image Text"} />
                </PureComponent>
                <PureComponent tag="section">
                    Image custom:
                    <ImageComponent imgSrc={"http://via.placeholder.com/350x150?text=custom"} alt={"Image Text"} custom={imageCustom} />
                </PureComponent>
                <PureComponent tag="section">
                    Default Link:
                    <LinkComponent href={"/"} title={"Home"} />
                </PureComponent>
                <PureComponent tag="section">
                    Link with icon:
                    <LinkComponent href={"/"} title={"Home"} icon={"download"} iconClass={styleIcon} />
                </PureComponent>
                <PureComponent tag="section">
                    Custom children in link:
                    <LinkComponent href={"/"}><ImageComponent src={"image1.jpg"} alt={"Image Text"} /></LinkComponent>
                </PureComponent>
                <PureComponent tag="section">
                    Default button:
                    <ButtonComponent title={"This is button"} />
                </PureComponent>
                <PureComponent tag="section">
                    Button with icon:
                    <ButtonComponent title={"This is button with icon"} icon={"download"} iconClass={styleIcon} />
                </PureComponent>
                <PureComponent tag="section">
                    Input default:
                    <InputComponent />
                </PureComponent>
                <PureComponent tag="section">
                    TextArea default:
                    <InputComponent type={"textarea"} />
                </PureComponent>
                <PureComponent tag="section">
                    Input autosize:
                    <InputComponent autosize={true} value={this.state.valueForInput} onChange={this.changeInputValue} />
                </PureComponent>
                <PureComponent tag="section">
                    Textarea autosize:
                    <InputComponent type={"textarea"} autosize={true} />
                </PureComponent>
                <PureComponent tag="section">
                    Input with label:
                    <InputComponent label={"Login"}/>
                </PureComponent>
                <PureComponent tag="section">
                    Input with label and error:
                    <InputComponent label={"Login"} error={true}/>
                </PureComponent>
                <PureComponent tag="section">
                    Input with label and error text:
                    <InputComponent label={"Login"} error={"Login can't be empty!"}/>
                </PureComponent>
                <PureComponent tag="section">
                    Input disabled:
                    <InputComponent disabled={true}/>
                </PureComponent>
                <PureComponent tag="section">
                    Input mask variant 1:
                    <InputComponent mask="+4\9 99 999 99" maskChar={null} />
                </PureComponent>
                <PureComponent tag="section">
                    Input mask variant 2:
                    <InputComponent mask={"+380 99 999 99 99"}/>
                </PureComponent>
                <PureComponent tag="section">
                    Input mask variant 3:
                    <InputComponent mask={"99-99-9999"} defaultValue="24-09-2017" />
                </PureComponent>
                <PureComponent tag="section">
                    Input mask variant 4:
                    <InputComponent mask="99/99/9999" placeholder="Enter birthdate" />
                </PureComponent>
                <PureComponent tag="section">
                    Input only number:
                    <InputComponent type="number" />
                </PureComponent>
                <PureComponent tag="section">
                    Input currency:
                    <InputComponent type="number" decimalPrecision={2} prefix={"$"} />
                </PureComponent>
                <PureComponent tag="section">
                    Input only number with mask:
                    <InputComponent type="number" decimalPrecision={2} format={"# ###.##"} />
                </PureComponent>
            </PureComponent>
        );
    }

    private changeInputValue(event: Event) {
        const target = event.target as HTMLInputElement;
        this.setState({valueForInput: target.value});
    }
}

export default Test;
