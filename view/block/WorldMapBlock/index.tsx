import {IconComponent} from "_components/IconComponent";
import {PureComponent} from "_components/PureComponent";
import {block, /*component,*/ section} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";

const worldStyle = new Rbem(block, "world");
// const iconStyle = new Rbem(component, "icon");

export class WorldMapBlock extends React.Component<{}, {}> {

    private worldIcon: HTMLElement;

    constructor(props: {}) {
        super(props);
        this.setWorldIcon = this.setWorldIcon.bind(this);
    }

    public componentDidMount() {
        setTimeout(() => {
            this.worldIcon.children[0].innerHTML = document.getElementById("world_map").innerHTML;
        }, 0);
    }

    public render() {
        const styleList = [section.section, worldStyle.get()];

        return (
            <PureComponent tag="section" className={styleList} {...this.props}>
                <IconComponent refComponent={this.setWorldIcon} name="world_map" viewBox="0 0 1010 650" className={worldStyle.get("icon")} />
            </PureComponent>
        );
    }

    private setWorldIcon(element: HTMLElement) {
        this.worldIcon = element;
    }
}
export default WorldMapBlock;
