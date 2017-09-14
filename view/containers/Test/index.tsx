import {IconComponent} from "_components/Icon";
import {ImageComponent} from "_components/Image";
import {PureComponent} from "_components/PureComponent";
import {SelectComponent} from "_components/Select";
import {component} from "_style";
import {List} from "immutable";
import * as React from "react";
import {IHelloProps} from "./interface";

export class Test extends React.Component<IHelloProps, undefined> {

    public static defaultProps: IHelloProps = {
        compiler: "Test",
        framework: "work",
    };

    constructor(props: IHelloProps) {
        super(props);
    }

    public render() {

        // Icon
        const styleIcon = {
            [component.icon]: true,
            [component["icon--white"]]: false,
            [component["icon--red"]]: true,
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
                    <ImageComponent src={"http://via.placeholder.com/350x150?text="} alt={"Image Text"} />
                </PureComponent>
                <PureComponent tag="section">
                    Image custom:
                    <ImageComponent src={"http://via.placeholder.com/350x150?text=custom"} alt={"Image Text"} custom={imageCustom} />
                </PureComponent>
            </PureComponent>
        );
    }
}

export default Test;
