import {PureComponent} from "_components/PureComponent";
import {block, section} from "_style";
import * as React from "react";
import {IHomeAbout} from "./interface";

export class HomeAboutBlock extends React.Component<IHomeAbout, {}> {
    public render() {
        const styleList = [section.section, block.about];
        return (
            <PureComponent tag="section" className={styleList} {...this.props}>
                <h2 className={section.section__name}>About</h2>

                <p className={block.about__text}>Most people who work in an office environment, buy computer products, or have a computer at home have had the “fun” experience of dealing with technical support. It’s not always the easiest, or most pleasant, experience but hopefully this article will help you make the best of the situation the next time you call. Below you will find a list of things to keep in mind the next time your computer breaks down. Stay calm – Don’t yell at the support person on the other end of the phone. He is there only to help and the more angry you are the less help you are going to get.</p>
            </PureComponent>
        );
    }
}
export default HomeAboutBlock;
