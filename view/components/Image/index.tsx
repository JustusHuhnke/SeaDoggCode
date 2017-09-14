import {component} from "_style";
// import request from "_utils/xhr";
// import * as cx from "classnames";
import * as React from "react";
import {IImageComponent} from "./interface";

export class ImageComponent extends React.PureComponent<IImageComponent, undefined> {

    public static defaultProps: IImageComponent = {
        className: component.image,
        viewBox: "0 0 24 24",
        src: null,
    };

    public componentDidMount() {
        if (process.env.BROWSER) {
            const picturefill = require("picturefill");
            picturefill();
        }
    }

    public render() {
        return (
            <picture>
                <source srcSet="http://via.placeholder.com/350x150?text=2K" media="(min-width: 1921px)"/>
                <source srcSet="http://via.placeholder.com/350x150?text=1920px" media="(min-width: 1367px) and (max-width: 1920px)"/>
                <source srcSet="http://via.placeholder.com/350x150?text=1366px" media="(min-width: 769px) and (max-width: 1366px)"/>
                <source srcSet="http://via.placeholder.com/350x150?text=768px" media="(min-width: 481px) and (max-width: 768px)"/>
                <source srcSet="http://via.placeholder.com/350x150?text=480px" media="(max-width: 480px)"/>
                <img srcSet="http://via.placeholder.com/350x150?text=1920px" alt="My default image"/>
            </picture>
        );
    }
}

export default ImageComponent;
