import { Injectable, Inject } from '@nestjs/common';
import { MESSAGE_REPOSITORY, IMessageRepository } from './message.repository.interface';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY) private readonly messageRepository: IMessageRepository
  ) {}

  async createMessage(body: any, userId: string): Promise<any> {
    const entity = await this.messageRepository.createMessage();
    if(!entity) throw new Error("Error creating message");
    if(!body.content) throw new Error("Content is required");
    if(!body.conversationId) throw new Error("ConversationId is required");
    
    if(!userId) throw new Error("UserId is required");
    entity.content = body.content;
    entity.senderId = userId;
    entity.conversationId = body.conversationId;
    return this.messageRepository.saveMessage(entity);
  }

  async findMessageById(id: string): Promise<any> {
    const entity = await this.messageRepository.findMessageById(id);
    if(!entity) throw new Error("Message not found");
    return entity;
  }

  async updateMessage(body: any, userId: string): Promise<any> {
    const entity = await this.messageRepository.findMessageById(body.id)
    if(!entity) throw new Error("Message not found");
    if(entity.senderId !== userId) throw new Error("Unauthorized");
    entity.content = body.content
    return this.messageRepository.updateMessage(entity);
  }

  async deleteMessage(entity: any, userId: string): Promise<boolean> {
    this.findMessageById(entity)
    if(entity.userMessageCreated !== userId) throw new Error("Unauthorized");
    await this.messageRepository.deleteMessage(entity);
    if(!entity) throw new Error("Message not found");
    return true;
  }

  async findMessagesByConversationId(conversationId: string, page: number): Promise<any[]> {
    return this.messageRepository.findMessagesByConversationId(conversationId, page);
  }
}
