import {PureComponent} from "_components/PureComponent";
import {block, section} from "_style";
import * as React from "react";
import {IHomeAbout} from "./interface";

export class HomeAboutBlock extends React.Component<IHomeAbout, {}> {
    /* tslint:disable:max-line-length */
    public render() {
        const styleList = [section.section, block.about];
        return (
            <PureComponent tag="section" className={styleList}>
                <h2 className={section.section__name}>About</h2>

                <p className={block.about__text}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </PureComponent>
        );
    }
    /* tslint:enable:max-line-length */
}
export default HomeAboutBlock;
