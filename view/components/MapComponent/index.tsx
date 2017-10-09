import {IconComponent} from "_components/IconComponent";
import {component} from "_style";
import classnames from "_utils/classnames";
import * as React from "react";
import {IMapComponent, IMapPosition} from "./interface";

let DivIcon: any;
let Map: any;
let TileLayer: any;

if (process.env.BROWSER) {
    DivIcon = require("react-leaflet-div-icon").default;
    Map = require("react-leaflet").Map;
    TileLayer = require("react-leaflet").TileLayer;
}

export class MapComponent extends React.Component<IMapComponent, {}> {

    public static defaultProps: IMapComponent = {
        className: component.map,
    };

    public render() {

        const {className, markersPosition = [], position, ...otherProps} = this.props;
        const classes = classnames(component.map, className);

        const markers = DivIcon && markersPosition.map((el: IMapPosition, key: number) => (
            <DivIcon position={el} key={key}>
                <IconComponent name="map_marker" viewBox="0 0 36 50" />
            </DivIcon>
        ));

        return Map && TileLayer && (
            <Map
                center={position.toJS()}
                className={classes}
                scrollWheelZoom={false}
                {...otherProps}
                zoom={9}
            >
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/alexavakarchuk/cj835fiywa8ap2srylgqwgyy6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleGF2YWthcmNodWsiLCJhIjoiY2oyYXp5cWQ3MDAxNzMzcGplZG0wMXRzYSJ9.6gYWnhlH0Zg5sHLIFqpm4Q"
                    attribution="<attribution>"
                />
                {markers}
            </Map>
        ) || null;
    }
}

export default MapComponent;
