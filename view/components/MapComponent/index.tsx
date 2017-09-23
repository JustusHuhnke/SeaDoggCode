import {component} from "_style";
import classnames from "_utils/classnames";
import * as React from "react";
// import {Map, TileLayer} from "react-leaflet";
import {IMapComponent} from "./interface";

let Map: any;
let TileLayer: any;

if (process.env.BROWSER) {
    Map = require("react-leaflet").Map;
    TileLayer = require("react-leaflet").TileLayer;
}

export class MapComponent extends React.Component<IMapComponent, {}> {

    public static defaultProps: IMapComponent = {
        className: component.map,
    };

    /* tslint:disable:max-line-length */
    public render() {

        const {className, position, ...otherProps} = this.props;

        const classes = classnames(component.map, className);

        return Map && TileLayer && (
            <Map
                center={position}
                className={classes}
                scrollWheelZoom={false}
                zoom={5}
                {...otherProps}
            >
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/alexavakarchuk/cj2blrpgb007o2srtsopv66wy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleGF2YWthcmNodWsiLCJhIjoiY2oyYXp5cWQ3MDAxNzMzcGplZG0wMXRzYSJ9.6gYWnhlH0Zg5sHLIFqpm4Q"
                    attribution="<attribution>"
                />
            </Map>
        ) || null;
    }
    /* tslint:enable:max-line-length */
}

export default MapComponent;
