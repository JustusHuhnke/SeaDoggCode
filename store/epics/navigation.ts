import {INavigationModel} from "_reducer/navigation";
import { Epic } from "redux-observable";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/take";
import {CHANGE_TRANSPARENT_MENU, TO_CHANGE_TRANSPARENT_MENU} from "../constants";

interface ITranparentAction {
    type: typeof CHANGE_TRANSPARENT_MENU | typeof TO_CHANGE_TRANSPARENT_MENU;
}

export const setTransparentMenu: Epic<ITranparentAction, INavigationModel> = (action$) =>
    action$.ofType(TO_CHANGE_TRANSPARENT_MENU)
        .filter(({data}: any): boolean => {
            const {transparent, scrollTop} = data;
            return (scrollTop > 10 && transparent === true) || (scrollTop <= 10 && transparent === false);
        })
        .mapTo<ITranparentAction, any>({type: CHANGE_TRANSPARENT_MENU});
