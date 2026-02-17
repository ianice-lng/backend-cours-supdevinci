import { Injectable } from '@nestjs/common';
import { Permissions, Permission } from './permissions.enum';

@Injectable()
export class PermissionsService {

  add(mask: bigint, permission: Permission): bigint {
    return mask | permission;
  }

  remove(mask: bigint, permission: Permission): bigint {
    return mask & ~permission;
  }

  has(mask: bigint, permission: Permission): boolean {
    return (mask & permission) !== 0n;
  }

  hasAll(mask: bigint, ...permissions: Permission[]): boolean {
    return permissions.every(p => this.has(mask, p));
  }

  hasAny(mask: bigint, ...permissions: Permission[]): boolean {
    return permissions.some(p => this.has(mask, p));
  }

  toggle(mask: bigint, permission: Permission): bigint {
    return mask ^ permission;
  }

  toString(mask: bigint): string {
    return mask.toString();
  }

  fromString(mask: string): bigint {
    return BigInt(mask);
  }
}