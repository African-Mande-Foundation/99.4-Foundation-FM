'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../ui/Navbar';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import LoadingBar from '../ui/LoadingBar';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
    const [newsletterLoading, setNewsLetterLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {status } = useSession();

    const searchParams = useSearchParams()

    const rawCallbackUrl = searchParams.get('callbackUrl');
    const callbackUrl = rawCallbackUrl && !rawCallbackUrl.includes('/login') ? rawCallbackUrl : '/';

    useEffect(() => {
        if (status === 'authenticated') {
            setIsLoading(true)
            router.replace(callbackUrl);
        }
    }, [status, router , callbackUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, subscribeToNewsletter }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Registration failed");
                setIsLoading(false);
                return;
            }


            const signInRes = await signIn("credentials", {
                identifier: email,
                password,
                redirect: false,
            });

            if (signInRes?.error) {
                setError("Auto-login failed: " + signInRes.error);
                setIsLoading(false);
                return;
            }


            router.push(callbackUrl);

        } catch {
            setIsLoading(false);
            setError("An unexpected error occurred.");
        }
    };
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');
        try {

            localStorage.setItem('subscribeToNewsletter', JSON.stringify(subscribeToNewsletter));
            localStorage.setItem('googleRegistration', 'true');

            const signInRes = await signIn('google', { redirect: false });
            if (signInRes?.error) {
                setError('Google sign-in failed.');
                setIsLoading(false);
                return;
            }
        } catch {
            setIsLoading(false);
            setError('Google sign-in failed.');
        }
    };

    useEffect(() => {
      const checkAndSubscribe = async () => {
        if (status !== 'authenticated') return;
    
        const shouldSubscribe = JSON.parse(localStorage.getItem('subscribeToNewsletter') || 'false');
        if (shouldSubscribe) {
          setNewsLetterLoading(true);
          try {
            await fetch('/api/subscribe-newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
          } catch {
            console.error('Newsletter subscription failed.');
          } finally {
            setNewsLetterLoading(false);
            localStorage.removeItem('subscribeToNewsletter');
          }
        }
    
        router.replace(callbackUrl); 
      };
    
      checkAndSubscribe();
    }, [status, router, callbackUrl]);


    if (newsletterLoading) {
        return (
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
              <LoadingBar className="w-30 h-30" />
            </div>
        
          </div>
        )
    }

    return (
        <div className="w-screen h-screen">
            <Navbar />
            <div className="relative flex flex-col items-center w-95/100 h-85/100 justify-center">
               <div className="absolute top-0 left-0 z-30 p-4 w-full bg-white h-full items-center justify-center flex">
                   <div className='w-[280px] md:w-[400px]'>
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign Up
                        </h2>
                    </div>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                            <div className="space-y-4">
                                <div className="flex flex-col mb-2 pt-2">
                                    <label htmlFor="full-name" className="sr-only">Full name</label>
                                    <input
                                        id="full-name"
                                        name="full-name"
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="relative block w-full p-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none bg-[#F5F5F5] focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 sm:text-sm"
                                        placeholder="Full name"
                                    />
                                </div>
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
                                 <div className="flex flex-col mb-4 border-2 rounded-md border-gray-300">
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <div className='w-full flex 
                                
                                items-center justify-center   focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 '>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="relative block w-80/100 md:w-90/100 p-2 placeholder-gray-500 text-gray-900  focus:outline-none bg-[#F5F5F5] focus:ring-[#03A0B4] focus:border-[#03A0B4] border-gray-300 focus:z-10  sm:text-sm border-1 rounded-l-sm border-r-2"
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

                                  <div className="flex flex-col mb-4 border-2 rounded-md border-gray-300">
                                    <label htmlFor="confirm-password" className="sr-only">Confirm password</label>
                                    <div className='w-full flex 
                                
                                items-center justify-center   focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 '>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="relative block w-80/100 md:w-90/100 p-2 placeholder-gray-500 text-gray-900  focus:outline-none bg-[#F5F5F5] focus:ring-[#03A0B4] focus:border-[#03A0B4] border-gray-300 focus:z-10  sm:text-sm border-1 rounded-l-sm border-r-2"
                                        placeholder="Confirm password"
                                    />
                                    <div className='w-20/100 md:w-10/100 flex items-center justify-center p-2
                                 bg-[#F5F5F5]focus:outline-none focus:ring-[#03A0B4] focus:border-[#03A0B4] focus:z-10 border-gray-300 rounded-r-md text-gray-900 '>
                                     <button type="button" className='cursor-pointer' onClick={() => setShowPassword((prev) => !prev)} tabIndex={-1}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                </div>
                                </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="subscribe-newsletter"
                                    name="subscribe-newsletter"
                                    type="checkbox"
                                    checked={subscribeToNewsletter}
                                    onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
                                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                                />
                                <label htmlFor="subscribe-newsletter" className="ml-2 block text-sm text-gray-900">
                                    Subscribe to our newsletter
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#03A0B4] hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 cursor-pointer transition ease-in-out duration-150"
                                >
                                    {isLoading ? 'Signing up...' : 'Sign up'}
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
                                <button aria-label="Sign in with Google"
                                    onClick={handleGoogleSignIn} disabled={isLoading}
                                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-[#026C79] text-sm font-medium text-white hover:bg-gray-50 hover:text-black cursor-pointer transition ease-in-out duration-150">
                                    <Image src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Ficons8-google-48.png?alt=media&token=b423d98b-7fca-4535-a5d8-3ef2e849680d" alt="google_icon" width={30} height={30} className='shadow-2xl shadow-black' />
                                    <span className="ml-3">Continue with Google</span>
                                </button>
                            </div>
                        </div>
                        <div className="text-sm mt-6 flex items-center justify-center gap-2 w-full text-center">
                        <p className='text-black'>Already have an account?</p>
                            <Link href="/login" className="font-medium text-cyan-600 hover:text-cyan-500">
                                 Sign in
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