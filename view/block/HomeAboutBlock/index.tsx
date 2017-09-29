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

                <p className={block.about__text}>We are SeaDogg — a dedicated team of adventurers seeking life’s most beautiful and thrilling experiences. Through unique features, largely focusing on connectivity, shareability, and safety, we enable boat owners, captains and ocean adventurers to access a set of new opportunities. Our focus is to provide the most breathtaking and exciting experiences that the ocean has to offer while remembering to appreciate and respect it’s nature.</p>
            </PureComponent>
        );
    }
}
export default HomeAboutBlock;
