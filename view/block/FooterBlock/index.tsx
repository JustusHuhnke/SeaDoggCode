import {PureComponent} from "_components/PureComponent";
import {block} from "_style";
import * as React from "react";

export class FooterBlock extends React.Component<{}, {}> {

    public render() {
        const styleList = [block.footer];
        return (
            <PureComponent tag="footer" className={styleList}>
                <div className="container">
                    <div className="row">
                        <p className={block.footer__text}>SeaDogg, 2017. All rights reserved</p>
                    </div>
                </div>
            </PureComponent>
        );
    }

}
export default FooterBlock;
