import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    /* Find user by email */
    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    /* check user password */
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secrete, expiresIn } = authConfig.jwt;

    const token = sign({}, secrete, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
