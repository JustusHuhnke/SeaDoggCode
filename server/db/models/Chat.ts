import { Document, Model, Schema, Types} from "mongoose";
import connection from "../dBase";
import {capitalizeOnlyFirst, clear} from "_helpers/string";
import {IUserModel} from "_server/db/models/User";
import {IPhoto, IFile} from "_models";

interface IRoomModel extends Document{
    title: string;
    users: [IUserModel];
}
interface IMessageModel extends Document{
    message: string;
    author: IUserModel
    room: IRoomModel
    files: [IPhoto | IFile]
}

const RoomSchema: Schema = new Schema({
    title: {
        type: String,
        required : true,
        get: v => capitalizeOnlyFirst(v),
        set: v => capitalizeOnlyFirst(clear(v)),
    },
    users: [{ type: Types.ObjectId, ref: "User" }]
}, {timestamps: true});

const MessageSchema: Schema = new Schema({
    message: String,
    author: { type: Types.ObjectId, ref: "User" },
    room: { type: Types.ObjectId, ref: "Room", index: true },
    files: {
        type: [{
            src: { type: String,  required: true, },
            width: { type: Number, integer: true },
            height: { type: Number, integer: true },
            size: { type: Number, integer: true, required: true },
            type: { type: String, required: true, },
            icon: { type: String, required: true, },
            name: { type: String, required: true, },
            title: {
                type: String,
                trim: true,
                get: (v: string): string => capitalizeOnlyFirst(v),
                set: (v: string): string => capitalizeOnlyFirst(clear(v)),
            },
            description: String
        }],
        default: []
    }
}, {timestamps: true});

export const ChatRoomModel: Model<IRoomModel> = connection.model<IRoomModel>("Room", RoomSchema);
export const ChatMessageModel: Model<IMessageModel> = connection.model<IMessageModel>("Message", MessageSchema);
