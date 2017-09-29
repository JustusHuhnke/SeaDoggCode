
import {section} from "../styles/index";
import noob from "./noob";
import Rbem from "./rbem";
let lastPos: number = null;
const styleScroll = new Rbem(section, "scroll");

export const AnimationScroll = process.env.BROWSER && ((minusTop: number = 0, element: any): any => {
    const MathUtil = require("rebound").MathUtil;
    const SpringSystem = require("rebound").SpringSystem;
    let timeoutScroll: any = null;

    if (element.spring === undefined) {

        element.springSystem = new SpringSystem();
        element.spring = element.springSystem.createSpring(24, 8);

        element.scrollTop = (top: number) => {
            const scrollTop = element.scrollbars.getScrollTop();
            const scrollHeight = element.scrollbars.getScrollHeight();
            const val = MathUtil.mapValueInRange(top, 0, scrollHeight, top, top);
            element.spring.setCurrentValue(scrollTop).setAtRest();
            if (!isNaN(val)) {
                element.spring.setEndValue(val);
            }
        };

        element.handleSpringUpdate = (spring: any) => {
            const val = Math.round(spring.getCurrentValue() * 10);
            if (!isNaN(val) && lastPos !== val) {
                clearTimeout(timeoutScroll);
                document.body.classList.add(styleScroll.get(null, "disable"));
                lastPos = val;
                element.scrollbars.scrollTop(val / 10);
                timeoutScroll = setTimeout(() => {
                    document.body.classList.remove(styleScroll.get(null, "disable"));
                }, 100);
            }
        };

        element.spring.addListener({onSpringUpdate: element.handleSpringUpdate});
    }

    return (scrollbar: any): void => {
        if (scrollbar !== null && scrollbar !== undefined) {
            element.scrollbars = scrollbar;

            const {history: {location}} = element.props;
            const hash: string = location.hash;
            const id = hash.replace("#", "");
            if (id.length) {
                const elementId = document.getElementById(id);
                if (elementId) {
                    if (Math.abs(elementId.getBoundingClientRect().top - minusTop) > 20) {
                        document.body.classList.add(styleScroll.get(null, "disable"));
                        const distance = element.scrollbars.getScrollTop() + (elementId.getBoundingClientRect().top - minusTop);
                        element.scrollTop(distance);
                    }
                    timeoutScroll = setTimeout(() => {
                        document.body.classList.remove(styleScroll.get(null, "disable"));
                    }, 500);
                }
            }

        }
    };
}) || noob;

export default AnimationScroll;
