import {component} from "_style";
import classnames from "_utils/classnames";
import noob from "_utils/noob";
import Rbem from "_utils/rbem";
import * as React from "react";
import {ITabBlock, ITabComponent, ITabComponentState, ITabHeader} from "./interface";

const tabStyle = new Rbem(component, "tab");

export class Tab extends React.Component<ITabComponent, ITabComponentState> {

    public static defaultProps: ITabComponent = {
        className: tabStyle.get(),
        selected: 0,
    };

    constructor(props: any) {
        super(props);
        this.changeActive = this.changeActive.bind(this);
        this.state = {
            idTab: null,
        };
    }

    public changeActive(idTab: string | number): void {
        this.setState({idTab});
    }

    public render() {

        const {className, selected, children} = this.props;
        const {idTab} = this.state;
        const activeTab = (idTab || selected);
        const classes = classnames(tabStyle.get(), className);
        const tabsHeader: React.ReactNode[] = (Array.isArray(children) && children || [children]).filter((element: React.ReactNode) => !!(element as any).props.forId);
        const tabsBlock: React.ReactNode[] = (Array.isArray(children) && children || [children]).filter((element: React.ReactNode) => !!(element as any).props.idTab);

        return (
            <div className={classes}>
                <ul className={tabStyle.get("header")}>
                    {tabsHeader.map(({props}: any, key) => <TabHeader key={key} {...props} isActive={activeTab === props.forId} changeActive={this.changeActive}/>)}
                </ul>
                <div className={tabStyle.get("block")}>
                    {tabsBlock.map(({props}: any, key) => <TabBlock key={key} {...props} isActive={activeTab === props.idTab}/>)}
                </div>
            </div>
        );
    }
}

export const TabHeader: React.SFC<ITabHeader> = (props: ITabHeader) => {
    const {className, children, isActive = false, forId, changeActive, onClick = noob, ...otherProps} = props;
    const classes = classnames({
        [tabStyle.get("link")]: true,
        [tabStyle.get("link", "selected")]: isActive,
    }, className);
    const changeTab = (event: MouseEvent): void => { onClick(event); changeActive(forId); };
    return (<li className={classes} children={children} onClick={changeTab as any} {...otherProps} />);
};

export const TabBlock: React.SFC<ITabBlock> = (props: ITabBlock) => {
    const {className, children, idTab, isActive, ...otherProps} = props;
    const classes = classnames({
        [tabStyle.get("panel")]: true,
        [tabStyle.get("panel", "selected")]: isActive,
    }, className);
    return (<div className={classes} children={children} {...otherProps} />);
};
