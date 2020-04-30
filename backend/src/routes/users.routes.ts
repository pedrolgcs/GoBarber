import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

const userRouter = Router();

const upload = multer(uploadConfig);

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

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    console.log(req.file);
    return res.status(200).json({ message: 'Patch Aavatar' });
  },
);

export default userRouter;
