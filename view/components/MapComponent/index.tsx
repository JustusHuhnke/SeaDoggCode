import {IconComponent} from "_components/IconComponent";
import {component} from "_style";
import classnames from "_utils/classnames";
import * as React from "react";
// import DivIcon from "react-leaflet-div-icon"
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

        const {className, markersPosition, position, ...otherProps} = this.props;

        const classes = classnames(component.map, className);

        // const markers = {lat: 48.465807, lng: 35.051003}

        // const markers = markersPosition.map((el) => (
        //     <DivIcon position={el}>
        //         <IconComponent name="map_marker" viewBox="0 0 36 50" />
        //     </DivIcon>
        // ));

        return Map && TileLayer && (
            <Map
                center={position.toJS()}
                className={classes}
                scrollWheelZoom={false}
                {...otherProps}
            >
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/alexavakarchuk/cj835fiywa8ap2srylgqwgyy6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleGF2YWthcmNodWsiLCJhIjoiY2oyYXp5cWQ3MDAxNzMzcGplZG0wMXRzYSJ9.6gYWnhlH0Zg5sHLIFqpm4Q"
                    attribution="<attribution>"
                />
                {/*{markers}*/}
            </Map>
        ) || null;
    }
    /* tslint:enable:max-line-length */
}

export default MapComponent;
