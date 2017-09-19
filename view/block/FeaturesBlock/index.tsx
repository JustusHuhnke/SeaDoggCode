import {ButtonComponent} from "_components/ButtonComponent";
import {PureComponent} from "_components/PureComponent";
import {block, section} from "_style";
import * as React from "react";
import {IFeatures} from "./interface";

export class FeaturesBlock extends React.Component<IFeatures, undefined> {
    /* tslint:disable:max-line-length */
    public render() {
        const styleList = [section.section, block.features];
        return (
            <PureComponent tag="section" className={styleList}>
                <h2 className={section.section__name}>Our features</h2>

                <p className={block.features__text}>Get early access and get a bonuses</p>

                <ButtonComponent className={block.features__button} title={"Subscribe"} />

               </PureComponent>
        );
    }
    /* tslint:enable:max-line-length */
}
export default FeaturesBlock;
