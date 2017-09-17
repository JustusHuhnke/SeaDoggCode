import {EarlyAccessBlock} from "_blocks/EarlyAccessBlock";
import {HeaderBlock} from "_blocks/HeaderBlock";
import {PureComponent} from "_components/PureComponent";
// import {section} from "_style";
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
    }

    public render() {
        return (
            <PureComponent tag={"main"}>
                <HeaderBlock/>
                <Scrollbars autoHeight={true} universal={true} autoHeightMax={"100vh"}>
                    <EarlyAccessBlock />
                </Scrollbars>
            </PureComponent>
        );
    }
}

export const Home = connect((state: IHelloProps) => ({ count: state.count }))(HomeComponent);
export default Home;
