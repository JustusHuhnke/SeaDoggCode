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

class FooterBlock extends React.Component<{}, {}> {

    public render() {
        return (
            <PureComponent tag="footer" className={footer.get()}>
                <div className={section["container-fluid"]}>
                    <div className={section.row}>
                        <div className={footer.get("nav")}>
                            <NavigationComponent />
                            <div className={footer.get("social")}>
                                <p className={footer.get("text")}>Follow us:</p>
                                <LinkComponent href="https://www.facebook.com/Seadoggcrew-178444026046287" target="_blank">
                                    <IconComponent name="facebook" viewBox="0 0 12 24" />
                                </LinkComponent>
                                <LinkComponent href="https://twitter.com/SeaDoggCrew" target="_blank">
                                    <IconComponent name="twitter" viewBox="0 0 25 20" />
                                </LinkComponent>
                                <LinkComponent href="https://www.instagram.com/seadoggcrew" target="_blank">
                                    <IconComponent name="instagram" viewBox="0 0 97.395 97.395" />
                                </LinkComponent>
                                <LinkComponent href="https://www.linkedin.com/company/18278786/" target="_blank">
                                    <IconComponent name="linkedin" viewBox="0 0 430.117 430.117" />
                                </LinkComponent>
                                <LinkComponent href="https://www.youtube.com/channel/UCCMGpWy9xWsxXkDxhT3FeqA" target="_blank">
                                    <IconComponent name="youtube" viewBox="0 0 25 22" className={icon.get(null, "youtube")} />
                                </LinkComponent>
                            </div>
                        </div>

                        <div className={footer.get("info")}>
                            <div className={footer.get("text")}><LogoComponent />Revolutionizing water experiences</div>
                            <div className={footer.get("copyright")}>2017 © All rights reserved. Seadogg Inc.</div>
                        </div>
                    </div>
                </div>
            </PureComponent>
        );
    }

}

export default FooterBlock;
