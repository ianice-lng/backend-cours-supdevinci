import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class MessageDTO {
  @ApiProperty({ example: 'Bonjour tout le monde !' })
  @IsString()
  content: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  conversationId: string;
}