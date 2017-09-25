import {classNames} from "_style";
import {ImmutableMap} from "_utils/interface";

interface IMapPosition {
    lat: number;
    lng: number;
}

export interface IMapComponent {
    className?: classNames;
    position?: ImmutableMap<IMapPosition>;
    zoom?: number;
}
