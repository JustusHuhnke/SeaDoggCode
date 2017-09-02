import { Document, Model, Schema} from "mongoose";
import connection from "../dBase";
import {capitalize, clear} from "_helpers/string";

export interface ICountryModel extends Document{
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
        required : true
    },
    label: {
        type: String,
        required : true,
        get: v => capitalize(v),
        set: v => capitalize(clear(v)),
    },
    phoneCode: String
});

export const CountryModel: Model<ICountryModel> = connection.model<ICountryModel>("Country", CountrySchema);

export default CountryModel;