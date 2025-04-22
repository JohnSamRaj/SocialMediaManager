export interface User {
  id?: number;
  fullName: string;
  email: string;
  profilePicture?: string;
  createdAt?: Date;
  lastLogin?: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  fullName: string;
}
