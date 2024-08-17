import * as jwt from 'jsonwebtoken';

const verifyToken = (token: string) => {
	const JWT_SCRET = Bun.env.JWT_SECRET;
	try {
		const decoded = jwt.verify(token, JWT_SCRET!);
		return decoded as jwt.JwtPayload;
	} catch (e) {
		return null;
	}
};

export { verifyToken };
