import {IconComponent} from "_components/IconComponent";
import {PureComponent} from "_components/PureComponent";
import {Tab, TabBlock, TabHeader} from "_components/TabComponent";
import {block, component, section} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";

const worksStyle = new Rbem(block, "works");
const tabStyle = new Rbem(component, "tab");
const iconStyle = new Rbem(component, "icon");

class HowItWorksBlock extends React.Component<{}, {}> {

    public render() {
        return (
            <PureComponent tag="section" className={`${section.section} ${worksStyle.get()}`}>
                <div className={section.container}>
                    <div className={section.row}>
                        <h2 className={section.section__name}>How it works</h2>
                        <Tab className={tabStyle.get(null, "menu")} selected={"rentals-works"}>
                            <TabHeader forId={"rentals-works"}>Rentals</TabHeader>
                            <TabHeader forId={"owners-works"}>Boat owners</TabHeader>
                            <TabHeader forId={"captains-works"}>Captains</TabHeader>
                            <TabHeader forId={"adventurers-works"}>Adventurers</TabHeader>

                            <TabBlock idTab={"rentals-works"}>
                                <div className={section.row}>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_catalogue" viewBox="0 0 42 40" />
                                        <h3 className={worksStyle.get("title")}>Search</h3>
                                        <p className={worksStyle.get("descr")}>Create your own personal experience</p>
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_expirience_availability" viewBox="0 0 44 39" />
                                        <h3 className={worksStyle.get("title")}>Connect</h3>
                                        <p className={worksStyle.get("descr")}>Choose your own times</p>
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_earn_money" viewBox="0 0 42 42" />
                                        <h3 className={worksStyle.get("title")}>Earn</h3>
                                        <p className={worksStyle.get("descr")}>Earn on your own terms</p>
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_earn_money" viewBox="0 0 42 42" />
                                        <h3 className={worksStyle.get("title")}>Earn</h3>
                                        <p className={worksStyle.get("descr")}>Earn on your own terms</p>
                                    </div>
                                </div>
                            </TabBlock>
                            <TabBlock idTab={"owners-works"}>Boat owners tab</TabBlock>
                            <TabBlock idTab={"captains-works"}>Captains Tab</TabBlock>
                            <TabBlock idTab={"adventurers-works"}>Adventurers Tab</TabBlock>
                        </Tab>
                    </div>
                </div>
            </PureComponent>
        );
    }

}

export default HowItWorksBlock;
