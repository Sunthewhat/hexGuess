import { prisma } from '../..';

const createUser = async (username: string, password: string): Promise<boolean> => {
	try {
		await prisma.user.create({
			data: {
				username,
				password,
			},
		});
		return true;
	} catch (_) {
		return false;
	}
};

export { createUser };
