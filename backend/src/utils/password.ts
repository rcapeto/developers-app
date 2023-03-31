import { compare, hash } from 'bcrypt';

export class Password {
  static async encrypt(password: string, buffer?: number): Promise<string> {
    return await hash(password, buffer ?? 10);
  }

  static async check(
    password: string,
    databasePassword: string,
  ): Promise<boolean> {
    return await compare(password, databasePassword);
  }
}
