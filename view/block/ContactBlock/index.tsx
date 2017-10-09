import {IconComponent} from "_components/IconComponent";
import {MapComponent} from "_components/MapComponent";
import {PureComponent} from "_components/PureComponent";
import {block, component, section} from "_style";
import Rbem from "_utils/rbem";
import {Map} from "immutable";
import * as React from "react";
import {IContact} from "./interface";

const contactStyle = new Rbem(block, "contact");
const iconStyle = new Rbem(component, "icon");

export class ContactBlock extends React.Component<IContact, {}> {
    public render() {
        const styleList = [section.section, block.contact];

        const mapPosition = Map({
            lat: 37.368886,
            lng: -122.096887,
        });

        const markersPosition = [{
            lat: 37.368886,
            lng: -122.096887,
        }];

        return (
            <PureComponent tag="section" className={styleList} {...this.props}>
                <div className={section.container}>
                    <div className={`${section.row} ${contactStyle.get("info")}`}>
                        <h2 className={section.section__name}>Contact</h2>
                        <div className={`${section["col-lg-6"]} ${section["col-sm-12"]} ${contactStyle.get("item")}`}>
                            <IconComponent name="contact_address" viewBox="0 0 20 27" />
                            <p className={contactStyle.get("descr")}>685 Riverside Drive,<br/> Los Altos, CA, 94024</p>
                        </div>
                        {/*<div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${contactStyle.get("item")}`}>*/}
                            {/*<IconComponent name="contact_phone" viewBox="0 0 18 26" />*/}
                            {/*<p className={contactStyle.get("descr")}>+1 (650) 823 3668</p>*/}
                        {/*</div>*/}
                        <div className={`${section["col-lg-6"]} ${section["col-sm-12"]} ${contactStyle.get("item")}`}>
                            <IconComponent name="contact_email" viewBox="0 0 26 18" className={iconStyle.get(null, "mail")} />
                            <p className={`${contactStyle.get("descr")} ${contactStyle.get("descr", "mail")}`}>connect@seadogg.com</p>
                        </div>
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
