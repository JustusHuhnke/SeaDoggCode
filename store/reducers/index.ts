import count, {ICountModel} from "_reducer/count";
import home, {IHomeModel} from "_reducer/home";
import navigation, {INavigationModel} from "_reducer/navigation";
import {Map} from "immutable";
import { combineReducers } from "redux";
import routing from "./routing";

export default combineReducers({
    count,
    home,
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
    home: Map<any, IHomeModel>;
    navigation: Map<any, INavigationModel>;
}
