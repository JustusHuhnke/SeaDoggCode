import {IconComponent} from "_components/IconComponent";
import {component} from "_style";
import Rbem from "_utils/rbem";
import * as React from "react";

const loadingStyle = new Rbem(component, "loading");

export const LoadingComponent: React.SFC<{}> = () => (
    <div className={loadingStyle.get()}>
        <IconComponent name="loading" className={loadingStyle.get("icon")} />
    </div>
);
export default LoadingComponent;
