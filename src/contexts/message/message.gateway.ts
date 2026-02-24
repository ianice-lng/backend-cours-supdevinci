import { OnEvent } from "@nestjs/event-emitter";
import { SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from "@nestjs/websockets";
import { Server, Socket } from "socket.io"; // <-- IMPORTANT : importer de 'socket.io'
import { MessageEntity } from "./entities/message.entities";

@WebSocketGateway({
  cors: {
    origin: '*', // À restreindre en production
  },
})
export class MessageGateway {
  @WebSocketServer() 
  server: Server;

  @OnEvent('message.sent')
  handleMessageSent(payload: MessageEntity) {
    this.server.to(`conversation_${payload.conversationId}`).emit('onMessage', payload);
  }

  @SubscribeMessage('joinConversation')
  handleJoin(
    @ConnectedSocket() client: Socket, 
    @MessageBody() data: { conversationId: string }
  ) {
    client.join(`conversation_${data.conversationId}`);
    console.log(`User ${client.id} joined room: conversation_${data.conversationId}`);
  }
}