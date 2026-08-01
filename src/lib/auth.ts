import jwt from 'jsonwebtoken';
import User from '@/lib/models/User';

export async function protect(req: Request) {
    const authHeader = req.headers.get('authorization');

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            const token = authHeader.split(' ')[1];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            const user = await User.findById(decoded.id).select('-password');
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    return null;
}

export async function admin(req: Request) {
    const user = await protect(req);
    if (user && user.role === 'admin') {
        return user;
    }
    return null;
}
