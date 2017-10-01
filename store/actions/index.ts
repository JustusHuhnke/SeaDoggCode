import store from "_store";
import {CHANGE_HOME_MAP_POINT, LOCATION_CHANGE, TO_CHANGE_TRANSPARENT_MENU} from "../constants";
const {dispatch} = store;

// Routing
export const changeRoute = (payload: any) => dispatch({ payload, type: LOCATION_CHANGE});

// Navigation
export const setTransparent = (data: any) => dispatch({ type: TO_CHANGE_TRANSPARENT_MENU, data });

// Home
export const changeHomeMapPoint = (data: any) => dispatch({ type: CHANGE_HOME_MAP_POINT, data });
