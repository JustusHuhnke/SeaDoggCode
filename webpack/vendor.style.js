"use strict";

const resolve = require('path').resolve;
const vendor = [
    resolve(__dirname, "..", "node_modules", "react-select/dist/react-select.css"),
    resolve(__dirname, "..", "node_modules", "leaflet/dist/leaflet.css"),
    resolve(__dirname, "..", "styles", "map.css"),
];
exports.default = vendor;