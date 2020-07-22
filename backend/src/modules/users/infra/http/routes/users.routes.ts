import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

// Controllers
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

// Middleware
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// Inicialize
const userRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

userRouter.post('/', usersController.create);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRouter;
