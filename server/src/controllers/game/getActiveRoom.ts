import { Context } from 'hono';
import { getActiveRooms } from '../../services/socket/roomManager';

const getActiveRoomController = async (c: Context) => {
	return c.json({
		success: true,
		message: 'Get active room',
		payload: getActiveRooms(),
	});
};

export { getActiveRoomController };
