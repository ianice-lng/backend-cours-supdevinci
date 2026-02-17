import { IsArray, isString, IsString } from "class-validator";
import { isStringObject } from "util/types";
import { ApiProperty } from '@nestjs/swagger';
export class ConversationDTO {
    @IsString()
    conversationId: string
}

export class CreateConversationDTO {
  @ApiProperty({ example: 'Ma super conversation' })
  title: string;

  @ApiProperty({ example: ['uuid-user-1', 'uuid-user-2'] })
  participants: string[];
}

export class UpdateConversationDTO {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Nouveau titre' })
  title: string;
}



