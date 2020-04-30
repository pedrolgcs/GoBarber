import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

const userRouter = Router();

const upload = multer(uploadConfig);

userRouter.get('/', async (req, res) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();
  return res.status(200).json(users);
});

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return res.status(201).json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.status(200).json(user);
  },
);

export default userRouter;
