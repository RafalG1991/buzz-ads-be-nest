export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum Status {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  HOLIDAY = 'HOLIDAY',
  BANNED = 'BANNED',
}

export interface UserType {
  id: string;
  email: string;
  password: string;
  tel?: string;
  firstName?: string;
  lastName?: string;
  currentTokenId?: string;
  role: Role;
  status: Status;
  activationToken?: string;
}

export interface AuthUser {
  ok: true;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
}