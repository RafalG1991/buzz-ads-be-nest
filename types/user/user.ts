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

export interface User {
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