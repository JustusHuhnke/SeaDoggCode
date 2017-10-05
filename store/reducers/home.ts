import {IActive} from "_reducers";
import {List, Map} from "immutable";
import {IWorldPoint, IWorldState} from "../../view/block/WorldMapBlock/interface";
import {CHANGE_HOME_MAP_POINT, TOOGLE_EARLY_ACCESS_MODAL} from "../constants";

interface IHome {
    type: typeof CHANGE_HOME_MAP_POINT | typeof TOOGLE_EARLY_ACCESS_MODAL;
    data: any;
}

type Home = IHome | IActive;

export interface IHomeModel {
    earlyModal: boolean;
    locations: List<IWorldState>;
}

export default (state = Map({
    locations: List([
    //     {
    //     code: "BS",
    //     title: "The Bahamas",
    //     description: "Country in the Caribbean",
    //     avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    //     user_name: "Anthony Torres",
    //     user_description: "SeaDogg official representative on The Bahamas",
    //     location: "345 Queen’s Hwy, Andros Town, The Bahamas  95050",
    //     tel: "+1 (650) 823 3668",
    //     mail: "hello@seadogg.com",
    //     point: null,
    // },
        {
            code: "HAWAII",
            title: "Hawaii",
            description: "Islands in the Pacific",
            avatar: "felix_team.jpg",
            user_name: "Felix",
            user_description: "Official SeaDogg representative on Hawaii",
            location: "Hanalei, Kauai, HI 96714",
            tel: "+1 (650) 823 366 8",
            mail: "felix@seadogg.com",
            point: null,
        },
    ]),
    earlyModal: false,
}),             {type, data}: Home) => {
    switch (type) {
        case CHANGE_HOME_MAP_POINT:
            let locations: any = state.get("locations");
            data.forEach((point: IWorldPoint, key: number) => {
                const location: any = locations.get(key);
                locations = locations.set(key, {...location, point});
            });
            return state.set("locations", locations);
        case TOOGLE_EARLY_ACCESS_MODAL:
            const earlyModal = !!data;
            return state.set("earlyModal", earlyModal);
        default:
            return state;
    }
};
