import {ErrorComponent} from "_components/ErrorComponent";
import LazyLoadComponent from "_components/LazyLoadComponent";
import {LoadingComponent} from "_components/LoadingComponent";
declare const System: { import: (path: string) => Promise<any>; };

let ContactBlock: any;
let EarlyAccessBlock: any;
let EarlyModalBlock: any;
let FooterBlock: any;
let HeaderBlock: any;
let HomeAboutBlock: any;
let SubscribeBlock: any;
let WorldMapBlock: any;
if (process.env.BROWSER) {
   ContactBlock = LazyLoadComponent(() => System.import("./ContactBlock"), LoadingComponent, ErrorComponent);
   EarlyAccessBlock = LazyLoadComponent(() => System.import("./EarlyAccessBlock"), LoadingComponent, ErrorComponent);
   EarlyModalBlock = LazyLoadComponent(() => System.import("./EarlyModalBlock"), LoadingComponent, ErrorComponent);
   FooterBlock = LazyLoadComponent(() => System.import("./FooterBlock"), LoadingComponent, ErrorComponent);
   HeaderBlock = LazyLoadComponent(() => System.import("./HeaderBlock"), LoadingComponent, ErrorComponent);
   HomeAboutBlock = LazyLoadComponent(() => System.import("./HomeAboutBlock"), LoadingComponent, ErrorComponent);
   SubscribeBlock = LazyLoadComponent(() => System.import("./SubscribeBlock"), LoadingComponent, ErrorComponent);
   WorldMapBlock = LazyLoadComponent(() => System.import("./WorldMapBlock"), LoadingComponent, ErrorComponent);
} else {
   ContactBlock = require("./ContactBlock").default;
   EarlyAccessBlock = require("./EarlyAccessBlock").default;
   EarlyModalBlock = require("./EarlyModalBlock").default;
   FooterBlock = require("./FooterBlock").default;
   HeaderBlock = require("./HeaderBlock").default;
   HomeAboutBlock = require("./HomeAboutBlock").default;
   SubscribeBlock = require("./SubscribeBlock").default;
   WorldMapBlock = require("./WorldMapBlock").default;
}
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
