import { server } from '../..';
import { Context } from 'hono';
import { ServerWebSocket } from 'bun';
import { getCookie } from 'hono/cookie';
import { upgradeWebSocket } from '../../utils/initWebSocket';
import { deniedSocketConnection } from '../../services/socket/deniedConnection';
import { verifyToken } from '../../utils/verifyToken';
import { isRoomCodeLegit, subscribe, unsubscribeAndClose } from '../../services/socket/roomManager';

const colorGuessSocketController = upgradeWebSocket(async (c: Context) => {
	const { roomId } = c.req.query();
	const token = getCookie(c, 'userToken');
	if (!token) {
		return deniedSocketConnection('Missing token');
	}
	const v = verifyToken(token);
	if (!v) {
		return deniedSocketConnection('Invalid token');
	}
	const userId = v.id as number;
	if (!roomId) {
		return deniedSocketConnection('Missing room ID');
	}
	if (!isRoomCodeLegit(roomId)) {
		return deniedSocketConnection('Invalid room ID');
	}
	return {
		onOpen(_, ws) {
			const rawWs = ws.raw as ServerWebSocket;
			subscribe(rawWs, roomId, userId);
		},
		onMessage(e, _) {
			server.publish(roomId, e.data.toString());
		},
		onClose(_, ws) {
			const rawWs = ws.raw as ServerWebSocket;
			unsubscribeAndClose(rawWs, roomId, userId);
		},
	};
});

export { colorGuessSocketController };
