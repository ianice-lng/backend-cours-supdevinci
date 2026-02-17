import { IsArray, isString, IsString } from "class-validator";
import { isStringObject } from "util/types";

export class ConversationDTO {
    @IsString()
    conversationId: string
}

export class CreateConversationDTO {
    @IsString()
    title: string
    
    @IsArray()
    @IsString({ each: true })
    participants: string[]
}

export class UpdateConversationDTO{
    @IsString()
    title: string

    @IsString()
    id: string
}