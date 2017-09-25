import {InputComponent} from "_components/InputComponent";
import SelectComponent from "_components/SelectComponent";
import {component} from "_style";
import {List} from "immutable";
import * as React from "react";
import * as Modal from "react-modal";
import {IEarlyModal} from "./interface";

const overlayStyle = {
    base: component.modal__overlay,
};
const ModalBlock = process.env.BROWSER && ((Modal as any).default || Modal);

export class EarlyModalBlock extends React.Component<IEarlyModal | any, {}> {

    public static defaultProps: IEarlyModal = {
        open: false,
    };

    public render() {
        const {open, ...otherProps} = this.props;

        const selectOptions = List([
            {
                label: "Option 1",
                value: "value1",
            },
            {
                label: "Option 2",
                value: "value2",
            },
            {
                label: "Option 3",
                value: "value4",
            },
        ]);

        return ModalBlock && (
            <div>
                <ModalBlock
                    isOpen={open}
                    contentLabel="Modal"
                    overlayClassName={overlayStyle}
                    {...otherProps}
                >
                    <p>Input(type = input): <InputComponent type="input" /></p>
                    <p>Input(type = number): <InputComponent type="number" /></p>
                    <p>Input(type = textarea): <InputComponent type="textarea" /></p>
                    <p>Select: <SelectComponent options={selectOptions} /></p>
                </ModalBlock>
            </div>
        );
    }
}

export default EarlyModalBlock;
