//register-related models

export interface registerCredentials {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IAccount {
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  'ADMIN' = 'ADMIN',
  'ORGANIZER' = 'ORGANIZER',
  'USER' = 'USER',
}

//login-related models

export interface loginCredentials {
  email: string;
  password: string;
}

export interface LoggedIn {
  accessToken: string;
  loggedAccount: IAccount;
}
