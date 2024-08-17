import { getSocketTopic } from '../../utils/getSocketTopic';
import { upgradeWebSocket } from '../../utils/initWebSocket';
import { ServerWebSocket } from 'bun';
import { server } from '../..';

const exampleSocketController = upgradeWebSocket((_) => ({
	onOpen(_, ws) {
		const rawWs = ws.raw as ServerWebSocket;
		rawWs.subscribe(getSocketTopic.example);
		console.log("Socket Connected and Subscribed to 'example'");
	},
	onMessage(e, _) {
		console.log('Received message from client:', e.data);
		server.publish(getSocketTopic.example, e.data.toString());
	},
	onClose(_, ws) {
		const rawWs = ws.raw as ServerWebSocket;
		rawWs.unsubscribe(getSocketTopic.example);
		rawWs.close();
		console.log("Socket Disconnected and Unsubscribed from 'example'");
	},
}));

export { exampleSocketController };
