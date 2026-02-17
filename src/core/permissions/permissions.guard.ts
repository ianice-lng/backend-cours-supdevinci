import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from './permissions.service';
import { Permission } from './permissions.enum';

export const RequirePermissions = (...permissions: Permission[]) => Reflect.metadata('permissions', permissions);

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionsService: PermissionsService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.get<Permission[]>('permissions', context.getHandler());

    if (!required) return true;

    const request = context.switchToHttp().getRequest();
    const userMask = this.permissionsService.fromString(request.user.permissions);

    const canAccess = this.permissionsService.hasAll(userMask, ...required);

    if (!canAccess) {
      throw new ForbiddenException('Permissions insuffisantes');
    }

    return true;
  }
}