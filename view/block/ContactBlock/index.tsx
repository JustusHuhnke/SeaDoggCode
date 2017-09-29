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
                    <div className={`${section.row} ${contactStyle.get("info")}`}>
                        <h2 className={section.section__name}>Contact</h2>
                        <div className="col-lg-4 col-sm-12">
                            <div className={contactStyle.get("item")}>
                                <IconComponent name="contact_address" viewBox="0 0 20 27" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className={contactStyle.get("item")}>
                                <IconComponent name="contact_phone" viewBox="0 0 18 26" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className={contactStyle.get("item")}>
                                <IconComponent name="contact_email" viewBox="0 0 26 18" className={iconStyle.get(null, "mail")} />
                            </div>
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
