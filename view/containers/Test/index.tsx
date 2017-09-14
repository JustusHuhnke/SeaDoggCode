import {IconComponent} from "_components/Icon";
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

        const styleIcon = {
            [component.icon]: true,
            [component["icon--white"]]: false,
            [component["icon--red"]]: true,
        };

        const styleSelect = {
            [component.select]: true,
        };
        //
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
            </PureComponent>
        );
    }
}

export default Test;
