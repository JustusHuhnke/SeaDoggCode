import {List} from "immutable";

export interface IWorldPoint {
    x: number;
    y: number;
}
export interface IWorldLocations {
    code: string;
    title: string;
    description: string;
    avatar: string;
    user_name: string;
    user_description: string;
    location: string;
    tel: string;
    mail: string;
    point: IWorldPoint;
}

export interface IWorldState {
    locations: List<IWorldLocations>;

    [id: string]: any;
}
