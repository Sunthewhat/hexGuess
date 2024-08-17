import { prisma } from '../..';

const getUserByUsername = async (username: string) => {
	try {
		return await prisma.user.findFirstOrThrow({
			where: {
				username,
			},
		});
	} catch (e) {
		return null;
	}
};

const getUserById = async (id: number) => {
	try {
		return await prisma.user.findFirstOrThrow({
			where: {
				id,
			},
		});
	} catch (e) {
		return null;
	}
};

export { getUserByUsername, getUserById };
