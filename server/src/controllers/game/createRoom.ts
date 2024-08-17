import { Context } from 'hono';
import { generateLegitNewRoomCode } from '../../services/socket/roomManager';

const createRoomController = (c: Context) => {
	return c.json({
		success: true,
		message: 'Room created successfully',
		payload: generateLegitNewRoomCode(),
	});
};

export { createRoomController };
