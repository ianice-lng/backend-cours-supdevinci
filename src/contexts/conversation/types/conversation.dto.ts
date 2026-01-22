import { IsString } from "class-validator";

export class ConversationDTO {
    @IsString()
    conversationId: string
}