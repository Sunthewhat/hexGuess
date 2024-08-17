import { WSEvents } from 'hono/ws';

const deniedSocketConnection = (cause: string): WSEvents | Promise<WSEvents> => {
	return {
		onOpen(_, ws) {
			ws.close(4000, cause);
		},
		onMessage(_, ws) {
			ws.close(4000, cause);
		},
		onClose(_, ws) {
			ws.close(4000, cause);
		},
	};
};

export { deniedSocketConnection };
