import {setTransparent} from "_actions";
import {EarlyAccessBlock} from "_blocks/EarlyAccessBlock";
import {HeaderBlock} from "_blocks/HeaderBlock";
import {PureComponent} from "_components/PureComponent";
import {IState} from "_reducers";
import * as React from "react";
import * as Scrollbar from "react-custom-scrollbars";
import {connect} from "react-redux";
import {IHelloProps} from "./interface";

const {Scrollbars} = Scrollbar as any;

class HomeComponent extends React.Component<IHelloProps, undefined> {

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
                <Scrollbars
                    autoHeight={true}
                    universal={true}
                    autoHeightMax={"100vh"}
                    onScrollFrame={this.scrollUpadte}
                >
                    <EarlyAccessBlock />
                </Scrollbars>
            </PureComponent>
        );
    }

    private scrollUpadte({data}: any) {
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
