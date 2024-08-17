import { Context } from 'hono';
import * as jwt from 'jsonwebtoken';
import { getUserByUsername } from '../../services/user/get';
import { setCookie } from 'hono/cookie';

const loginController = async (c: Context) => {
	try {
		const { username, password } = await c.req.json();
		if (!username || !password) {
			c.status(400);
			throw 'Missing required fields';
		}

		const user = await getUserByUsername(username);
		if (!user) {
			c.status(400);
			throw 'User not found';
		}
		const isPasswordValid = await Bun.password.verify(password, user.password);
		if (!isPasswordValid) {
			c.status(400);
			throw 'Invalid password';
		}

		const JWT_SCRET = Bun.env.JWT_SECRET;
		const isProd = Bun.env.ENV == 'prod';
		const token = jwt.sign({ id: user.id }, JWT_SCRET!);
		setCookie(c, 'userToken', token, {
			httpOnly: true,
			path: '/',
			sameSite: isProd ? 'none' : 'lax',
			secure: isProd,
			maxAge: 3600000,
		});
		return c.json({
			success: true,
			message: 'User logged in successfully',
			payload: null,
		});
	} catch (e) {
		return c.json({
			success: false,
			message: e,
			payload: null,
		});
	}
};

export { loginController };
