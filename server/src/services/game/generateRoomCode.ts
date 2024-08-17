const generateRoomCode = () => {
	const alphabet = '123456789ABCDEF';
	let roomCode = '';
	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * alphabet.length);
		roomCode += alphabet[randomIndex];
	}
	return roomCode;
};

export { generateRoomCode };
