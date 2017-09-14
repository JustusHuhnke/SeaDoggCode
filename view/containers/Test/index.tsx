import {IconComponent} from "_components/Icon";
import {ImageComponent} from "_components/Image";
import {IImageParams} from "_components/Image/interface";
import {PureComponent} from "_components/PureComponent";
import {SelectComponent} from "_components/Select";
import {component} from "_style";
import {List, Map} from "immutable";
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
        const imageSource: IImageParams = Map({
            main: "http://via.placeholder.com/350x150?text=2K",
            ultra: "http://via.placeholder.com/350x150?text=2K",
            full: "http://via.placeholder.com/350x150?text=1920px",
            hd: "http://via.placeholder.com/350x150?text=1366px",
            wide: "http://via.placeholder.com/350x150?text=768px",
            half: "http://via.placeholder.com/350x150?text=480px",
        });

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
                    Image:
                    <ImageComponent src={imageSource} />
                </PureComponent>
            </PureComponent>
        );
    }
}

export default Test;
