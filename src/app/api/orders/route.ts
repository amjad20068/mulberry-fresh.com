import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import { protect } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        await connectDB();

        const authUser = await protect(req);
        if (!authUser) {
            return NextResponse.json({ message: 'Not authorized, token failed' }, { status: 401 });
        }

        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
        } = await req.json();

        if (orderItems && orderItems.length === 0) {
            return NextResponse.json({ message: 'No order items' }, { status: 400 });
        } else {
            const order = new Order({
                orderItems,
                user: authUser._id,
                shippingAddress,
                paymentMethod,
                totalPrice,
            });

            const createdOrder = await order.save();
            return NextResponse.json(createdOrder, { status: 201 });
        }
    } catch (error: Error | unknown) {
        return NextResponse.json({ message: (error as Error).message || 'Server Error' }, { status: 500 });
    }
}
