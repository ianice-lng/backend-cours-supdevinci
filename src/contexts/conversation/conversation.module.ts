import { Module } from "@nestjs/common";
import { ConversationController } from "./conversation.controller";
import { ConversationService } from "./conversation.service";
import { ConversationEntity } from "./entities/conversation.entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CONVERSATION_REPOSITORY } from "./conversation.repository.interface";
import { ConversationRepository } from "./conversation.repository";
import { JWTService } from "../auth/jwt.service";
import { JwtAuthGuard } from "../auth/infra/guards/jwt.guard";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([
        ConversationEntity
    ]), 
AuthModule],
    controllers: [ConversationController],
    providers: [ConversationService,
        { provide: CONVERSATION_REPOSITORY, useClass: ConversationRepository },
        JWTService, JwtAuthGuard
    ],
})
export class ConversationModule {}