import {Map} from "immutable";
import { combineReducers } from "redux";
import count, {ICountModel} from "./count";
import navigation, {INavigationModel} from "./navigation";
import routing from "./routing";

export default combineReducers({
    count,
    navigation,
    routing: process.env.BROWSER ? routing : null,
});

export interface IActive {
    type: string;
    data: any;
    payload: any;
}

export interface IState {
    count: Map<any, ICountModel>;
    navigation: Map<any, INavigationModel>;
}
