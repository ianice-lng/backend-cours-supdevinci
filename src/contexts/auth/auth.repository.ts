import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCredentialsEntity } from "./entities/user_credentials.entities";
import { Repository } from "typeorm";
@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(UserCredentialsEntity)
        private readonly credentialsRepository: Repository<UserCredentialsEntity>,
    ) { }

    async findCredentialsByEmail(email: string) : Promise<UserCredentialsEntity | null> {
        const entity = await this.credentialsRepository.findOne({ where: { email } });

        return entity;
    }
}