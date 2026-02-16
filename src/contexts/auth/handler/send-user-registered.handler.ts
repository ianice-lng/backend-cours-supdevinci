import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AUTH_USER_REGISTERED_EVENT } from "../events/user-registered.event";

@Injectable()
export class SendUserRegisteredEventHandler {
    constructor(
    ){}

    @OnEvent(AUTH_USER_REGISTERED_EVENT)
    async handle(payload: any){
        console.log('User registered event received with payload:', payload);
    }
}