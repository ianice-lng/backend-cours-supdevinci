import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, Request } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { ConversationEntity } from "./entities/conversation.entities";
import { ConversationDTO, CreateConversationDTO, UpdateConversationDTO } from "./types/conversation.dto";
import { JwtAuthGuard } from "../auth/infra/guards/jwt.guard";
import { privateDecrypt } from "crypto";
import { AuthService } from "../auth/auth.service";
import { PermissionsGuard, RequirePermissions } from "src/core/permissions/permissions.guard";
import { Permissions } from "src/core/permissions/permissions.enum";


@Controller("conversation")
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ConversationController {
    constructor(private readonly conversationService: ConversationService,
        private readonly authService: AuthService
    ) {}
    


    @Post()
    @HttpCode(HttpStatus.OK)
    @RequirePermissions(Permissions.CONVERSATION_CREATE)
    async createConversation(
    @Body() body: CreateConversationDTO, 
    @Request() req: any
    ): Promise<ConversationEntity> {
    const userCredentialsId = req.user.userCredentials.id;
    
    const allCredentialsIds = [...new Set([...body.participants, userCredentialsId])];
    const participants = await this.authService.findByCredentialsIds(allCredentialsIds);
    return this.conversationService.createConversation(body, userCredentialsId, participants);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @RequirePermissions(Permissions.CONVERSATION_UPDATE)
    updateConversation(@Body() body: UpdateConversationDTO, @Request() req: any): Promise<ConversationEntity | string | null>{
        return this.conversationService.updateConversation(body, req.user.id);
    }
    @Get("/all-conversations")
    @RequirePermissions(Permissions.CONVERSATION_READ)
    getAllConversationsByUserId(@Request() req: any): Promise<ConversationEntity[]> {
        return this.conversationService.findAllConversationsByUserId(req.user.userCredentials.id);
     }



    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    @RequirePermissions(Permissions.CONVERSATION_READ)
    getConversationById(@Param("id") id: string): Promise<ConversationEntity | string | null>{
        return this.conversationService.findConversationById(id)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    @RequirePermissions(Permissions.CONVERSATION_DELETE)
    deleteConversation(@Param("id") id: string, @Request() req: any): Promise<boolean>{
        return this.conversationService.deleteConversation({id}, req.user.id)
        
    }
    
}