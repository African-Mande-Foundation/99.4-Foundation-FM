'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/');
        }
    }, [status, router]);

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
            console.error(res.error);
        } else {
            window.location.href = "/";
        }
    };
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');
        try {
            await signIn('google', { redirect: false, callbackUrl: '/?subscribe=false' });
        } catch (err) {
            setIsLoading(false);
            setError('Google sign-in failed.');
        }
    };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <div className="text-sm">
                                    <Link href="/forgot-password" className="font-medium text-cyan-600 hover:text-cyan-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition ease-in-out duration-150"
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
                                <button aria-label="Sign in with Google"
                                    onClick={handleGoogleSignIn} disabled={isLoading}
                                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150">
                                    <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
                                    <span className="ml-3">Sign in with Google</span>
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 text-sm text-center">
                            <Link href="/register" className="font-medium text-cyan-600 hover:text-cyan-500">
                                Don't have an account? Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

}