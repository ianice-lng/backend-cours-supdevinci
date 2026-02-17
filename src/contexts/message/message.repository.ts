import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "./entities/message.entities";
import { Repository } from "typeorm";

@Injectable()
export class MessageRepository {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
    ) { }

    async createMessage(): Promise<MessageEntity> {
        const entity = new MessageEntity();
        return entity;
    }
    async saveMessage(entity: MessageEntity): Promise<MessageEntity> {
        return this.messageRepository.save(entity);
    }

    async findMessageById(id: string): Promise<MessageEntity | null> {
        return this.messageRepository.findOne({ where: { id } });
    }

    async updateMessage(entity: MessageEntity): Promise<MessageEntity> {
        return this.messageRepository.save(entity);
    }

    async deleteMessage(entity: MessageEntity): Promise<void> {
        await this.messageRepository.remove(entity);
    }

    async findMessagesByConversationId(conversationId: string, page: number): Promise<MessageEntity[]> {
        return this.messageRepository.find({ where: { conversationId }, order: { createdAt: "DESC" }, skip: (page - 1) * 5, take: 5 });
    }
}