import {ErrorComponent} from "_components/ErrorComponent";
import LazyLoadComponent from "_components/LazyLoadComponent";
import {LoadingComponent} from "_components/LoadingComponent";
declare const System: { import: (path: string) => Promise<any>; };

const ContactBlock = process.env.BROWSER &&
   LazyLoadComponent(() => System.import("./ContactBlock"), LoadingComponent, ErrorComponent) ||
   require("./ContactBlock").default;

const EarlyAccessBlock = process.env.BROWSER &&
   LazyLoadComponent(() => System.import("./EarlyAccessBlock"), LoadingComponent, ErrorComponent) ||
   require("./EarlyAccessBlock").default;

const EarlyModalBlock = process.env.BROWSER &&
   LazyLoadComponent(() => System.import("./EarlyModalBlock"), LoadingComponent, ErrorComponent) ||
   require("./EarlyModalBlock").default;

const FooterBlock = process.env.BROWSER &&
   LazyLoadComponent(() => System.import("./FooterBlock"), LoadingComponent, ErrorComponent) ||
   require("./FooterBlock").default;

const HeaderBlock = process.env.BROWSER &&
   LazyLoadComponent(() => System.import("./HeaderBlock"), LoadingComponent, ErrorComponent) ||
   require("./HeaderBlock").default;

const HomeAboutBlock = process.env.BROWSER &&
   LazyLoadComponent(() => System.import("./HomeAboutBlock"), LoadingComponent, ErrorComponent) ||
   require("./HomeAboutBlock").default;

const SubscribeBlock = process.env.BROWSER &&
   LazyLoadComponent(() => System.import("./SubscribeBlock"), LoadingComponent, ErrorComponent) ||
   require("./SubscribeBlock").default;

const WorldMapBlock = process.env.BROWSER &&
   LazyLoadComponent(() => System.import("./WorldMapBlock"), LoadingComponent, ErrorComponent) ||
   require("./WorldMapBlock").default;

export {
    ContactBlock,
    EarlyAccessBlock,
    EarlyModalBlock,
    FooterBlock,
    HeaderBlock,
    HomeAboutBlock,
    SubscribeBlock,
    WorldMapBlock,
};
