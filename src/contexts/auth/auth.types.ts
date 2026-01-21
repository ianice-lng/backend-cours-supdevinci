import { Expose, Transform } from "class-transformer"
import { IsEmail, IsNumber, IsString, isString, IsStrongPassword } from "class-validator"

export class LoginDTO {
    @IsEmail()
    email: string
    @IsStrongPassword()
    password: string
}

export class UserLoggerPresenter {
    @Expose()
    @IsString()
    username: string
}