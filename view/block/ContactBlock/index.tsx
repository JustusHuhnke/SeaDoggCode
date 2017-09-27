import {MapComponent} from "_components/MapComponent";
import {PureComponent} from "_components/PureComponent";
import {block, section} from "_style";
import {Map} from "immutable";
import * as React from "react";
import {IContact} from "./interface";

export class ContactBlock extends React.Component<IContact, {}> {
    public render() {
        const styleList = [section.section, block.contact];

        const mapPosition = Map({
            lat: 49,
            lng: 32,
        });

        return (
            <PureComponent tag="section" className={styleList}>
                <div className={section.container}>
                    <div className={section.row}>
                        <h2 className={section.section__name}>Contact</h2>
                    </div>
                </div>
                <MapComponent
                    position={mapPosition}
                    zoom={5}
                />
            </PureComponent>
        );
    }
}
export default ContactBlock;
