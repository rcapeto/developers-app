import { ErrorMessage } from '@application/model/error';
import { serverConfig } from '@config/server';
import { verify, sign } from 'jsonwebtoken';

export class Token {
  static secret_key = serverConfig.token.secret_key;

  static create(developerId: string, username: string, expires?: string) {
    const token = sign({ username }, Token.secret_key, {
      subject: developerId,
      expiresIn: expires ?? '7d',
    });

    return token;
  }

  /**
   *
   * @returns developerId
   */
  static verify(token: string) {
    try {
      const { sub } = verify(token, Token.secret_key);
      return sub;
    } catch (err) {
      throw new ErrorMessage('Invalid token', 'error');
    }
  }
}
