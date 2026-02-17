import { MessageEntity } from "./entities/message.entities"

export const MESSAGE_REPOSITORY = Symbol('MESSAGE_REPOSITORY');

export interface IMessageRepository {
    createMessage(): Promise<MessageEntity>;
    saveMessage(entity: MessageEntity): Promise<MessageEntity>;
    findMessageById(id: string): Promise<MessageEntity | null>;
    updateMessage(entity: MessageEntity): Promise<MessageEntity>;
    deleteMessage(entity: MessageEntity): Promise<void>;
    findMessagesByConversationId(conversationId: string, page: number): Promise<MessageEntity[]>;
}