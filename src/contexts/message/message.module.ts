import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "./entities/message.entities";
import { MESSAGE_REPOSITORY } from "./message.repository.interface";
import { MessageRepository } from "./message.repository";
import { JWTService } from "../auth/jwt.service";
import { JwtAuthGuard } from "../auth/infra/guards/jwt.guard";
import { PermissionsGuard } from "src/core/permissions/permissions.guard";
import { PermissionsModule } from "src/core/permissions/permissions.module";
import { AuthModule } from "../auth/auth.module";
@Module({
    imports: [TypeOrmModule.forFeature([
        MessageEntity
    ]), PermissionsModule, AuthModule],
    controllers: [MessageController],
    providers: [MessageService, 
        {provide: MESSAGE_REPOSITORY, useClass: MessageRepository},
        JWTService, JwtAuthGuard
    ],
})
export class MessageModule {}