import { Router } from "express";
import { getUser } from "../controllers/getUser.js";
import { createUser } from "../controllers/createUser.js";
import { login } from "../controllers/login.js";

export { authRouter }

const authRouter = Router()

authRouter.get('/user', getUser)
authRouter.post('/user', createUser)
authRouter.put('/user', login)