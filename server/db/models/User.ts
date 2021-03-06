import { Document, Model, Schema, Types} from "mongoose";
import connection from "../dBase";
import {capitalizeOnlyFirst, capitalize, clear} from "_helpers/string";
import {ICountryModel} from "_server/db/models/Country";
import {IPhoto} from "_models";

const DEFAULT_USER_PICTURE = "/image/user.jpg";

interface IUser {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        post?: string;
        location?: [number];
        country: ICountryModel
    },
    avatar: IPhoto
}
export interface IUserModel extends IUser, Document {
    fullName: () => string;
}

export const UserSchema: Schema = new Schema({
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
            get: (v: string): string => capitalizeOnlyFirst(v),
            set: (v: string): string => capitalizeOnlyFirst(clear(v)),
        },
        state: {
            type: String,
            trim: true,
            get: (v: string): string => capitalizeOnlyFirst(v),
            set: (v: string): string => capitalizeOnlyFirst(clear(v)),
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
    avatar: {
        src: {  type: String,  required: true, default: DEFAULT_USER_PICTURE  },
        width: {  type: Number,  integer: true  },
        height: {  type: Number,  integer: true  },
        size: {  type: Number,  integer: true  },
        type: {  type: String,  required: true,  },
        name: {  type: String,  required: true,  },
        title: {
            type: String,
            trim: true,
            get: (v: string): string => capitalize(v),
            set: (v: string): string => capitalize(clear(v)),
        },
        description: String
    }
}, {timestamps: true});

UserSchema.methods.fullName = function(this: IUser): string {
    return this.firstName + " " + this.lastName;
};

UserSchema.index({"address.location": '2dsphere'});
export const UserModel: Model<IUserModel> = connection.model<IUserModel>("User", UserSchema);

export default UserModel;
