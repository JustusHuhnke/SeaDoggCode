import {changeHomeMapPoint} from "_actions";
import {IconComponent} from "_components/IconComponent";
import ImageComponent from "_components/ImageComponent";
import {PureComponent} from "_components/PureComponent";
import {IState} from "_reducers";
import {block, component, section} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";
import {connect} from "react-redux";
import {IWorldLocations, IWorldPoint, IWorldState} from "./interface";

const worldStyle = new Rbem(block, "world");
const iconStyle = new Rbem(component, "icon");

class WorldMap extends React.Component<IWorldState, {}> {

    private worldIcon: HTMLElement;
    private prom: any;

    constructor(props: IWorldState) {
        super(props);
        this.setWorldIcon = this.setWorldIcon.bind(this);
        this.showElements = this.showElements.bind(this);
        this.resizeWindow = this.resizeWindow.bind(this);
    }

    public componentDidMount() {
        if (process.env.BROWSER) {
            window.addEventListener("resize", this.resizeWindow);
        }
    }

    public componentWillUnmount() {
        if (process.env.BROWSER) {
            window.removeEventListener("resize", this.resizeWindow);
        }
    }

    public render() {
        const styleList = [section.section, worldStyle.get()];
        const {locations, dispatch, ...otherProps} = this.props;

        return (
            <PureComponent tag="section" className={styleList} {...otherProps}>
                <h2 className={section.section__name}>Location</h2>
                <p className={worldStyle.get("text")}>We have started testing our service in one location,but are always looking to expand!</p>
                <div className={worldStyle.get("block")}>
                    <IconComponent onLoaded={this.showElements} refComponent={this.setWorldIcon} name="world_map" viewBox="0 0 1010 650" className={worldStyle.get("icon")} />
                    {locations.map(({code, point, title, description, avatar, user_name, user_description, location, tel, mail}: IWorldLocations) => (
                        point &&
                        <div key={code} className={worldStyle.get("tooltip")} style={{left: point.x, top: point.y}}>
                            <IconComponent className={worldStyle.get("point")} name="ic_point" viewBox="0 0 18 18"/>
                            <h2 className={worldStyle.get("marker-title")}>{title}</h2>
                            <div className={worldStyle.get("tooltip-block")}>
                                <h3 className={worldStyle.get("title")}>{title}</h3>
                                <p className={worldStyle.get("title-descr")}>{description}</p>
                                <div className={worldStyle.get("user")}>
                                    <div className={worldStyle.get("avatar")}><ImageComponent alt={user_name} src={avatar} /></div>
                                    <div className={worldStyle.get("user_name")}>{user_name}</div>
                                    <div className={worldStyle.get("user_descr")}>{user_description}</div>
                                </div>
                                <div className={worldStyle.get("item")}>
                                    <IconComponent name="contact_address" viewBox="0 0 20 27" className={iconStyle.get(null, "map_marker")} />
                                    <p className={worldStyle.get("descr")}>{location}</p>
                                </div>
                                <div className={worldStyle.get("item")}>
                                    <IconComponent name="contact_phone" viewBox="0 0 18 26"/>
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
                <div className={worldStyle.get("info-us")}>
                    <div className={worldStyle.get("count")}>14 567</div>
                    <span className={worldStyle.get("text")}>happy people already with us</span>
                </div>
            </PureComponent>
        );
    }

    private showElements(prom?: Promise<{}>) {
        if (prom) {
            this.prom = prom;
        }
        this.prom.then(() => {
            const {locations} = this.props;
            const svg = this.worldIcon.children[0];
            const bigMap: any = document.getElementById("world_map");

            svg.innerHTML = bigMap.innerHTML;
            const children: any = svg.children;

            const points: any = locations.map((info: IWorldLocations) => {
                const {top: topChild, left: leftChild} = children[info.code].getBoundingClientRect();
                const {top: topMap, left: leftMap} = svg.getBoundingClientRect();
                const point: IWorldPoint = {
                    x: leftChild - leftMap,
                    y: topChild - topMap,
                };
                return point;
            });
            changeHomeMapPoint(points);
        });
    }

    private setWorldIcon(element: HTMLElement) {
        this.worldIcon = element;
    }

    private resizeWindow() {
        if (process.env.BROWSER) {
            const widthWin: number = window.innerWidth;
            if (widthWin >= 768) {
                this.showElements();
            }
        }
    }
}

export const WorldMapBlock: any = connect((state: IState) => ({
    locations: state.home.get("locations"),
}))(WorldMap as any);
export default WorldMapBlock;
