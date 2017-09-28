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
            lat: 37.318562,
            lng: -121.942482,
        });

        const markersPosition = [{
            lat: 37.318562,
            lng: -121.942482,
        }];

        return (
            <PureComponent tag="section" className={styleList} {...this.props}>
                <div className={section.container}>
                    <div className={section.row}>
                        <h2 className={section.section__name}>Contact</h2>
                    </div>
                </div>
                <MapComponent
                    position={mapPosition}
                    markersPosition={markersPosition}
                    zoom={16}
                />
            </PureComponent>
        );
    }
}
export default ContactBlock;
