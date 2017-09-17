import store from "_store";
import {CLICK, LOCATION_CHANGE, TO_CHANGE_TRANSPARENT_MENU} from "../constants";
const {dispatch} = store;

// Routing
export const changeRoute = (payload: any) => dispatch({ payload, type: LOCATION_CHANGE});

// Counter
export const changeCount = () => dispatch({ type: CLICK });

// Navigation
export const setTransparent = (data: any) => dispatch({ type: TO_CHANGE_TRANSPARENT_MENU, data });
