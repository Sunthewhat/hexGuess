import { Hono } from 'hono';
import { registerController } from '../controllers/user/register';
import { loginController } from '../controllers/user/login';

const userRouter = new Hono();

userRouter.post('/register', registerController);
userRouter.post('/login', loginController);

export { userRouter };
