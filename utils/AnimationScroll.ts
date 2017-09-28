
const MathUtil = require("rebound").MathUtil;
const SpringSystem = require("rebound").SpringSystem;
let lastHash: string = null;

export const AnimationScroll = (minusTop: number = 0, element: any) => {

    if (element.spring === undefined) {

        element.springSystem = new SpringSystem();
        element.spring = element.springSystem.createSpring();

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
            const val = spring.getCurrentValue();
            if (!isNaN(val)) {
                element.scrollbars.scrollTop(val);
            }
        };

        element.spring.addListener({onSpringUpdate: element.handleSpringUpdate});
    }

    return (scrollbar: any) => {
        if (scrollbar !== null && scrollbar !== undefined) {
            element.scrollbars = scrollbar;

            const {history: {location}} = element.props;
            const hash: string = location.hash;
            const id = hash.replace("#", "");
            if (id.length && lastHash !== id) {
                const elementId = document.getElementById(id);
                if (elementId) {
                    lastHash = id;
                    const distance = element.scrollbars.getScrollTop() + (elementId.getBoundingClientRect().top - minusTop);
                    element.scrollTop(distance);
                }
            }

        }
    };
};

export default AnimationScroll;
