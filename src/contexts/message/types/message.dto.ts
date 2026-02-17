import { Transform } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

export class MessageDTO {
    @IsString()
    content: string

    @IsString()
    conversationId: string

}
