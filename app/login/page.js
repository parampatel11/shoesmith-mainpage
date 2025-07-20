'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#4ED7F1] mb-6">
          Welcome to ShoeSmiths
        </h1>
        <p className="text-base sm:text-lg mb-8 text-gray-300">
          Please log in to continue
        </p>

        <button
          onClick={() => signIn('github',{ callbackUrl: '/dashboard' })}
          className="w-full bg-[#4ED7F1] text-black px-6 py-3 rounded-md font-semibold hover:shadow-[0_0_12px_#4ED7F1] transition"
        >
          Sign in with Github
        </button>
      </div>
    </div>
  );
}
