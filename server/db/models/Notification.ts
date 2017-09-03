import { Document, Model, Schema, Types} from "mongoose";
import connection from "../dBase";
import {IUserModel} from "_server/db/models/User";

export interface INotificationModel extends Document {
    message: string;
    type: string;
    category: string;
    owner: IUserModel;
}

const NotificationSchema: Schema = new Schema({
    message: String,
    type: {
        type: String,
        enum: ["success", "info", "warning", "error"],
        default: "info"
    },
    category: {
        type: String,
        enum: ["user", "payment", "boat", "trip"],
        default: "user"
    },
    owner: { type: Types.ObjectId, ref: "User" }
});

export const NotificationModel: Model<INotificationModel> = connection.model<INotificationModel>("Notification", NotificationSchema);

export default NotificationModel;