import {setTransparent} from "_actions";
import {ContactBlock, EarlyAccessBlock, FeaturesBlock, FooterBlock, HeaderBlock, HomeAboutBlock} from "_blocks";
import {PureComponent} from "_components/PureComponent";
import {IState} from "_reducers";
import {section} from "_style";
import AnimationScroll from "_utils/AnimationScroll";
import * as React from "react";
import * as Scrollbar from "react-custom-scrollbars";
import {connect} from "react-redux";
import {IHelloProps} from "./interface";

const {Scrollbars} = Scrollbar as any;
const CustomScrol: React.SFC<any> = ({children, refIn, ...otherProps}: any) => (
    process.env.BROWSER && <Scrollbars children={children} ref={refIn} {...otherProps} /> || <div>{children}</div>
);

class HomeComponent extends React.Component<IHelloProps, {}> {

    public static defaultProps: IHelloProps = {
        compiler: "Test",
        count: null,
        framework: "work",
    };

    constructor(props: IHelloProps) {
        super(props);
        this.scrollUpadte = this.scrollUpadte.bind(this);
    }

    public render() {
        return (
            <PureComponent tag={"main"}>
                <HeaderBlock/>
                <CustomScrol
                    className={section.scroll}
                    refIn={AnimationScroll(100, this)}
                    autoHeight={true}
                    universal={true}
                    autoHeightMax={"100vh"}
                    onScrollFrame={this.scrollUpadte}
                >
                    <EarlyAccessBlock/>
                    <HomeAboutBlock id={"about"} />
                    <FeaturesBlock id={"features"}/>
                    <ContactBlock id={"contact"}/>
                    <FooterBlock/>
                </CustomScrol>
            </PureComponent>
        );
    }

    private scrollUpadte(data: any) {
        const {homeTransparent} = this.props;
        const {scrollTop} = data as any;
        setTransparent({scrollTop, transparent: homeTransparent});
    }
}

export const Home = connect((state: IState) => ({
    count: state.count,
    homeTransparent: state.navigation.get("homeTransparent"),
}))(HomeComponent as any);
export default Home;
