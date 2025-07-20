"use client";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const TipFlow = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentTips, setRecentTips] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showQR, setShowQR] = useState(false);

  const handleAmountClick = (val) => {
    setAmount(val.toString());
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!name || name.length < 3 || name.length > 10) {
      setError("Name must be between 3 and 10 characters.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, amount, message: note }),
      });

      if (res.ok) {
        setSuccess("Tip recorded! Redirecting to payment...");
        const upiLink = `upi://pay?pa=${process.env.NEXT_PUBLIC_UPI_ID}&pn=${encodeURIComponent(
          process.env.NEXT_PUBLIC_PAYEE_NAME || "Support"
        )}&am=${amount}&tn=${encodeURIComponent(
          note || "Thanks for your awesome work!"
        )}&cu=INR`;

        setTimeout(() => {
          window.location.href = upiLink;
        }, 1500);

        setName("");
        setAmount("");
        setNote("");
        setShowQR(false);
      } else {
        const errText = await res.text();
        setError(errText || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTips = async () => {
      const res = await fetch("/api/tips");
      const data = await res.json();
      setRecentTips(data);
    };

    const fetchLeaderboard = async () => {
      const res = await fetch("/api/tips?leaderboard=true");
      const data = await res.json();
      setLeaderboard(data);
    };

    fetchTips();
    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-black text-[#4ED7F1] min-h-screen p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Support My Work 💙</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Tip Form */}
        <div className="bg-[#111] p-6 rounded-2xl border border-[#4ED7F1] shadow-inner flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name (3–10 chars)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border border-[#4ED7F1] p-3 rounded-md w-full outline-none placeholder:text-[#4ED7F1]"
          />

          <div className="flex gap-3">
            {[20, 50, 100].map((val) => (
              <button
                key={val}
                onClick={() => handleAmountClick(val)}
                className="bg-[#4ED7F1] text-black text-sm font-semibold px-4 py-2 rounded-md cursor-pointer"
              >
                ₹{val}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Or enter custom amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent border border-[#4ED7F1] p-3 rounded-md w-full outline-none placeholder:text-[#4ED7F1]"
          />

          <input
            type="text"
            placeholder="Add a message (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="bg-transparent border border-[#4ED7F1] p-3 rounded-md w-full outline-none placeholder:text-[#4ED7F1]"
          />

          {/* QR Code Toggle */}
          <div className="w-full flex justify-center mb-4">
            {!showQR ? (
              <button
                onClick={() => setShowQR(true)}
                className="bg-[#4ED7F1] text-black font-medium px-4 py-2 rounded-md cursor-pointer"
              >
                Show UPI QR Code
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <div
                  onClick={() => setShowQR(false)}
                  className="cursor-pointer border border-[#4ED7F1] rounded-md p-2"
                >
                  <QRCodeCanvas
                    value={`upi://pay?pa=${process.env.NEXT_PUBLIC_UPI_ID}&pn=${encodeURIComponent(
                      process.env.NEXT_PUBLIC_PAYEE_NAME || "Support"
                    )}&am=${amount || "1"}&tn=${encodeURIComponent(
                      note || "Thanks for your awesome work!"
                    )}&cu=INR`}
                    size={200}
                    bgColor={"#000000"}
                    fgColor={"#4ED7F1"}
                    includeMargin={true}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Click QR to hide</p>
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#4ED7F1] text-black font-semibold text-lg py-3 rounded-md cursor-pointer w-full"
          >
            {loading ? "Processing..." : "Send Tip"}
          </button>

        </div>

        {/* Reviews + Leaderboard */}
        <div className="flex flex-col gap-6 h-[calc(100vh-100px)] overflow-y-auto pr-1">
          {/* Recent Reviews */}
          <div className="bg-[#111] p-5 rounded-2xl border border-[#4ED7F1] shadow-inner h-1/2 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">💬 Recent Reviews</h2>
            {recentTips.length === 0 ? (
              <p className="text-gray-500 text-sm">No tips yet.</p>
            ) : (
              <ul className="space-y-3">
                {recentTips.map((tip) => (
                  <li
                    key={tip._id}
                    className="bg-black p-3 rounded-lg border border-[#4ED7F1] text-sm"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-bold">{tip.name}</span>
                      <span>₹{tip.amount}</span>
                    </div>
                    {tip.message && (
                      <p className="italic text-[#a5f3fc]">"{tip.message}"</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(tip.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Leaderboard */}
          <div className="bg-[#111] p-5 rounded-2xl border border-[#4ED7F1] shadow-inner h-1/2 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">🏆 Top Supporters</h2>
            {leaderboard.length === 0 ? (
              <p className="text-gray-500 text-sm">No supporters yet.</p>
            ) : (
              <ul className="space-y-3">
                {leaderboard.map((user, i) => (
                  <li
                    key={user._id}
                    className="bg-black p-3 rounded-lg border border-[#4ED7F1] flex justify-between items-center text-sm"
                  >
                    <div>
                      <p className="font-bold">
                        #{i + 1} {user._id}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last tip: {new Date(user.lastDonation).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-white font-semibold text-sm">
                      ₹{user.totalAmount}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipFlow;
