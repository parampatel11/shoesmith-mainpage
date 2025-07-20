'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from 'next-auth/react';


export default function BuyPage() {
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();


    const productName = slug?.replace(/-/g, ' ') ?? 'Product';
    const imageSrc = searchParams.get('img');
    const finalImageSrc = imageSrc?.startsWith('/') ? imageSrc : `/${imageSrc}`;
    // console.log("Query param imageSrc:", imageSrc);

    const [count, setcount] = useState(0)

    const increment = () => {
        if (count < 15) {
            setcount(previous => previous + 1)
        }
    }

    const decrement = () => {
        if (count > 0) {
            setcount(previous => previous - 1)
        }
    }

    const notify = () => {
        if (!session ) {
            toast('Please login first', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                style: {
                    background: "#4ED7F1",
                    color: "black"
                }
            })
            return;
        }
        if (count === 0) {
            toast('Select 1 piece to add in cart', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                style: {
                    background: "#4ED7F1",
                    color: "black"
                }
            })
            return;
        }

        const cartItem = {
            name: productName,
            image: finalImageSrc,
            price: 1000,
            quantity: count
        };


        let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = existingCart.find(item => item.name === cartItem.name);


        if (existing) {
            existing.quantity += cartItem.quantity;
        } else {
            existingCart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));

        toast('Check dashboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            style: {
                background: "#4ED7F1",
                color: "black",
            }
        })
    }

    return (
        <>
            <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black text-white">
                {/* Left: Product Image */}
                <div className="flex justify-center md:justify-end items-center p-4 md:p-8">
                    {imageSrc ? (
                        <img
                            src={finalImageSrc}
                            alt={productName}
                            className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] object-contain border-2 border-white rounded-xl"
                        />
                    ) : (
                        <p className="text-red-500">Image not found or invalid path.</p>
                    )}
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 md:p-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4ED7F1] capitalize mb-4">
                        {productName}
                    </h1>
                    <p className="text-base sm:text-lg mb-4">Price: ₹1000</p>
                    <button className="px-6 py-3 bg-[#4ED7F1] text-black font-semibold rounded hover:shadow-[0_0_12px_#4ED7F1] transition">
                        Buy Now
                    </button>
                    <div className='flex justify-center items-center mt-4 gap-2'>
                        <svg onClick={notify} className='cursor-pointer' width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="58" height="58" rx="8" ry="8" fill="none" stroke="#4ED7F1" strokeWidth="2" />
                            <g transform="translate(10, 10) scale(1.6)" fill="#4ED7F1">
                                <circle cx="16.5" cy="18.5" r="1.5" />
                                <circle cx="9.5" cy="18.5" r="1.5" />
                                <path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" />
                            </g>
                        </svg>
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

                        <button onClick={decrement} className="px-4 py-2 cursor-pointer font-extrabold  bg-[#4ED7F1] text-black  rounded hover:shadow-[0_0_12px_#4ED7F1] transition">
                            -
                        </button>
                        <span className='px-5'>{count}</span>
                        <button onClick={increment} className="px-4 py-2 cursor-pointer font-extrabold bg-[#4ED7F1] text-black rounded hover:shadow-[0_0_12px_#4ED7F1] transition">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
