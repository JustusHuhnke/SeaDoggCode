import {ErrorComponent} from "_components/ErrorComponent";
import {LoadingComponent} from "_components/LoadingComponent";
import * as React from "react";
import createLazyContainer from "react-lazy-import";
import {Route, Switch} from "react-router";
const Home = createLazyContainer(() => import("_containers/Home"), LoadingComponent, ErrorComponent);
const Test = createLazyContainer(() => import("_containers/Test"), LoadingComponent, ErrorComponent);
export const Routes = () => (
   <Switch>
       <Route exact={true} path="/" component={Home}/>
       <Route path="/test" component={Test}/>
   </Switch>);

export default Routes;
