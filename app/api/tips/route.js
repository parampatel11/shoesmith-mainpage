import clientPromise from "@/lib/mongodb";

// POST /api/tips — Save a new tip
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, amount, message } = body;

    if (!name || name.length < 3 || name.length > 10) {
      return new Response("Invalid name. Must be 3–10 characters.", { status: 400 });
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return new Response("Invalid amount.", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const tips = db.collection("tips");

    const result = await tips.insertOne({
      name,
      amount: Number(amount),
      message: message || "",
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, insertedId: result.insertedId }), {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/tips error:", error);
    return new Response(JSON.stringify({ error: "Server error while saving tip." }), {
      status: 500,
    });
  }
}

// GET /api/tips — Get recent tips or leaderboard
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const tips = db.collection("tips");

    const { searchParams } = new URL(req.url);
    const leaderboard = searchParams.get("leaderboard");

    if (leaderboard === "true") {
      const topDonors = await tips
        .aggregate([
          {
            $group: {
              _id: "$name",
              totalAmount: { $sum: "$amount" },
              lastDonation: { $max: "$createdAt" },
            },
          },
          { $sort: { totalAmount: -1 } },
          { $limit: 5 },
        ])
        .toArray();

      return new Response(JSON.stringify(topDonors || []), { status: 200 });
    }

    const latestTips = await tips
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    return new Response(JSON.stringify(latestTips || []), { status: 200 });
  } catch (error) {
    console.error("GET /api/tips error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tips." }), {
      status: 500,
    });
  }
}
