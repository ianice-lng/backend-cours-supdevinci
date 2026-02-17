import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginDTO {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsStrongPassword()
  password: string;
}

export class RegisterDTO {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'JohnDoe' })
  @IsString()
  username: string;
}