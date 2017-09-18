import {ErrorComponent} from "_components/ErrorComponent";
import {LoadingComponent} from "_components/LoadingComponent";
import createLazyContainer from "react-lazy-import";

const EarlyAccessBlock = process.env.NODE_ENV === "production" &&
    createLazyContainer(() => import("./EarlyAccessBlock"), LoadingComponent, ErrorComponent) ||
    require("./EarlyAccessBlock").default;

const HeaderBlock = process.env.NODE_ENV === "production" &&
    createLazyContainer(() => import("./HeaderBlock"), LoadingComponent, ErrorComponent) ||
    require("./HeaderBlock").default;

const HomeAboutBlock = process.env.NODE_ENV === "production" &&
    createLazyContainer(() => import("./HomeAboutBlock"), LoadingComponent, ErrorComponent) ||
    require("./HomeAboutBlock").default;

export {
    EarlyAccessBlock,
    HeaderBlock,
    HomeAboutBlock,
};
