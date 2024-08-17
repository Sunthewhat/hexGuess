import { Hono } from 'hono';
import { createRoomController } from '../controllers/game/createRoom';
import { getActiveRoomController } from '../controllers/game/getActiveRoom';

const gameRouter = new Hono();

gameRouter.get('/create', createRoomController);
gameRouter.get('/activerooms', getActiveRoomController);

export { gameRouter };
