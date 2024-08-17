import { Context } from 'hono';
import { getUserByUsername } from '../../services/user/get';
import { createUser } from '../../services/user/create';

const registerController = async (c: Context) => {
	const { username, password } = await c.req.json();

	if (!username || !password) {
		c.status(400);
		return c.json({
			success: false,
			message: 'Missing required fields',
			payload: null,
		});
	}

	if (await getUserByUsername(username)) {
		c.status(400);
		return c.json({
			success: false,
			message: 'Username already exists',
			payload: null,
		});
	}

	const hashedPassword = await Bun.password.hash(password);
	const isUserCreated = await createUser(username, hashedPassword);
	c.status(isUserCreated ? 200 : 500);
	return c.json({
		success: isUserCreated,
		message: isUserCreated ? 'User created successfully' : 'Failed to create user',
		payload: null,
	});
};

export { registerController };
