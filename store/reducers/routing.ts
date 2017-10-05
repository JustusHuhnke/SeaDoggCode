import {createBrowserHistory, History} from "history";
import {fromJS, Map} from "immutable";
import {LOCATION_CHANGE} from "../constants";

export let history: History = process.env.BROWSER && createBrowserHistory();

export interface IRoute {
    type: typeof LOCATION_CHANGE;
    payload?: {
        location: string;
    };
    data?: any;
}

let initState: any = {location: "/"};
if (process.env.BROWSER) {
    initState = fromJS(((window as any).__initialState__ || {}).routing || initState);
}

const route = (state = Map(initState), action: IRoute) => {
    const {type, payload} = action;
    state = state instanceof Map && state || Map(state);

    switch (type) {
        case LOCATION_CHANGE:
            return state.set("location", payload.location);
        default:
            return state;
    }
};
export default route;
