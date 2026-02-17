import { Expose } from "class-transformer"
import { IsString } from "class-validator"
import { UserProfileEntity } from "src/contexts/auth/entities/user_profile.entities"


export class ConversationPresenter {

    @Expose()
    @IsString()
    conversationHistory: string[]

    @Expose()
    @IsString()
    conversationId: string

    @Expose()
    @IsString()
    title: string

    @Expose()
    participants: UserProfileEntity[]
}