import { Hono } from 'hono';
import { getPort } from './utils/getPort';
import { mainRouter } from './routes';
import { websocket } from './utils/initWebSocket';
import { logger } from 'hono/logger';
import { PrismaClient } from '../prisma/client';
import { scheduledExecutor } from './utils/scheduledExecutor';

const app = new Hono();
export const prisma = new PrismaClient();

scheduledExecutor();

app.use(logger());

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.route('', mainRouter);

const PORT = getPort();

console.log('Server is running on port', PORT);

export const server = Bun.serve({
	port: PORT,
	fetch: app.fetch,
	websocket: websocket,
});
