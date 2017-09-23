import {classNames} from "_style";
import {Map} from "immutable";

interface IMapPosition {
    lat: number;
    lng: number;
}

export interface IMapComponent {
    className?: classNames;
    position?: Map<IMapPosition>;
}
