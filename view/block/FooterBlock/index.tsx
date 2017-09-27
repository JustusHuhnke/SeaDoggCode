import {NavigationComponent} from "_components/NavigationComponent";
import {PureComponent} from "_components/PureComponent";
import {block, section} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";

const footer = new Rbem(block, "footer");

export class FooterBlock extends React.Component<{}, {}> {

    public render() {
        return (
            <PureComponent tag="footer" className={footer.get()}>
                <div className={section["container-fluid"]}>
                    <div className={section.row}>
                        <div className={footer.get("nav")}>
                            <NavigationComponent />
                        </div>

                        {/*<p className={block.footer__text}>SeaDogg, 2017. All rights reserved</p>*/}
                    </div>
                </div>
            </PureComponent>
        );
    }

}

export default FooterBlock;
