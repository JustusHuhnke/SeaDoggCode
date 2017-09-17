import { combineEpics } from "redux-observable";
// import {addCount} from "./counter";
import {setTransparentMenu} from "./navigation";

export default combineEpics(
    setTransparentMenu,
);
