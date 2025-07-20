'use client';
import { useEffect, useState } from 'react';
import CountryStateSelector from '@/components/CountryStateSelector';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardClient({ session }) {
    const [cartItems, setCartItems] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [addressText, setAddressText] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
        setIsMounted(true);
    }, []);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (!isMounted) return null;

    const handleDelete = (name) => {
        const updatedCart = cartItems.filter(item => item.name !== name);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleSubmit = async () => {

        if (!addressText || !selectedCountry || !selectedState) {
            toast('Please fill all required fields.', {
                position: 'top-right',
                autoClose: 2000,
                theme: 'dark',
                style: {
                    background: '#4ED7F1',
                    color: 'black'
                }
            });
            return;
        }

        // Use GitHub username instead of undefined token
        const userId = session?.user?.name;

        const res = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                cart: cartItems,
                address: addressText,
                country: selectedCountry.label,
                state: selectedState.label,
            }),
        });

        const data = await res.json();

        if (data.success) {
            toast('Order placed successfully!', {
                position: 'top-right',
                autoClose: 2000,
                theme: 'dark',
                style: {
                    background: '#4ED7F1',
                    color: 'black'
                }
            });

            localStorage.removeItem("cart");
            setCartItems([]);
            setAddressText('');
            setSelectedCountry(null);
            setSelectedState(null);
        } else {
            toast('Failed to place order. Try again.', {
                position: 'top-right',
                autoClose: 2000,
                theme: 'dark',
                style: {
                    background: '#FF4E4E',
                    color: 'white'
                }
            });
        }
    };

    return (

        <div className="min-h-screen w-full bg-black text-white px-4 py-8 flex flex-col items-center">
            <div className="w-full max-w-xl mt-15 flex flex-col items-center gap-4">
                <img
                    src={session.user.image}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full border-2 border-[#4ED7F1] shadow-md"
                />
                <div className="text-center flex flex-row">
                    <h2 className="text-2xl text-white font-bold">@{session.user.name}</h2>
                </div>
            </div>

            <div className="w-full max-w-2xl mt-12 space-y-4">
                {cartItems.length === 0 ? (
                    <p className="text-gray-400 text-center">Your cart is empty.</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="bg-black border-2 border-[#4ED7F1] text-[#4ED7F1] p-4 rounded-xl flex justify-between items-center shadow-lg">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
                                <div>
                                    <h3 className="text-lg font-semibold capitalize">{item.name}</h3>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price per unit: ₹{item.price}</p>
                                </div>
                            </div>
                            <div className="text-right font-bold text-lg">
                                <div className="flex items-center flex-col">
                                    ₹{item.price * item.quantity}
                                    <svg onClick={() => handleDelete(item.name)} xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-[#4ED7F1] cursor-pointer">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {cartItems.length > 0 && (
                    <div className="text-right text-xl font-bold text-[#4ED7F1]">
                        <button type="button" className="text-black bg-[#4ED7F1] border-2 border-[#4ED7F1] hover:shadow-[0_0_12px_#4ED7F1] cursor-pointer mt-2 px-7 py-3 text-lg font-medium rounded-md transition duration-200">
                            Total: ₹{total}
                        </button>
                    </div>
                )}

                <div className="w-full max-w-4xl mx-auto my-6">
                    <textarea
                        required
                        name="Message"
                        placeholder="Write your address"
                        value={addressText}
                        onChange={(e) => setAddressText(e.target.value)}
                        className="text-[#4ED7F1] placeholder-[#4ED7F1] border-2 border-[#4ED7F1] w-full h-[15vh] text-lg pt-3 pl-3 rounded-md leading-tight appearance-none resize-none overflow-auto"
                    />
                </div>

                <div>
                    <CountryStateSelector
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                        selectedState={selectedState}
                        setSelectedState={setSelectedState}
                    />
                </div>

                <div className="w-full flex justify-center items-center">
                    <button type="submit" onClick={handleSubmit} className="text-[#4ED7F1] hover:text-black hover:bg-[#4ED7F1] border-2 border-[#4ED7F1] cursor-pointer mt-4 px-10 py-3 text-lg font-medium rounded-md transition duration-200">
                        SUBMIT
                    </button>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </div>
    );
}
