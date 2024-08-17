import { Hono } from 'hono';
import { exampleSocketController } from '../controllers/socket/exampleSocket';
import { colorGuessSocketController } from '../controllers/socket/color';

const socketRouter = new Hono();

socketRouter.get('/ex', exampleSocketController);
socketRouter.get('/color', colorGuessSocketController);

export { socketRouter };
