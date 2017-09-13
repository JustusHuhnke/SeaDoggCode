import Boat from "./Boat";
import {ChatMessageModel as Message, ChatRoomModel as Room} from "./Chat";
import Country from "./Country";
import Notification from "./Notification";
import Trip from "./Trip";
import User from "./User";
export {
    Boat,
    Country,
    Message,
    Notification,
    Room,
    Trip,
    User,
};

export interface IPhoto {
    src: string;
    type: string;
    name: string;
    title?: string;
    description?: string;
    width?: number;
    height?: number;
    size: number;
}

export interface IFile {
    src: string;
    type: string;
    name: string;
    icon: string;
    size: number;
}
