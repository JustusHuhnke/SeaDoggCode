import {IconComponent} from "_components/IconComponent";
import {PureComponent} from "_components/PureComponent";
import {Tab, TabBlock, TabHeader} from "_components/TabComponent";
import {block, component, section} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";

const featuresStyle = new Rbem(block, "features");
const tabStyle = new Rbem(component, "tab");
const iconStyle = new Rbem(component, "icon");

class FeaturesBlock extends React.Component<{}, {}> {

    public render() {
        return (
            <PureComponent tag="section" className={`${section.section} ${featuresStyle.get()}`} {...this.props}>
                <div className={section.container}>
                    <div className={section.row}>
                        <h2 className={section.section__name}>Our Features</h2>
                        <Tab className={tabStyle.get(null, "menu")} selected={"rentals-features"}>
                            <TabHeader forId={"rentals-features"}>Rentals</TabHeader>
                            <TabHeader forId={"owners-features"}>Boat owners</TabHeader>
                            <TabHeader forId={"captains-features"}>Captains</TabHeader>
                            <TabHeader forId={"adventurers-features"}>Adventurers</TabHeader>

                            <TabBlock idTab={"rentals-features"}>
                                <div className={`${section.row} ${featuresStyle.get("row")}`}>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="boat" viewBox="0 0 40 40" />
                                        <h3 className={featuresStyle.get("title")}>Experiences with boat</h3>
                                        <p className={featuresStyle.get("descr")}>Fully prepared experiences provided by our captains</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="experience" viewBox="0 0 42 36" />
                                        <h3 className={featuresStyle.get("title")}>Experiences without boat</h3>
                                        <p className={featuresStyle.get("descr")}>Fully prepared experiences provided by our adventurers</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_catalogue" viewBox="0 0 42 40" />
                                        <h3 className={featuresStyle.get("title")}>Boats Catalogue</h3>
                                        <p className={featuresStyle.get("descr")}>Fully prepared experiences provided by our adventurers</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_booking" viewBox="0 0 46 35" />
                                        <h3 className={featuresStyle.get("title")}>Easy to book</h3>
                                        <p className={featuresStyle.get("descr")}>Simple booking process to quickly book your favorite experience</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_support" viewBox="0 0 38 42" />
                                        <h3 className={featuresStyle.get("title")}>Fast support</h3>
                                        <p className={featuresStyle.get("descr")}>24/7 support<br/>service for you</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")} ${iconStyle.get(null, "app")}`} name="ic_app" viewBox="0 0 26 46" />
                                        <h3 className={featuresStyle.get("title")}>Application</h3>
                                        <p className={featuresStyle.get("descr")}>Explore our app during your trip to view special features</p>
                                    </div>
                                </div>
                            </TabBlock>
                            <TabBlock idTab={"owners-features"}>
                                <div className={`${section.row} ${featuresStyle.get("row")}`}>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_boat_rent" viewBox="0 0 40 45" />
                                        <h3 className={featuresStyle.get("title")}>Lease your Vessel</h3>
                                        <p className={featuresStyle.get("descr")}>Turn your boat into a money generating asset</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_booking" viewBox="0 0 46 35" />
                                        <h3 className={featuresStyle.get("title")}>Availability</h3>
                                        <p className={featuresStyle.get("descr")}>Choose your boats availability</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_earn_money" viewBox="0 0 42 42" />
                                        <h3 className={featuresStyle.get("title")}>Earn</h3>
                                        <p className={featuresStyle.get("descr")}>Earn on your own terms</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_connect" viewBox="0 0 46 36" />
                                        <h3 className={featuresStyle.get("title")}>Connect</h3>
                                        <p className={featuresStyle.get("descr")}>With qualified captains for guaranteed safety</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_boat_track" viewBox="0 0 40 44" />
                                        <h3 className={featuresStyle.get("title")}>Track</h3>
                                        <p className={featuresStyle.get("descr")}>Track your boat during each trip</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_expand" viewBox="0 0 38 38" />
                                        <h3 className={featuresStyle.get("title")}>Expand</h3>
                                        <p className={featuresStyle.get("descr")}>Add new account features</p>
                                    </div>
                                </div>
                            </TabBlock>
                            <TabBlock idTab={"captains-features"}>
                                <div className={`${section.row} ${featuresStyle.get("row")}`}>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_catalogue" viewBox="0 0 42 40" />
                                        <h3 className={featuresStyle.get("title")}>Listing an Experience</h3>
                                        <p className={featuresStyle.get("descr")}>Create your own personal experience</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_booking" viewBox="0 0 46 35" />
                                        <h3 className={featuresStyle.get("title")}>Availability</h3>
                                        <p className={featuresStyle.get("descr")}>Choose your own times</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_earn_money" viewBox="0 0 42 42" />
                                        <h3 className={featuresStyle.get("title")}>Earn</h3>
                                        <p className={featuresStyle.get("descr")}>Earn on your own terms</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_connect" viewBox="0 0 46 36" />
                                        <h3 className={featuresStyle.get("title")}>Connect</h3>
                                        <p className={featuresStyle.get("descr")}>Connect with boat owners to captain your favorite boats</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")} ${iconStyle.get(null, "app")}`} name="ic_app" viewBox="0 0 26 46" />
                                        <h3 className={featuresStyle.get("title")}>Application</h3>
                                        <p className={featuresStyle.get("descr")}>Explore our app to help document each trip</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_expand" viewBox="0 0 38 38" />
                                        <h3 className={featuresStyle.get("title")}>Expand</h3>
                                        <p className={featuresStyle.get("descr")}>Add new account features</p>
                                    </div>
                                </div>
                            </TabBlock>
                            <TabBlock idTab={"adventurers-features"}>
                                <div className={`${section.row} ${featuresStyle.get("row")}`}>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_catalogue" viewBox="0 0 42 40" />
                                        <h3 className={featuresStyle.get("title")}>Listing an Experience</h3>
                                        <p className={featuresStyle.get("descr")}>Create your own personal experience</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_expirience_availability" viewBox="0 0 44 39" />
                                        <h3 className={featuresStyle.get("title")}>Availability</h3>
                                        <p className={featuresStyle.get("descr")}>Choose your own times</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_earn_money" viewBox="0 0 42 42" />
                                        <h3 className={featuresStyle.get("title")}>Earn</h3>
                                        <p className={featuresStyle.get("descr")}>Earn on your own terms</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")} ${iconStyle.get(null, "app")}`} name="ic_app" viewBox="0 0 26 46" />
                                        <h3 className={featuresStyle.get("title")}>Application</h3>
                                        <p className={featuresStyle.get("descr")}>Explore our app to help document each trip</p>
                                    </div>
                                    <div className={`${section["col-lg-4"]} ${section["col-sm-12"]} ${featuresStyle.get("item")}`}>
                                        <IconComponent className={`${iconStyle.get(null, "blue")}`} name="ic_expand" viewBox="0 0 38 38" />
                                        <h3 className={featuresStyle.get("title")}>Expand</h3>
                                        <p className={featuresStyle.get("descr")}>Add new account features</p>
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

export default FeaturesBlock;
