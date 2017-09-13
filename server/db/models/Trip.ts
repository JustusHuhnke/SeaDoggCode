import {IBoatModel} from "_server/db/models/Boat";
import {IUserModel} from "_server/db/models/User";
import {capitalizeOnlyFirst, clear} from "_utils/string";
import { Document, Model, Schema, Types} from "mongoose";
import connection from "../dBase";

interface ITripModel extends Document {
    owner: IUserModel;
    title: string;
    description: string;
    startDate: Date;
    chooseTime: number;
    boat: IBoatModel;
    captain: IUserModel;
    ratings: {
        one: number;
        two: number;
        three: number;
        four: number;
        five: number;
    };
    review: [{
        author: IUserModel;
        message: string;
        yes: number;
        no: number;
    }];
}

export const TripSchema: Schema = new Schema({
    owner: { type: Types.ObjectId, ref: "User" },
    title: {
        type: String,
        trim: true,
        get: (v: string): string => capitalizeOnlyFirst(v),
        set: (v: string): string => capitalizeOnlyFirst(clear(v)),
    },
    description: String,
    startDate: Date,
    chooseTime: { type: Number, integer: true },
    boat: { type: Types.ObjectId, ref: "Boat" },
    captain: { type: Types.ObjectId, ref: "User" },
    ratings: {
        one: { type: Number, integer: true, default: 0 },
        two: { type: Number, integer: true, default: 0 },
        three: { type: Number, integer: true, default: 0 },
        four: { type: Number, integer: true, default: 0 },
        five: { type: Number, integer: true, default: 0 },
    },
    review: [{
        author: { type: Types.ObjectId, ref: "User" },
        message: {
            type: String,
            trim: true,
            set: (v: string): string => clear(v),
        },
        yes: { type: Number, integer: true, default: 0 },
        no: { type: Number, integer: true, default: 0 },
    }],

});

export const TripModel: Model<ITripModel> = connection.model<ITripModel>("Trip", TripSchema);

export default TripModel;
