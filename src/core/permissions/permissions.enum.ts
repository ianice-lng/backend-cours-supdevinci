export const Permissions = {
  // Conversations
  CONVERSATION_CREATE:  1n << 0n,  // 1
  CONVERSATION_READ:    1n << 1n,  // 2
  CONVERSATION_UPDATE:  1n << 2n,  // 4
  CONVERSATION_DELETE:  1n << 3n,  // 8

  // Messages
  MESSAGE_CREATE:       1n << 4n,  // 16
  MESSAGE_READ:         1n << 5n,  // 32
  MESSAGE_DELETE:       1n << 6n,  // 64

  // Users
  USER_READ:            1n << 7n,  // 128
  USER_UPDATE:          1n << 8n,  // 256
  USER_DELETE:          1n << 9n,  // 512

  // Admin
  ADMIN:                1n << 10n, // 1024
} as const;

// Presets de rôles
export const Roles = {
  GUEST:  Permissions.CONVERSATION_READ | Permissions.MESSAGE_READ,
  USER:   Permissions.CONVERSATION_CREATE | Permissions.CONVERSATION_READ | 
          Permissions.MESSAGE_CREATE | Permissions.MESSAGE_READ | 
          Permissions.USER_READ,
  ADMIN:  Permissions.ADMIN, // toutes les permissions
} as const;

export type Permission = typeof Permissions[keyof typeof Permissions];
