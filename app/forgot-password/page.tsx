'use client';

import { useState } from 'react';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'If your email is registered, you will receive a password reset link.');
      } else {
        setError(data.message || 'Failed to send reset email.');
      }
    } catch (err) {
      console.error('Forgot password request error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="w-screen h-screen">
      <Navbar />
      <div className="relative flex flex-col items-center w-95/100 h-85/100 justify-center">
       <div className="absolute top-0 left-0 z-30 p-4 w-full bg-white h-full items-center justify-center flex">
        <div className='w-[280px] md:w-[400px]'>
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Forgot Your Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address below and we&apos;ll send you a link to reset your password. 
          </p>
        </div>
        
          
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {message && <p className="text-green-600 text-center text-sm">{message}</p>}
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="flex flex-col mb-2 pt-2">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full p-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none bg-[#F5F5F5] focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#03A0B4] hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 cursor-pointer transition ease-in-out duration-150"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
            <div className="mt-6 text-sm text-center">
              <Link href="/login" className="font-medium text-cyan-600 hover:text-cyan-500">
                Back to login
              </Link>
            </div>
          
        
      </div>
     </div>
      <div className="absolute top-1 left-1 md:top-2 md:left-2 z-20 w-full bg-white/60 h-full"></div>
      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 w-full bg-white/30 h-full"></div>
     </div>
    </div>
  );
}
