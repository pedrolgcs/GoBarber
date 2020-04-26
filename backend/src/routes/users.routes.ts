import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  try {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default userRouter;
