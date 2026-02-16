import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, Request } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { ConversationEntity } from "./entities/conversation.entities";
import { ConversationDTO, CreateConversationDTO, UpdateConversationDTO } from "./types/conversation.dto";
import { JwtAuthGuard } from "./guards/conversation.guard";


@Controller("conversation")
@UseGuards(JwtAuthGuard)
export class ConversationController {
    constructor(private readonly conversationService: ConversationService) {}
    @Get()
    getConversations(){
        // Envoie la liste des discussions de l'utilisateur
    }


    @Post()
    @HttpCode(HttpStatus.OK)
    createConversation(@Body() body: CreateConversationDTO, @Request() req: any): Promise<ConversationEntity>{
        // Crée une nouvelle discussion
        return this.conversationService.createConversation(body.title, req.user.userCredentials.id);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    updateConversation(@Body() body: UpdateConversationDTO, @Request() req: any): Promise<ConversationEntity | string | null>{
        return this.conversationService.updateConversation(body, req.user.id);
    }

    @Get("/:id")
    getConversationById(@Param("id") id: string): Promise<ConversationEntity | string | null>{
        return this.conversationService.findConversationById(id)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    deleteConversation(@Param("id") id: string, @Request() req: any): Promise<boolean>{
        return this.conversationService.deleteConversation({id}, req.user.id)
        
    }
}