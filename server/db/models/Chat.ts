import {IFile, IPhoto} from "_models";
import {IUserModel, UserSchema} from "_server/db/models/User";
import {capitalizeOnlyFirst, clear} from "_utils/string";
import { Document, Model, Schema} from "mongoose";
import connection, {esClient} from "../dBase";

interface IRoomModel extends Document {
    title: string;
    users: [IUserModel];
}
interface IMessageModel extends Document {
    message: string;
    author: IUserModel;
    room: IRoomModel;
    files: [IPhoto | IFile];
}

const mongoosastic: any = require("mongoosastic");

const MessageSchema: Schema = new Schema({
    author: {type: [UserSchema], es_indexed: true, es_type: "nested", es_include_in_parent: true},
    files: {
        default: [],
        type: [{
            description: {
                es_indexed: true,
                type: String,
            },
            height: { type: Number, integer: true },
            icon: { type: String, required: true },
            name: { type: String, required: true, es_indexed: true },
            size: { type: Number, integer: true, required: true },
            src: { type: String,  required: true },
            title: {
                es_indexed: true,
                get: (v: string): string => capitalizeOnlyFirst(v),
                set: (v: string): string => capitalizeOnlyFirst(clear(v)),
                trim: true,
                type: String,
            },
            type: { type: String, required: true },
            width: { type: Number, integer: true },
        }],
    },
    message: {
        es_indexed: true,
        type: String,
    },
}, {timestamps: true});

const RoomSchema: Schema = new Schema({
    messages: { type: [MessageSchema], es_indexed: true, es_type: "nested", es_include_in_parent: true },
    title: {
        es_indexed: true,
        get: (v) => capitalizeOnlyFirst(v),
        required : true,
        set: (v) => capitalizeOnlyFirst(clear(v)),
        type: String,
    },
    users: {type: [UserSchema], es_indexed: true},
}, {timestamps: true});

RoomSchema.plugin(mongoosastic, {
    esClient,
    populate: [
        {path: "messages", select: "author message"},
    ],
});

MessageSchema.plugin(mongoosastic, {
    esClient,
    populate: [
        {path: "author", select: "firstName lastName"},
    ],
});

export const ChatRoomModel: Model<IRoomModel> = connection.model<IRoomModel>("Room", RoomSchema);
export const ChatMessageModel: Model<IMessageModel> = connection.model<IMessageModel>("Message", MessageSchema);
