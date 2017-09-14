import {Source} from "_components/Image/source";
import {component} from "_style";
import * as cx from "classnames";
import {List} from "immutable";
import * as React from "react";
import {IImageComponent} from "./interface";

const defaultSizes = [
    {
        name: "2k",
        media: "(min-width: 1921px)",
    }, {
        name: "full",
        media: "(min-width: 1367px) and (max-width: 1920px)",
    }, {
        name: "hd",
        media: "(min-width: 769px) and (max-width: 1366px)",
    }, {
        name: "wide",
        media: "(min-width: 481px) and (max-width: 768px)",
    }, {
        name: "half",
        media: "(max-width: 480px)",
    },
];

export class ImageComponent extends React.PureComponent<IImageComponent, undefined> {

    public static defaultProps: IImageComponent = {
        className: component.image,
        src: null,
        alt: "",
    };

    public componentDidMount() {
        if (process.env.BROWSER) {
            const picturefill = require("picturefill");
            picturefill();
        }
    }

    public render() {
        const {className, custom, src, alt, ...otherProps} = this.props;
        const classes = cx(className);

        if (List.isList(custom)) {
            return (
                <picture className={classes} {...otherProps}>
                    {custom.map((props, key) => <Source key={key} {...props} />).toArray()}
                    <img srcSet={src} alt={alt}/>
                </picture>
            );
        } else {
            return (
                <picture className={classes} {...otherProps}>
                    {defaultSizes.map(({media, name}, key) => <Source key={key} src={`${src}${name}`} media={media}/>)}
                    <img srcSet={src} alt={alt}/>
                </picture>
            );
        }
    }
}

export default ImageComponent;
