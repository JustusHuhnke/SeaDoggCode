import { Document, Model, Schema, Types} from "mongoose";
import connection from "../dBase";
import {capitalize, clear} from "_helpers/string";
import {ICountryModel} from "_server/db/models/Country";
import {IUser} from "_server/db/models/User";

export interface IBoatModel extends Document {
    owner: IUser,
    profile: {
        title: string;
        description?: string;
        rules?: string;
    },
    info: {
        name: string;
        maker: string;
        model: string;
        year: string;
        market: string;
        type: string;
    },
    registration: {
        indentNumber: number;
        guard: boolean;
        number: number;
        location: string;
    },
    location: {
        street?: string;
        city?: string;
        country?: ICountryModel;
        locationType?: string;
        slipType?: string;
    },
    specification: {
        length?: number;
        passengers?: number;
        sleeps?: number;
        heads?: number;
        horsepower?: number;
        engines?: number;
        tankCapacity?: number;
        speed?: number;
        fuelType?: string;
        propulsion?: string;
        inboard?: string;
        outboard?: string;
        sail?: string;
        electrical?: string;
        jetDrive?: string;
        arneson?: string;
        shaft?: string;
        outdrive?: string;
    },
    activities: {
        fishing?: boolean;
        sailing?: boolean;
        waterskiing?: boolean;
        dining?: boolean;
        snorkeling?: boolean;
        cruising?: boolean;
        sightseeing?: boolean;
        kayaking?: boolean;
        padding?: boolean;
        skiBoat?: boolean;

        cooking?: boolean;
        freezer?: boolean;
        divePlatform?: boolean;
        navigationLights?: boolean;
        toilet?: boolean;
        battery?: boolean;
        waterSports?: boolean;
        fenders?: boolean;
        inverter?: boolean;
        generator?: boolean;
        drinking?: boolean;
        shade?: boolean;
        davit?: boolean;
        conditioning?: boolean;
        stereo?: boolean;
        gps?: boolean;
        depthFinder?: boolean;
        skiBar?: boolean;
        livewell?: boolean;
        rodholders?: boolean;
        refrigerator?: boolean;
        fish?: boolean;
        fresh?: boolean;
        salt?: boolean;
        tender?: boolean;
        sleeps?: boolean;
        outriggers?: boolean;
        radio?: boolean;
        cabin?: boolean;
    }
}

const BoatSchema: Schema = new Schema({
    owner: { type: Types.ObjectId, ref: "User" },
    profile: {
        title: { type: String, trim: true, required : true },
        description: { type: String, trim: true },
        rules: { type: String, trim: true }
    },
    info: {
        name: { type: String, trim: true, required : true },
        maker: { type: String, trim: true, required : true },
        model: { type: String, trim: true, required : true },
        year: { type: Number, required : true },
        market: { type: String, trim: true, required : true },
        type: { type: String, trim: true, required : true }
    },
    registration: {
        indentNumber: { type: Number, required : true },
        guard: { type: Boolean, default: false },
        number: { type: Number, required : true },
        location: { type: String, trim: true, required : true }
    },
    location: {
        street: { type: String, trim: true },
        city: {
            type: String,
            trim: true,
            get: (v: string): string => capitalize(v),
            set: (v: string): string => capitalize(clear(v)),
        },
        country: { type: Types.ObjectId, ref: "Country" },
        locationType: { type: String, trim: true, lowercase: true, enum: ["marina", "trailer", "mooring", "house"] },
        slipType: { type: String, trim: true, lowercase: true, enum: ["dry", "wet"] }
    },
    specification: {
        length: Number,
        passengers: Number,
        sleeps: Number,
        heads: Number,
        horsepower: Number,
        engines: Number,
        tankCapacity: Number,
        speed: Number,
        fuelType: { type: String, trim: true, lowercase: true, enum: ["diesel", "gas", "electric"] },
        propulsion: String,
        inboard: String,
        outboard: String,
        sail: String,
        electrical: String,
        jetDrive: String,
        arneson: String,
        shaft: String,
        outdrive: String,
    },
    activities: {
        fishing: { type: Boolean, default: false },
        sailing: { type: Boolean, default: false },
        waterskiing: { type: Boolean, default: false },
        dining: { type: Boolean, default: false },
        snorkeling: { type: Boolean, default: false },
        cruising: { type: Boolean, default: false },
        sightseeing: { type: Boolean, default: false },
        kayaking: { type: Boolean, default: false },
        padding: { type: Boolean, default: false },
        skiBoat: { type: Boolean, default: false },

        cooking: { type: Boolean, default: false },
        freezer: { type: Boolean, default: false },
        divePlatform: { type: Boolean, default: false },
        navigationLights: { type: Boolean, default: false },
        toilet: { type: Boolean, default: false },
        battery: { type: Boolean, default: false },
        waterSports: { type: Boolean, default: false },
        fenders: { type: Boolean, default: false },
        inverter: { type: Boolean, default: false },
        generator: { type: Boolean, default: false },
        drinking: { type: Boolean, default: false },
        shade: { type: Boolean, default: false },
        davit: { type: Boolean, default: false },
        conditioning: { type: Boolean, default: false },
        stereo: { type: Boolean, default: false },
        gps: { type: Boolean, default: false },
        depthFinder: { type: Boolean, default: false },
        skiBar: { type: Boolean, default: false },
        livewell: { type: Boolean, default: false },
        rodholders: { type: Boolean, default: false },
        refrigerator: { type: Boolean, default: false },
        fish: { type: Boolean, default: false },
        fresh: { type: Boolean, default: false },
        salt: { type: Boolean, default: false },
        tender: { type: Boolean, default: false },
        sleeps: { type: Boolean, default: false },
        outriggers: { type: Boolean, default: false },
        radio: { type: Boolean, default: false },
        cabin: { type: Boolean, default: false },
    }

}, {timestamps: true});


export const BoatModel: Model<IBoatModel> = connection.model<IBoatModel>("Boat", BoatSchema);

export default BoatModel;
