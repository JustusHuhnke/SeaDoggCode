import * as Koa from "koa";
import * as Router from "koa-router";

import UserModel from "../db/models/User";
import {render} from "./document";

const initRoute = (app: Koa, route: Router) => {
    // const User = new UserModel();

    route.get("/", async (ctx) => {
        const location = ctx.request.url;

        const data = {
            routing: {location},
            user: {
                count: await UserModel.count({}),
            },
        };

        ctx.body = render(ctx, location, data);
    });

    route.get("/test", (ctx) => {
        const location = ctx.request.url;

        const data = {
            routing: {location},
        };

        ctx.body = render(ctx, location, data);
    });

    app
        .use(route.routes())
        .use(route.allowedMethods());

};

export default initRoute;
