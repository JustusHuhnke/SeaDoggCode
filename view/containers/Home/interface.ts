import {ICountModel} from "_reducer/count";
import {Map} from "immutable";

export interface IHelloProps {
    compiler?: string;
    framework?: string;
    homeTransparent?: boolean;
    count: Map<any, ICountModel>;
}
