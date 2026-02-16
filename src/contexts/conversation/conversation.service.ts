import { Injectable, Inject } from '@nestjs/common';
import { CONVERSATION_REPOSITORY, IConversationRepository } from './conversation.repository.interface';
import { ConversationDTO, UpdateConversationDTO } from './types/conversation.dto';
import { ConversationEntity } from './entities/conversation.entities';
import { ConversationNotFoundError, ConversationUnauthorizedError } from './errors/conversation.errors';

@Injectable()
export class ConversationService {
  constructor(
    @Inject(CONVERSATION_REPOSITORY) private readonly conversationRepository: IConversationRepository
  ) {}

  async createConversation(title: string, userId: string): Promise<ConversationEntity> {
    const entity = await this.conversationRepository.createConversation();
    entity.name = title;
    entity.userId = userId;
    return this.conversationRepository.saveConversation(entity);
  }

  async findConversationById(id: string): Promise<any> {
    const entity = await this.conversationRepository.findConversationById(id);
    console.log(entity)
    if(!entity) throw new ConversationNotFoundError({
        fields: {
            id: [id]
        }
    });
    return entity;
  }

  async updateConversation(body: UpdateConversationDTO, userId: string): Promise<any> {

    const entity = await this.conversationRepository.findConversationById(body.id)
    if(!entity) throw new ConversationNotFoundError({
        fields: {
            id: [body.id]
        }
    });
    entity.name = body.title
    if(entity.userId !== userId) throw new ConversationUnauthorizedError({
        fields: {
            id: [body.id]
        }
    });
    return this.conversationRepository.updateConversation(entity);
  }

  async deleteConversation(entity: any, userId: string): Promise<boolean> {
    this.findConversationById(entity)
    await this.conversationRepository.deleteConversation(entity);
    if(!entity) throw new ConversationNotFoundError({
        fields: {
            id: [entity.id]
        }
    });
    if(entity.userId !== userId) throw new ConversationUnauthorizedError({
        fields: {
            id: [entity.id]
        }
    });
    return true;
  }
}