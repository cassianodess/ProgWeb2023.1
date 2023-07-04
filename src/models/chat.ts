import { Message } from "./message";

export interface Chat {
    id?: string;
    messages: Message[];
}