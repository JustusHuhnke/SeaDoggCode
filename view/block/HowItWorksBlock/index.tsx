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
            <PureComponent tag="section" className={`${section.section} ${worksStyle.get()}`} {...this.props}>
                <div className={section.container}>
                    <div className={section.row}>
                        <h2 className={section.section__name}>How it works</h2>
                        <Tab className={tabStyle.get(null, "menu")} selected={"rentals-works"}>
                            <TabHeader forId={"rentals-works"}>Rentals</TabHeader>
                            <TabHeader forId={"owners-works"}>Boat owners</TabHeader>
                            <TabHeader forId={"captains-works"}>Captains</TabHeader>
                            <TabHeader forId={"adventurers-works"}>Adventurers</TabHeader>

                            <TabBlock idTab={"rentals-works"}>
                                <div className={`${section.row} ${worksStyle.get("row")}`}>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_boat_search" viewBox="0 0 40 44" />
                                        <h3 className={worksStyle.get("title")}>Search</h3>
                                        <p className={worksStyle.get("descr")}>Explore a unique catalogue of experiences and boats</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_connect" viewBox="0 0 46 36" />
                                        <h3 className={worksStyle.get("title")}>Connect</h3>
                                        <p className={worksStyle.get("descr")}>Connect with the experience provider or boat’s owner</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_booking" viewBox="0 0 46 35" />
                                        <h3 className={worksStyle.get("title")}>Book</h3>
                                        <p className={worksStyle.get("descr")}>Confirm trip details and receive experience itinerary</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_set_sail" viewBox="0 0 47 51" />
                                        <h3 className={worksStyle.get("title")}>Set sail</h3>
                                        <p className={worksStyle.get("descr")}>Your SeaDogg adventure begins</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                </div>
                            </TabBlock>
                            <TabBlock idTab={"owners-works"}>
                                <div className={`${section.row} ${worksStyle.get("row")}`}>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_boat_rent" viewBox="0 0 40 45" />
                                        <h3 className={worksStyle.get("title")}>Lease</h3>
                                        <p className={worksStyle.get("descr")}>Register your vessel and set your own rules</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_connect" viewBox="0 0 46 36" />
                                        <h3 className={worksStyle.get("title")}>Connect</h3>
                                        <p className={worksStyle.get("descr")}>Connect with captains for a guaranteed safe rental</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent className={iconStyle.get(null, "relax")} name="ic_relax" viewBox="0 0 36 41" />
                                        <h3 className={worksStyle.get("title")}>Relax</h3>
                                        <p className={worksStyle.get("descr")}>Relax and track your vessel during each experience</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_earn_money" viewBox="0 0 42 42" />
                                        <h3 className={worksStyle.get("title")}>Earn</h3>
                                        <p className={worksStyle.get("descr")}>Build up a good relationship with your captains and keep earning together!</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                </div>
                            </TabBlock>
                            <TabBlock idTab={"captains-works"}>
                                <div className={`${section.row} ${worksStyle.get("row")}`}>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent className={iconStyle.get(null, "qualify")} name="ic_qualify" viewBox="0 0 31 41" />
                                        <h3 className={worksStyle.get("title")}>Qualify</h3>
                                        <p className={worksStyle.get("descr")}>Add your qualifications and become a SeaDogg captain</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_catalogue" viewBox="0 0 42 40" />
                                        <h3 className={worksStyle.get("title")}>List an Experience</h3>
                                        <p className={worksStyle.get("descr")}>List an experience to market your service</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_connect" viewBox="0 0 46 36" />
                                        <h3 className={worksStyle.get("title")}>Connect</h3>
                                        <p className={worksStyle.get("descr")}>Connect with boat owners and their vessels</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_earn_money" viewBox="0 0 42 42" />
                                        <h3 className={worksStyle.get("title")}>Earn &amp; Explore</h3>
                                        <p className={worksStyle.get("descr")}>Earn while sharing your love and passion through experience</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                </div>
                            </TabBlock>
                            <TabBlock idTab={"adventurers-works"}>
                                <div className={`${section.row} ${worksStyle.get("row")}`}>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_catalogue" viewBox="0 0 42 40" />
                                        <h3 className={worksStyle.get("title")}>List an Experience</h3>
                                        <p className={worksStyle.get("descr")}>List an experience to market your service</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                    <div className={`${section["col-lg-3"]} ${section["col-sm-12"]} ${worksStyle.get("item")}`}>
                                        <IconComponent name="ic_earn_money" viewBox="0 0 42 42" />
                                        <h3 className={worksStyle.get("title")}>Earn &amp; Explore</h3>
                                        <p className={worksStyle.get("descr")}>Earn while sharing your love and passion through experience</p>
                                        <IconComponent className={iconStyle.get(null, "arrow")} name="arrow" viewBox="0 0 61 16" />
                                    </div>
                                </div>
                            </TabBlock>
                        </Tab>
                    </div>
                </div>
            </PureComponent>
        );
    }

}

export default HowItWorksBlock;
