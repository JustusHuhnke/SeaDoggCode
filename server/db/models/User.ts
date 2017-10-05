import {IPhoto} from "_models";
import {ICountryModel} from "_server/db/models/Country";
import {capitalize, capitalizeOnlyFirst, clear} from "_utils/string";
import { Document, Model, Schema} from "mongoose";
import connection from "../dBase";

const DEFAULT_USER_PICTURE = "/image/user.jpg";

export interface IUserModel extends Document {
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
    };
    avatar: IPhoto;
    checkList: any[];

    fullName: () => string;
    count: (cond?: IUserModel) => Promise<number>;
}

export const UserSchema: Schema = new Schema({
    email: {
        type: String,
        index: { sparse: true, unique: true },
        lowercase: true,
        // unique: true,
        trim: true,
        required : true,
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
        trim: true,
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
        // country: { type: Types.ObjectId, ref: "Country" },
        location: {
            type: { type: String, enum: ["Point", "Polygon", "LineString", "MultiLineString"], default: "Point" },
            coordinates: { type: [Number], default: [0, 0] },
        },
        default: {},
    },
    avatar: {
        src: {  type: String, default: DEFAULT_USER_PICTURE  },
        width: {  type: Number,  integer: true  },
        height: {  type: Number,  integer: true  },
        size: {  type: Number,  integer: true  },
        type: {  type: String },
        name: {  type: String },
        title: {
            type: String,
            trim: true,
            get: (v: string): string => capitalize(v),
            set: (v: string): string => capitalize(clear(v)),
        },
        description: String,
        default: {},
    },
    checkList: [],
}, {timestamps: true});

UserSchema.methods.fullName = function(this: IUserModel): string {
    return this.firstName + " " + this.lastName;
};

UserSchema.index({"address.location": "2dsphere"});
export const UserModel: Model<IUserModel> = connection.model<IUserModel>("User", UserSchema);

export default UserModel;
