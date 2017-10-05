import {IActive} from "_reducers";
import {fromJS, Map} from "immutable";
import {ADD_ONE_EARLY} from "../constants";

interface ICount {
    type: typeof ADD_ONE_EARLY;
}

type Count = ICount | IActive;

export interface IUserModel {
    count: number;
}

let initState: any = {count: 0};
if (process.env.BROWSER) {
    initState = fromJS(((window as any).__initialState__ || {}).user || initState);
}

export default (state = Map(initState), {type}: Count) => {
    switch (type) {
        case ADD_ONE_EARLY:
            const count = state.get("count") as number;
            return state.set("count", count + 1);
        default:
            return state;
    }
};
