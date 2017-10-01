import {IActive} from "_reducers";
import {List, Map} from "immutable";
import {CHANGE_TRANSPARENT_MENU} from "../constants";

export interface INavigationElement {
    link: string;
    title: string;
}

export interface INavigationModel {
    home: List<INavigationElement>;
    homeTransparent?: boolean;
}

interface INav {
    type: typeof CHANGE_TRANSPARENT_MENU;
}

type Nav = INav | IActive;

export default (state = Map({
    home: List([
            {link: "/#about", title: "About"},
            {link: "/#features", title: "Features"},
            {link: "/#works", title: "How it works"},
            {link: "/#location", title: "Location"},
            {link: "/#contact", title: "Contact"},
        ]),
    homeTransparent: true,
}),             {type}: Nav) => {
    switch (type) {
        case CHANGE_TRANSPARENT_MENU:
            return state.set("homeTransparent", !state.get("homeTransparent"));
        default:
            return state;
    }
};
