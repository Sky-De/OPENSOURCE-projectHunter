import { Router } from 'express';
import { getUser } from '../controllers/getUser.js';
import { createUser } from '../controllers/createUser.js';
import { login } from '../controllers/login.js';
import { updateUser } from '../controllers/updateUser.js';
import { upload } from '../shared.js';

export { authRouter };

const authRouter = Router();

authRouter.get('/user', getUser);
authRouter.post('/user', createUser);
authRouter.patch('/user', upload.single('file'), updateUser);
authRouter.put('/user', login);
