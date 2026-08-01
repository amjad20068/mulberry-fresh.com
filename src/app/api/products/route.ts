import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find({});
        return NextResponse.json(products);
    } catch (error: Error | unknown) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
