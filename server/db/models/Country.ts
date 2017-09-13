import {capitalize, clear} from "_utils/string";
import { Document, Model, Schema} from "mongoose";
import connection, {esClient} from "../dBase";

const mongoosastic: any = require("mongoosastic");

export interface ICountryModel extends Document {
    code: string;
    label?: string;
    phoneCode?: string;
}

const CountrySchema: Schema = new Schema({
    code: {
        type: String,
        index: { sparse: true, unique: true },
        lowercase: true,
        unique: true,
        trim: true,
        required : true,
    },
    label: {
        type: String,
        required : true,
        get: (v) => capitalize(v),
        set: (v) => capitalize(clear(v)),
        es_indexed: true,
    },
    phoneCode: {
        type: String,
        es_indexed: true,
    },
});

CountrySchema.plugin(mongoosastic, {esClient});

export const CountryModel: Model<ICountryModel> = connection.model<ICountryModel>("Country", CountrySchema);

export default CountryModel;
