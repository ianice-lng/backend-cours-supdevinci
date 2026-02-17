import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConversationEntity } from "./entities/conversation.entities";
import { Repository } from "typeorm";

@Injectable()
export class ConversationRepository {
    constructor(
        @InjectRepository(ConversationEntity)
        private readonly conversationRepository: Repository<ConversationEntity>,
    ) { }

    async createConversation(): Promise<ConversationEntity> {
        const entity = new ConversationEntity();
        return entity;
    }
    async saveConversation(entity: ConversationEntity): Promise<ConversationEntity> {
        return this.conversationRepository.save(entity);
    }

    async findConversationById(id: string): Promise<ConversationEntity | null> {
        return this.conversationRepository
            .createQueryBuilder("conversation")
            .leftJoinAndSelect("conversation.participants", "participants")
            .where("conversation.id = :id", { id })
            .getOne();
        }

    async updateConversation(entity: ConversationEntity): Promise<ConversationEntity> {
        return this.conversationRepository.save(entity);
    }

    async deleteConversation(entity: ConversationEntity): Promise<void> {
        await this.conversationRepository.remove(entity);
    }
    async findAllConversationsByUserId(userId: string): Promise<ConversationEntity[]> {
        return this.conversationRepository
            .createQueryBuilder("conversation")
            .leftJoinAndSelect("conversation.participants", "allParticipants") // ✅ Charge TOUS les participants
            .innerJoin("conversation.participants", "filterParticipant") // ✅ Filtre les conversations où l'user est présent
            .where("filterParticipant.userCredentialsId = :userId", { userId })
            .getMany();
    }
}