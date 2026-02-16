// guards/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JWTService } from 'src/contexts/auth/jwt.service';
import { TokenExpiredError, TokenInvalidError, TokenNotFoundError } from '../errors/conversation.errors';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JWTService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new TokenNotFoundError();
    }

    try {
      const payload = await this.jwtService.verifyToken(token);
      
      if (!payload) {
        throw new TokenInvalidError();
      }
      
      request.user = payload; 
      console.log('Token valid, user payload:', payload);
      return true;
    } catch (error) {
      throw new TokenExpiredError();
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}