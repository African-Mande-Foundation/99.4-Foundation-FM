'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../ui/Navbar';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        if (!code) {
            setError('Password reset code is missing.');
        }
    }, [code]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        if (!code) {
            setError('Password reset code is missing.');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, password, confirmPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message || 'Your password has been reset successfully. You can now log in.');
                setPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError(data.message || 'Failed to reset password.');
            }
        } catch (err) {
            console.error('Reset password request error:', err);
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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset Your Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your new password below.
                    </p>
                </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            {message && <p className="text-green-600 text-center text-sm">{message}</p>}
                            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                            <div className="flex flex-col mb-4 border-2 rounded-md border-gray-300">
                                <label htmlFor="password" className="sr-only">New Password</label>
                                <div className='w-full flex 
                                
                                items-center justify-center   focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 '>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="relative block w-80/100 md:w-90/100 p-2 placeholder-gray-500 text-gray-900  focus:outline-none bg-[#F5F5F5] focus:ring-[#03A0B4] focus:border-[#03A0B4] border-gray-300 focus:z-10  sm:text-sm border-1 rounded-l-sm border-r-2 "
                                        placeholder="New Password"
                                    />
                                    <div className='w-20/100 md:w-10/100 flex items-center justify-center p-2
                                 bg-[#F5F5F5]focus:outline-none focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 border-gray-300 rounded-r-md text-gray-900 '>
                                        <button type="button" className='cursor-pointer' onClick={() => setShowPassword((prev) => !prev)} tabIndex={-1}>
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>


                                </div>
                            </div>
                            <div className="flex flex-col mb-4 border-2 rounded-md border-gray-300">
                                <div className='w-full flex 
                                
                                items-center justify-center   focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 '>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="relative block w-80/100 md:w-90/100 p-2 placeholder-gray-500 text-gray-900  focus:outline-none bg-[#F5F5F5] focus:ring-[#03A0B4] focus:border-[#03A0B4] border-gray-300 focus:z-10  sm:text-sm border-1 rounded-l-sm border-r-2 "
                                        placeholder="Confirm Password"
                                    />
                                    <div className='w-20/100 md:w-10/100 flex items-center justify-center p-2
                                 bg-[#F5F5F5]focus:outline-none focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 border-gray-300 rounded-r-md text-gray-900 '>
                                        <button type="button" className='cursor-pointer' onClick={() => setShowPassword((prev) => !prev)} tabIndex={-1}>
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>


                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#03A0B4] hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 cursor-pointer transition ease-in-out duration-150"
                                >
                                    {isLoading ? 'Resetting...' : 'Reset Password'}
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