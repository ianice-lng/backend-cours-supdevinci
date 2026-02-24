import { Injectable, Inject } from '@nestjs/common';
import { MESSAGE_REPOSITORY, IMessageRepository } from './message.repository.interface';
import { MessageError, MessageNotFoundError, MessageUnauthorizedError } from './errors/message.error';
import { MessageDTO } from './types/message.dto';
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY) private readonly messageRepository: IMessageRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async createMessage(body: any, userId: string): Promise<any> {
    const entity = await this.messageRepository.createMessage();
    if(!entity) throw new MessageError({
        fields: {
            content: body.content,
            conversationId: body.conversationId
        },
        details: {
            content: "Content is required",
            conversationId: "ConversationId is required"
        }
    }); 
    if(!body.content) throw new MessageError({
        fields: {
            content: body.content
        },
        details: {
            content: "Content is required"
        }
    }); 
    if(!body.conversationId) throw new MessageError({
        fields: {
            conversationId: body.conversationId
        },
        details: {
            conversationId: "ConversationId is required"
        }
    });
    
    if(!userId) throw new MessageError({
        fields: {
            userId: [userId]
        },
        details: {
            userId: "UserId is required"
        }
    });
    entity.content = body.content;
    entity.senderId = userId;
    entity.conversationId = body.conversationId;

    const savedMessage = await this.messageRepository.saveMessage(entity);

    this.eventEmitter.emit('message.sent', savedMessage);
    return savedMessage;
  }

  async findMessageById(id: string): Promise<any> {
    const entity = await this.messageRepository.findMessageById(id);
    if(!entity) throw new MessageNotFoundError({
        fields: {
            id: [id]
        }
    });
    return entity;
  }

  async updateMessage(body: any, userId: string): Promise<any> {
    const entity = await this.messageRepository.findMessageById(body.id)
    if(!entity) throw new MessageNotFoundError({
        fields: {
            id: [body.id]
        }
    });
    if(entity.senderId !== userId) throw new MessageUnauthorizedError({
        fields: {
            id: [body.id]
        }
    });
    entity.content = body.content
    return this.messageRepository.updateMessage(entity);
  }

  async deleteMessage(entity: any, userId: string): Promise<boolean> {
    this.findMessageById(entity)
    if(entity.senderId !== userId) throw new MessageUnauthorizedError({
        fields: {
            id: [entity.id]
        }
    });
    await this.messageRepository.deleteMessage(entity);
    if(!entity) throw new MessageNotFoundError({
        fields: {
            id: [entity.id]
        }
    });
    return true;
  }

  async findMessagesByConversationId(conversationId: string, page: number): Promise<any[]> {
    return this.messageRepository.findMessagesByConversationId(conversationId, page);
  }

  
}
