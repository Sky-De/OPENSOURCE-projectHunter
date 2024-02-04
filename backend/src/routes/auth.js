import { Router } from 'express';
import { getUser } from '../controllers/active_user/getUser.js';
import { createUser } from '../controllers/account_creation/createUser.js';
import { login } from '../controllers/account_creation/login.js';
import { updateUser } from '../controllers/active_user/updateUser.js';
import { addPicture } from '../controllers/active_user/addPicture.js';
import { upload } from '../shared.js';
import { createInvite } from '../controllers/account_creation/createInv.js';
import { getInvite } from '../controllers/account_creation/getInvite.js';
//import { deletePicture } from '../controllers/deletePicture.js';

export { authRouter };

const authRouter = Router();

authRouter.get('/user', getUser);
authRouter.post('/user', createUser);
authRouter.patch('/user', updateUser);
authRouter.put('/user', login);
authRouter.get('/user/invite/:ikey', getInvite);
authRouter.post('/user/invite', createInvite);

authRouter.post('/user/pic', upload.single('file'), addPicture);
// authRouter.delete('/user/pic/:name', deletePicture);
