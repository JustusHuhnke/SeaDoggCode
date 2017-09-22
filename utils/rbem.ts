import {get} from "lodash";
import {IValueBlocks, IValueElements, IValueMods} from "../styles/interface";

interface IRbem {
    element: () => IRbem;
    mod: () => IRbem;

    get(): string;
}

interface ICustomBEM {
    element?: IValueElements[] | IValueElements;
    mod?: IValueMods[] | IValueMods;
}

const isString = (value: any): boolean => typeof value === "string";
const isArray = (value: any): boolean => Array.isArray(value);

/** Example
 * import {block, section} from "_style";
 * import Rbem from "_utils/rbem";
 *
 * const footer = new Rbem(block, "footer");
 * footer.get() -> footer
 * footer.element("text").get() -> footer__text
 * footer.mod("test").get() -> footer--test
 * footer.element("text", "my").get() -> footer__text__my
 * footer.element("text").mod("loby").get() -> footer__text--loby
 * footer.element("text", "my").mod("log").get() -> footer__text__my--log
 * footer.get([{ element: "text", mod: "loby"}, {element: "fdfdvdfv",mod: "koloko"}]) -> footer__text--loby__fdfdvdfv--koloko
 */

export class Rbem implements IRbem {
    private style: any;
    private blockName: IValueBlocks;
    private elements: IValueElements[];
    private mods: IValueMods[];
    private readonly elePrefix: string;
    private readonly modPrefix: string;

    constructor(style: any, blockName: IValueBlocks, elePrefix = "__", modPrefix = "--") {
        this.style = style;
        this.blockName = blockName;
        this.elePrefix = elePrefix;
        this.modPrefix = modPrefix;
        return this;
    }

    public element(...args: IValueElements[]) {
        this.elements = [...args];
        return this;
    }

    public mod(...args: IValueMods[]) {
        this.mods = [...args];
        return this;
    }

    public get(genArray?: ICustomBEM[]) {
        let genPath: string = this.blockName;
        if (isArray(genArray)) {
            genPath = this.customGenerate(genPath, genArray);
        } else {
            if (isArray(this.elements)) {
                this.elements.forEach((value) => {
                    if (isString(value)) {
                        genPath += this.elePrefix + value;
                    }
                });
            }
            if (isArray(this.mods)) {
                this.mods.forEach((value) => {
                    if (isString(value)) {
                        genPath += this.modPrefix + value;
                    }
                });
            }
        }
        this.elements = null;
        this.mods = null;
        return String(get(this.style, genPath));
    }

    private customGenerate(path: string, genArray: ICustomBEM[]): string {
        genArray.forEach((value: ICustomBEM) => {
            if (isString(value.element)) {
                path += this.elePrefix + value.element;
            }
            if (isString(value.mod)) {
                path += this.modPrefix + value.mod;
            }
        });
        return path;
    }
}

export default Rbem;
