import { ServerWebSocket } from 'bun';
import { generateRoomCode } from '../game/generateRoomCode';

const Rooms: Map<string, Set<number>> = new Map();

const getActiveRooms = (): { room: string; users: number[] }[] => {
	return Array.from(Rooms).map(([room, users]) => ({ room, users: Array.from(users) }));
};

const clearEmptyRooms = () => {
	let emptyRooms: string[] = [];
	for (const [room, users] of Rooms) {
		if (users.size === 0) {
			Rooms.delete(room);
			emptyRooms.push(room);
		}
	}
	console.log(
		`Cleared ${emptyRooms.length} empty rooms at ${new Date().toLocaleString()} ${emptyRooms}`
	);
};

const generateLegitNewRoomCode = (): string => {
	let roomcode: string = generateRoomCode();
	while (Rooms.has(roomcode)) {
		roomcode = generateRoomCode();
	}
	Rooms.set(roomcode, new Set());
	return roomcode;
};

const isRoomCodeLegit = (roomId: string): boolean => {
	return Rooms.has(roomId);
};

const subscribe = (ws: ServerWebSocket, roomId: string, userId: number) => {
	const room = Rooms.get(roomId);
	if (room) {
		ws.subscribe(roomId);
		room.add(userId);
	}
};

const unsubscribeAndClose = (ws: ServerWebSocket, roomId: string, userId: number) => {
	const room = Rooms.get(roomId);
	if (room) {
		room.delete(userId);
		if (room.size === 0) {
			Rooms.delete(roomId);
		}
		ws.unsubscribe(roomId);
		ws.close();
	}
};

export {
	getActiveRooms,
	generateLegitNewRoomCode,
	subscribe,
	unsubscribeAndClose,
	isRoomCodeLegit,
	clearEmptyRooms,
};
