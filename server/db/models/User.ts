import { Document, Model, Schema, Types} from "mongoose";
import connection from "../dBase";
import {capitalize, clear} from "_helpers/string";
import {ICountryModel} from "_server/db/models/Country";
import {IBoatModel} from "_server/db/models/Boat";

export interface IUser {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    fullName: () => string;
    phoneNumber?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        post?: string;
        location?: [number];
        country: ICountryModel
    },
    boats: [IBoatModel]
}

interface IUserModel extends IUser, Document {
    fullName(): string;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        index: { sparse: true, unique: true },
        lowercase: true,
        unique: true,
        trim: true,
        required : true
    },
    password: String,
    firstName: {
        type: String,
        get: (v: string): string => capitalize(v),
        set: (v: string): string => capitalize(clear(v)),
    },
    lastName: {
        type: String,
        get: (v: string): string => capitalize(v),
        set: (v: string): string => capitalize(clear(v)),
    },
    phoneNumber: {
        type: String,
        lowercase: true,
        trim: true
    },
    address: {
        street: { type: String, trim: true },
        city: {
            type: String,
            trim: true,
            get: (v: string): string => capitalize(v),
            set: (v: string): string => capitalize(clear(v)),
        },
        state: {
            type: String,
            trim: true,
            get: (v: string): string => capitalize(v),
            set: (v: string): string => capitalize(clear(v)),
        },
        post: {
            type: String,
            lowercase: true,
            trim: true,
            set: (v: string): string => clear(v),
        },
        country: { type: Types.ObjectId, ref: "Country" },
        location: {
            type: { type: String, enum: ["Point", "Polygon", "LineString", "MultiLineString"], default: "Point", },
            coordinates: { type: [Number], default: [0,0] }
        }
    },
    boats: [{ type: Types.ObjectId, ref: "Boat" }]
}, {timestamps: true});

UserSchema.methods.fullName = function(this: IUser): string {
    return this.firstName + " " + this.lastName;
};

UserSchema.index({location: '2dsphere'});
export const UserModel: Model<IUserModel> = connection.model<IUserModel>("User", UserSchema);

export default UserModel;
