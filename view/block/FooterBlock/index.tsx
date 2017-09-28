import {IconComponent} from "_components/IconComponent";
import {LinkComponent} from "_components/LinkComponent";
import {LogoComponent} from "_components/LogoComponent";
import {NavigationComponent} from "_components/NavigationComponent";
import {PureComponent} from "_components/PureComponent";
import {block, component, section} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";
// import {component} from "_stylesLoad/index";

const footer = new Rbem(block, "footer");
const icon = new Rbem(component, "icon");

export class FooterBlock extends React.Component<{}, {}> {

    public render() {
        return (
            <PureComponent tag="footer" className={footer.get()}>
                <div className={section["container-fluid"]}>
                    <div className={section.row}>
                        <div className={footer.get("nav")}>
                            <NavigationComponent />
                            <div className={footer.get("social")}>
                                <p className={footer.get("text")}>Follow us:</p>
                                <LinkComponent href="http://google.com" target="_blank">
                                    <IconComponent name="facebook" viewBox="0 0 12 24" />
                                </LinkComponent>
                                <LinkComponent href="http://google.com" target="_blank">
                                    <IconComponent name="twitter" viewBox="0 0 25 20" />
                                </LinkComponent>
                                <LinkComponent href="http://google.com" target="_blank">
                                    <IconComponent name="google_plus" viewBox="0 0 24 24" />
                                </LinkComponent>
                                <LinkComponent href="http://google.com" target="_blank">
                                    <IconComponent name="vine" viewBox="0 0 25 22" />
                                </LinkComponent>
                                <LinkComponent href="http://google.com" target="_blank">
                                    <IconComponent name="youtube" viewBox="0 0 25 22" className={icon.get(null, "youtube")} />
                                </LinkComponent>
                            </div>
                        </div>

                        <div className={footer.get("info")}>
                            <div className={footer.get("text")}><LogoComponent />We  revolutionize water expiriences</div>
                            <div className={footer.get("copyright")}>© All rights reserved. A Seadogg Inc. Company 2017</div>
                        </div>
                    </div>
                </div>
            </PureComponent>
        );
    }

}

export default FooterBlock;
