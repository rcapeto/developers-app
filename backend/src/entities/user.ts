export interface UserEntity extends BasicUser {
  avatarUrlWeb: string;
  avatarUrlMobile: string;
}

export interface BasicUser {
  id?: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  document: string;
  password: string;
  email: string;
  articles?: [];
  name: string;
  createdAt?: Date;
}
