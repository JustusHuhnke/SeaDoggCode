import { Document, Model, Schema, Types} from "mongoose";
import connection, {esClient} from "../dBase";
import {capitalizeOnlyFirst, clear} from "_helpers/string";
import {IUserModel, UserSchema} from "_server/db/models/User";
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

const mongoosastic: any = require("mongoosastic");

const MessageSchema: Schema = new Schema({
    message: {
        type: String,
        es_indexed: true
    },
    author: {type: [UserSchema], es_indexed: true, es_type: 'nested', es_include_in_parent: true},
    files: {
        type: [{
            src: { type: String,  required: true, },
            width: { type: Number, integer: true },
            height: { type: Number, integer: true },
            size: { type: Number, integer: true, required: true },
            type: { type: String, required: true, },
            icon: { type: String, required: true, },
            name: { type: String, required: true, es_indexed: true },
            title: {
                type: String,
                trim: true,
                get: (v: string): string => capitalizeOnlyFirst(v),
                set: (v: string): string => capitalizeOnlyFirst(clear(v)),
                es_indexed: true
            },
            description: {
                type: String,
                es_indexed: true
            }
        }],
        default: []
    }
}, {timestamps: true});

const RoomSchema: Schema = new Schema({
    title: {
        type: String,
        required : true,
        get: v => capitalizeOnlyFirst(v),
        set: v => capitalizeOnlyFirst(clear(v)),
        es_indexed: true
    },
    users: {type: [UserSchema], es_indexed: true},
    messages: { type: [MessageSchema], es_indexed: true, es_type: 'nested', es_include_in_parent: true }
}, {timestamps: true});


RoomSchema.plugin(mongoosastic, {
    esClient,
    populate: [
        {path: 'messages', select: 'author message'}
    ]
})

MessageSchema.plugin(mongoosastic, {
    esClient,
    populate: [
        {path: 'author', select: 'firstName lastName'}
    ]
})

export const ChatRoomModel: Model<IRoomModel> = connection.model<IRoomModel>("Room", RoomSchema);
export const ChatMessageModel: Model<IMessageModel> = connection.model<IMessageModel>("Message", MessageSchema);
