import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";

@Controller("auth")
export class AuthController {
    constructor() {}
    @Post("login")
    @HttpCode(HttpStatus.OK)
    login(@Body() body: any){
        return null;
    }
}