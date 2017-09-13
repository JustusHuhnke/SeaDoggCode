import {IconComponent} from "_components/Icon";
import {PureComponent} from "_components/PureComponent";
import {SelectComponent} from "_components/Select";
import {component, sectionStyle} from "_style";
import * as React from "react";
import {IHelloProps} from "./interface";

@sectionStyle
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

        const selectOptions = [
            {
                label: "One",
                value: "one",
            },
            {
                label: "Two",
                value: "two",
            },
        ];

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
                    Selects:
                    <SelectComponent
                        name="test-select"
                        className={styleSelect}
                        defaultValue="one"
                        options={selectOptions}
                    />
                </PureComponent>
            </PureComponent>
        );
    }
}

export default Test;
