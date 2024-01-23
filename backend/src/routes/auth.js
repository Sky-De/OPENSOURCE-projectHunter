import { Router } from 'express';
import { getUser } from '../controllers/getUser.js';
import { createUser } from '../controllers/createUser.js';
import { login } from '../controllers/login.js';
import { updateUser } from '../controllers/updateUser.js';
import { addPicture } from '../controllers/addPicture.js';
import { deletePicture } from '../controllers/deletePicture.js';
import { upload } from '../shared.js';
//import { createInvite } from "../controllers/createInv.js"

export { authRouter };

const authRouter = Router();

authRouter.get('/user', getUser);
authRouter.post('/user', createUser);
authRouter.patch('/user', updateUser);
authRouter.put('/user', login)
//authRouter.post('/user/invite', createInvite);

authRouter.post('/user/pic', upload.single('file'), addPicture);
authRouter.delete('/user/pic/:name', deletePicture);
