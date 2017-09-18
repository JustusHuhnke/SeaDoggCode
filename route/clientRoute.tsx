import * as React from "react";
import createLazyContainer from "react-lazy-import";
import {Route, Switch} from "react-router";
const Loading: React.SFC<{}> = () => <div>Loading...</div>;
const Error: React.SFC<{}> = () => <div>Error!</div>;
const Home = createLazyContainer(() => import("_containers/Home"), Loading, Error);
const Test = createLazyContainer(() => import("_containers/Test"), Loading, Error);
export const Routes = () => (
   <Switch>
       <Route exact={true} path="/" component={Home}/>
       <Route path="/test" component={Test}/>
   </Switch>);

export default Routes;
