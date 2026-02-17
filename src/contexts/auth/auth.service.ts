import { Injectable, Inject, ExecutionContext } from '@nestjs/common';
import { AUTH_REPOSITORY, IAuthRepository } from './auth.repository.interface';
import { UserCredentialsEntity } from './entities/user_credentials.entities';
import { LoginDTO, RegisterDTO } from './types/auth.dto';
import { PASSWORD_HASHER} from './interface/password-hasher.interface';
import { PasswordHasherService } from './password-hasher.service';
import * as jwt from 'jsonwebtoken';
import { JWT_SERVICE, JWTServiceInterface } from './interface/jwt.interface';
import { JWTService } from './jwt.service';
import { DomainError } from 'src/core/errors/domain-error';
import { EmailAlreadyInUseError, InvalidCredentialsError, InvalidPasswordError, UserNotFoundError } from './errors/auth.errors';
import { EVENT_BUS, EventBusPort } from 'src/core/events/event-bus.port';
import { UserRegisteredEvent } from './events/user-registered.event';
import { UserProfileEntity } from './entities/user_profile.entities';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: IAuthRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasherService,
    @Inject(JWT_SERVICE) private readonly jwtService: JWTService,
    @Inject(EVENT_BUS) private readonly eventBus: EventBusPort
  ) {}

  async register (dto : RegisterDTO): Promise<boolean | string> {
    const emailExists =  await this.authRepository.checkEmailExists(dto.email);
    if (emailExists) {
      throw new EmailAlreadyInUseError({
        fields: {
          email: [dto.email]
        }
      });
    }
    const hashedPassword = await this.passwordHasher.hash(dto.password);
    const userCredentials = new UserCredentialsEntity();
    userCredentials.email = dto.email;
    userCredentials.passwordHash = hashedPassword;
    await this.authRepository.createCredentials(userCredentials);

    const userProfile = await this.authRepository.createProfile(dto.username, userCredentials.id);
    await this.eventBus.publish(UserRegisteredEvent.create({
      userId: userCredentials.id,
      username: dto.username,
      email: dto.email
    }));
    return userProfile;
  }

  async login (dto: LoginDTO): Promise<object | null> {
    const userCredentials = await this.authRepository.findCredentialsByEmail(dto.email);
    if (!userCredentials) {
      throw new InvalidCredentialsError({
        fields: {
          email: [dto.email]
        }
      });
    }

    if (!await this.passwordHasher.compare(dto.password, userCredentials.passwordHash)) {
      throw new InvalidPasswordError({
        fields: {
          password: []
        }
      });
    }

    const acces_token = await this.jwtService.generateToken({ userCredentials});
    const refresh_token = await this.jwtService.generateToken({ userCredentials }, '7d');

    return { acces_token, refresh_token };
  }

  async getProfile(id: string): Promise<any> {

    const profile = await this.authRepository.findProfileByCredentialsId(id);
    if (!profile) {
      throw new UserNotFoundError({
        fields: {
          id: [id]
        }
      });
    }
    return profile;
  }

  async findByCredentialsIds(ids: string[]): Promise<UserProfileEntity[]> {
    return this.authRepository.findProfileByCredentialsIds(ids);
  }

 
}


