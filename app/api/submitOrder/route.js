// app/api/submitOrder/route.js
import { connectToDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await req.json();

    await connectToDB();

    const order = new Order({
      user: {
        name: session.user.name,
        email: session.user.email,
      },
      address: body.address,
      country: body.country,
      state: body.state,
      cart: body.cart,
      createdAt: new Date(),
    });

    await order.save();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error submitting order:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
