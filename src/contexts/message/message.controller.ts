import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, UseGuards,  Request, Query } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageDTO } from "./types/message.dto";
import { JwtAuthGuard } from "../auth/infra/guards/jwt.guard";
import { PermissionsGuard, RequirePermissions } from "src/core/permissions/permissions.guard";
import { Permissions } from "src/core/permissions/permissions.enum";

@Controller("message")
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MessageController {
    constructor(private readonly messageService: MessageService) {}
    
    @Post("send")
    @HttpCode(HttpStatus.OK)
    @RequirePermissions(Permissions.MESSAGE_CREATE)
    postMessage(@Body() body: MessageDTO, @Request() req: any){
        console.log('Received request to send message with body:', body, 'and user:', req.user);
        return this.messageService.createMessage(body, req.user.userCredentials.id);
    }

    @Get("conversation/:conversationId")
    @HttpCode(HttpStatus.OK)
    @RequirePermissions(Permissions.MESSAGE_READ)
    getMessagesByConversationId(@Param("conversationId") conversationId: string, @Query("page") page: number = 1){
        return this.messageService.findMessagesByConversationId(conversationId, page);
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    @RequirePermissions(Permissions.MESSAGE_READ)
    getMessageById(@Param("id") id: string){
        return this.messageService.findMessageById(id);
    }
    
    @Post("delete")
    @HttpCode(HttpStatus.OK)
    @RequirePermissions(Permissions.MESSAGE_DELETE)
    deleteMessage(@Body() body: any, @Request() req: any){
        return this.messageService.deleteMessage(body, req.user.userCredentials.id);
    }
}