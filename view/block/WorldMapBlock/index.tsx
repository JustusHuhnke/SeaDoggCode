import {IconComponent} from "_components/IconComponent";
import ImageComponent from "_components/ImageComponent";
import {PureComponent} from "_components/PureComponent";
import {block, component, section} from "_style";
import Rbem from "_utils/rbem";
import {List} from "immutable";
import * as React from "react";
import {IWorldLocations, IWorldPoint, IWorldState} from "./interface";

const worldStyle = new Rbem(block, "world");
const iconStyle = new Rbem(component, "icon");

export class WorldMapBlock extends React.Component<{}, IWorldState> {

    private worldIcon: HTMLElement;

    constructor(props: {}) {
        super(props);
        this.setWorldIcon = this.setWorldIcon.bind(this);
        this.showElements = this.showElements.bind(this);

        this.state = {
            locations: List([{
                code: "BS",
                title: "The Bahamas",
                description: "Country in the Caribbean",
                avatar: "https://randomuser.me/api/portraits/women/26.jpg",
                user_name: "Anthony Torres",
                user_description: "SeaDogg official representative on The Bahamas",
                location: "345 Queen’s Hwy, Andros Town, The Bahamas  95050",
                tel: "+1 (650) 823 3668",
                mail: "hello@seadogg.com",
                point: null,
            }, {
                code: "HAWAII",
                title: "Hawaii",
                description: "Country in the Caribbean 2",
                avatar: "https://randomuser.me/api/portraits/women/28.jpg",
                user_name: "Anthony Torres 2",
                user_description: "SeaDogg official representative on The Bahamas 2",
                location: "3422 ahamas  95050",
                tel: "+1 (650) 000 000 0",
                mail: "hello2@seadogg.com",
                point: null,
            }]),
        };
    }

    public render() {
        const styleList = [section.section, worldStyle.get()];
        const {locations} = this.state;

        return (
            <PureComponent tag="section" className={styleList} {...this.props}>
                <h2 className={section.section__name}>Locations</h2>
                <div className={worldStyle.get("block")}>
                    <IconComponent onLoaded={this.showElements}refComponent={this.setWorldIcon} name="world_map" viewBox="0 0 1010 650" className={worldStyle.get("icon")}/>
                    {locations.map(({code, point, title, description, avatar, user_name, user_description, location, tel, mail}: IWorldLocations) => (
                        point && <div key={code} className={worldStyle.get("tooltip")} style={{left: point.x, top: point.y}}>
                            <IconComponent className={worldStyle.get("point")} name="ic_point" viewBox="0 0 18 18"/>
                            <h2 className={worldStyle.get("marker-title")}>{title}</h2>
                            <div className={worldStyle.get("tooltip-block")}>
                                <h3 className={worldStyle.get("title")}>{title}</h3>
                                <p className={worldStyle.get("title-descr")}>{description}</p>
                                <div className={worldStyle.get("user")}>
                                    <div className={worldStyle.get("avatar")}><ImageComponent alt={user_name} imgSrc={avatar} /></div>
                                    <div className={worldStyle.get("user_name")}>{user_name}</div>
                                    <div className={worldStyle.get("user_descr")}>{user_description}</div>
                                </div>
                                <div className={worldStyle.get("item")}>
                                    <IconComponent name="contact_address" viewBox="0 0 20 27" />
                                    <p className={worldStyle.get("descr")}>{location}</p>
                                </div>
                                <div className={worldStyle.get("item")}>
                                    <IconComponent name="contact_phone" viewBox="0 0 18 26" />
                                    <p className={worldStyle.get("descr")}>{tel}</p>
                                </div>
                                <div className={worldStyle.get("item")}>
                                    <IconComponent name="contact_email" viewBox="0 0 26 18" className={iconStyle.get(null, "mail")} />
                                    <p className={`${worldStyle.get("descr")} ${worldStyle.get("descr", "mail")}`}>{mail}</p>
                                </div>
                            </div>
                        </div>
                    )).toArray()}
                </div>
            </PureComponent>
        );
    }

    private showElements(prom: Promise<{}>) {
        setTimeout(() => {
            prom.then(() => {
                const svg = this.worldIcon.children[0];
                const bigMap: any = document.getElementById("world_map");

                svg.innerHTML = bigMap.innerHTML;
                const children: any = svg.children;

                const locations: any = this.state.locations.map((info: IWorldLocations) => {
                    const {top: topChild, left: leftChild} = children[info.code].getBoundingClientRect();
                    const {top: topMap, left: leftMap} = svg.getBoundingClientRect();
                    const point: IWorldPoint = {
                        x: leftChild - leftMap,
                        y: topChild - topMap,
                    };
                    return {...info, point};
                });
                this.setState({locations});
            });
        }, 0);
    }

    private setWorldIcon(element: HTMLElement) {
        this.worldIcon = element;
    }
}

export default WorldMapBlock;
