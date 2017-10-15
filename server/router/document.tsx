import Store from "_store";
import * as React from "react";
import {Helmet} from "react-helmet";
import {Provider} from "react-redux";
import * as serialize from "serialize-javascript";
import Routes from "./../../route/backendRoute";

const {renderToNodeStream, renderToStaticMarkup} = require("react-dom/server");

//
interface IpropertyRender {
    location: string;
    context: any;
}

const ASSETS: any = process.env.BROWSER ? (window as any).ASSETS : require("_config").ASSETS;
// const sprite: string = fs.readFileSync(resolve("dist/public/sprite.svg"), "utf-8");

export const HTMLStart = (): React.ReactElement<{}> => {
    const helmet = Helmet.renderStatic();
    return (
        <head>
            {helmet.title.toComponent()}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
            {helmet.meta.toComponent()}
            <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png"/>
            <link rel="manifest" href="/images/favicon/manifest.json"/>
            <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#3772ff"/>
            <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon/android-icon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon/favicon-96x96.png"/>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/images/favicon/ms-icon-144x144.png"/>
            <meta name="theme-color" content="#0268cd"/>
            <link href={`/${ASSETS["base.css"] || "style/base.css"}`} media="all" rel="stylesheet"/>
            <link href={`/${ASSETS["section.css"] || "style/section.css"}`} media="all" rel="stylesheet"/>
            <link href={`/${ASSETS["block.css"] || "style/block.css"}`} media="all" rel="stylesheet"/>
            <link href={`/${ASSETS["components.css"] || "style/components.css"}`} media="all" rel="stylesheet"/>
            {helmet.link.toComponent()}
        </head>
    );
};

const ChildrenRender = (props?: IpropertyRender): any => {

    const store = Store(props.context);

    return React.createElement(
        Provider,
        {store},
        React.createElement((Routes as any), props),
    );
};

export const render: (ctx: any, location: string, context: any) => string = (ctx: any, location: string, context: any = {}) => {
    let stream: any = "";

    if (process.env.NODE_ENV === "production") {
        ctx.status = 200;
        ctx.type = "text/html; charset=utf-8";
        ctx.set("Cache-Control", "no-cache");
        ctx.set("Connection", "keep-alive");
        ctx.set("Transfer-Encoding", "gzip, chunked");

        ctx.res.write(`<!doctype html><html>`);
        ctx.res.write(renderToStaticMarkup(React.createElement(HTMLStart)));
        ctx.res.write(`<body><span id="svgContainer"></span><div id="application">`);

        stream = renderToNodeStream(ChildrenRender(context));
        stream.on("end", () => {
            ctx.res.write("</div>");
            ctx.res.write(`<script type="text/javascript">window.__initialState__=${serialize(context)}</script>`);
            ctx.res.write(`<script type="text/javascript">window.ASSETS=${JSON.stringify(ASSETS)}</script>`);
            ctx.res.write(`<script src="${ASSETS["vendor.js"] || "vendor.js"}" type="text/javascript"></script>`);
            ctx.res.write(`<script src="${ASSETS["style.js"] || "style.js"}" type="text/javascript"></script>`);
            ctx.res.write(`<script src="${ASSETS["bundle.js"] || "bundle.js"}" type="text/javascript"></script>`);
            ctx.res.write("</body></html>");
            ctx.res.end();
        });
    } else {
        stream += `<!doctype html><html>`;
        stream += renderToStaticMarkup(React.createElement(HTMLStart));
        stream += `<body><span id="svgContainer"></span><div id="application">`;
        stream += renderToStaticMarkup(ChildrenRender(context));
        stream += "</div>";
        stream += `<script type="text/javascript">window.__initialState__=${serialize(context)}</script>`;
        stream += `<script type="text/javascript">window.ASSETS=${JSON.stringify(ASSETS)}</script>`;
        stream += `<script src="${ASSETS["vendor.js"] || "vendor.js"}" type="text/javascript"></script>`;
        stream += `<script src="${ASSETS["style.js"] || "style.js"}" type="text/javascript"></script>`;
        stream += `<script src="${ASSETS["bundle.js"] || "bundle.js"}" type="text/javascript"></script>`;
        stream += "</body></html>";
    }

    return stream;
};
