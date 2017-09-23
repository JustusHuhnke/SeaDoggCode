import {PureComponent} from "_components/PureComponent";
import {block, section} from "_style";
import * as React from "react";
import {IContact} from "./interface";
import {MapComponent} from "_components/MapComponent";

export class ContactBlock extends React.Component<IContact, {}> {
    public render() {
        const styleList = [section.section, block.contact];

        const mapPosition = {
            lat: 49,
            lng: 32,
        };

        return (
            <PureComponent tag="section" className={styleList}>
                <h2 className={section.section__name}>Contact</h2>
                <MapComponent
                    position={mapPosition}
                />
            </PureComponent>
        );
    }
}
export default ContactBlock;