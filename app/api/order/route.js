import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from '@/models/Order';

export async function POST(req) {
  const body = await req.json();

  const { userId, cart, address, country, state } = body;

  if (!userId || !cart?.length || !address) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const newOrder = await Order.create({
      userId,
      cart,
      address,
      country,
      state,
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
