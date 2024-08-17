const getPort = (): number => {
	const envData = Bun.env.PORT;

	if (envData) {
		return parseInt(envData);
	}

	throw new Error('PORT is not defined in the environment variables.');
};

export { getPort };
