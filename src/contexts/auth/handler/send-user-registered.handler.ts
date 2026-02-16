import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AUTH_USER_REGISTERED_EVENT } from "../events/user-registered.event";
import { MailerService } from "src/core/mailer/mailer.service";
@Injectable()
export class SendUserRegisteredEventHandler {
    constructor(
        private readonly mailerService: MailerService
    ){}

    @OnEvent(AUTH_USER_REGISTERED_EVENT)
    async handle(payload: any){
        console.log('User registered event received with payload:', payload);
        console.log('Sending welcome email to:', payload.email);
        this.mailerService.send(payload.email, 'Welcome to our app!', 'Welcome to our app!');
    }
}