import { Chat } from "./chat";

export interface User {
    id?: string;
    email: string;
    password: string;
    chats?: Chat[];
}