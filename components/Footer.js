import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <>
            <footer className="bg-black border-t border-[#4ED7F1] px-6 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                {/* Left Text */}
                <h1 className="text-white text-center md:text-left md:w-1/3">
                    © 2025, Gujarat India - All rights are reserved
                </h1>

                {/* Center Icons */}
                <div className="flex justify-center items-center gap-4 flex-wrap">
                    {/* === your unchanged icons === */}
                    <a href="https://www.instagram.com/prm_patel_/" className="cursor-pointer inline-block bg-black border-2 border-[#4ED7F1] rounded-full p-2 hover:scale-105 transition duration-300 hover:shadow-[0_0_12px_#4ED7F1]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#4ED7F1" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.25 1a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
                        </svg>
                    </a>

                    <a href="https://www.linkedin.com/in/your_username/" className="cursor-pointer inline-block bg-black border-2 border-[#4ED7F1] rounded-full p-2 hover:scale-105 transition duration-300 hover:shadow-[0_0_12px_#4ED7F1]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#4ED7F1" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.5h5v15H0v-15zm7.5 0H12v2.08h.06c.63-1.2 2.18-2.47 4.49-2.47 4.8 0 5.68 3.17 5.68 7.3v8.09h-5v-7.16c0-1.71-.03-3.92-2.39-3.92-2.39 0-2.76 1.87-2.76 3.8v7.28h-5v-15z" />
                        </svg>
                    </a>

                    <a href="https://github.com/parampatel11" className="cursor-pointer inline-block bg-black border-2 border-[#4ED7F1] rounded-full p-2 hover:scale-105 transition duration-300 hover:shadow-[0_0_12px_#4ED7F1]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#4ED7F1" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.17c-3.338.724-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.932 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3-.404c1.02.005 2.045.138 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.24 2.873.117 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.625-5.475 5.922.43.372.823 1.103.823 2.222v3.293c0 .32.216.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.373-12-12-12z" />
                        </svg>
                    </a>

                    <a href="https://www.chess.com/member/Param-11" className="cursor-pointer inline-block bg-black border-2 border-[#4ED7F1] rounded-full p-2 hover:scale-105 transition duration-300 hover:shadow-[0_0_12px_#4ED7F1]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#4ED7F1" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3 6v1c0 .6.4 1 1 1h1v1.1c-1.8.5-3 2.1-3 3.9h8c0-1.8-1.2-3.4-3-3.9V10h1c.6 0 1-.4 1-1V8H9zm-1 10h8v2H8v-2z" />
                        </svg>
                    </a>
                </div>

                {/* Right Tip Button */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-center md:w-1/3">
                    <h1 className="text-white">Support my work</h1>
                    <Link href="/tip">
                        <button className="text-black bg-[#4ED7F1] hover:shadow-[0_0_12px_#4ED7F1] border-2 border-[#4ED7F1] cursor-pointer px-5 py-2 text-sm md:text-base font-medium rounded-md transition duration-200">
                            TIP
                        </button>
                    </Link>
                </div>
            </footer>

        </>
    )
}

export default Footer
