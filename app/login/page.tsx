'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../ui/Navbar';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();
    const searchParams = useSearchParams()

    const rawCallbackUrl = searchParams.get('callbackUrl');
    const callbackUrl = rawCallbackUrl && !rawCallbackUrl.includes('/register') ? rawCallbackUrl : '/';


    useEffect(() => {
        if (status === 'authenticated') {
            setIsLoading(true)
            router.replace(callbackUrl);
        }
    }, [status, router, callbackUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await handleLogin(email, password);
        } catch (err) {
            setIsLoading(false);
            setError('Login failed');
        }
    }

    const handleLogin = async (identifier: string, password: string) => {
        const res = await signIn("credentials", {
            identifier,
            password,
            redirect: false,
        });
        if (res?.error) {
            setError(res.error)
            setIsLoading(false)
        } else {
            window.location.href = "/";
        }
    };
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');
        try {
            await signIn('google', { redirect: false });
        } catch (err) {
            setIsLoading(false);
            setError('Google sign-in failed.');
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
                                Log In
                            </h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                                    className=" relative block w-full p-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none bg-[#F5F5F5] focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="flex flex-col mb-4 border-2 rounded-md border-gray-300">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className='w-full flex 
                                
                                items-center justify-center   focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 '>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="relative block w-80/100 md:w-90/100 p-2 placeholder-gray-500 text-gray-900  focus:outline-none bg-[#F5F5F5] focus:ring-[#03A0B4] focus:border-[#03A0B4] border-gray-300 focus:z-10  sm:text-sm border-1 rounded-l-sm border-r-2 "
                                        placeholder="Password"
                                    />
                                    <div className='w-20/100 md:w-10/100 flex items-center justify-center p-2
                                 bg-[#F5F5F5]focus:outline-none focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 border-gray-300 rounded-r-md text-gray-900 '>
                                        <button type="button" className='cursor-pointer' onClick={() => setShowPassword((prev) => !prev)} tabIndex={-1}>
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>


                                </div>
                            </div>


                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                
                                <div className="text-sm">
                                    <a href="forgot-password" className="font-medium text-cyan-600 hover:text-cyan-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#03A0B4] hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 cursor-pointer"
                                >
                                    {isLoading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button aria-label="Continue with Google"
                                    onClick={handleGoogleSignIn} disabled={isLoading} className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-[#026C79] text-sm font-medium text-white hover:bg-gray-50 hover:text-black cursor-pointer">
                                    <Image src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Ficons8-google-48.png?alt=media&token=b423d98b-7fca-4535-a5d8-3ef2e849680d" alt="google_icon" width={30} height={30} className='shadow-2xl shadow-black' />

                                    <span className="ml-4">Continue with Google</span>
                                </button>
                            </div>
                        </div>
                        <div className="text-sm mt-6 flex items-center justify-center gap-2 w-full text-center">
                            <p className='text-black'>Don't have an account?</p>
                            <Link href="/register" className="font-medium text-cyan-600 hover:text-cyan-500">
                                Sign up
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