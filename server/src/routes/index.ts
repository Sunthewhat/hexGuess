import { Hono } from 'hono';
import { socketRouter } from './socket.routes';
import { gameRouter } from './game.routes';
import { userRouter } from './user.routes';

const mainRouter = new Hono();

mainRouter.route('/ws', socketRouter);
mainRouter.route('/game', gameRouter);
mainRouter.route('/user', userRouter);

export { mainRouter };
