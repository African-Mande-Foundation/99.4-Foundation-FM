'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import Link from 'next/link';
import { signIn, getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingBar from '../ui/LoadingBar';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
    const [newsletterLoading, setNewsLetterLoading] = useState(false)
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


            router.push("/");
        } catch (err) {
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
        } catch (err) {
            setIsLoading(false);
            setError('Google sign-in failed.');
        }
    };

    useEffect(() => {
        const checkAndSubscribe = async () => {
            if (status === 'authenticated') {
                const shouldSubscribe = JSON.parse(localStorage.getItem('subscribeToNewsletter') || 'false');

                if (shouldSubscribe) {
                    setNewsLetterLoading(true);
                    try {
                        await fetch('/api/subscribe-newsletter', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                    } catch (err) {
                        setNewsLetterLoading(false);
                        console.error('Newsletter subscription failed.');
                    } finally {
                        localStorage.removeItem('subscribeToNewsletter');
                        router.replace('/');
                    }
                } else {
                    router.replace('/');
                }
            }
        };

        checkAndSubscribe();
    }, [status, session, router]);

    if (newsletterLoading) {
        return (
            <>
                <Navbar />
                <LoadingBar />
                <h5>Redirecting</h5>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="full-name" className="sr-only">Full name</label>
                                    <input
                                        id="full-name"
                                        name="full-name"
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                        placeholder="Full name"
                                    />
                                </div>
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
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="sr-only">Confirm password</label>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                        placeholder="Confirm password"
                                    />
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
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition ease-in-out duration-150"
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
                                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150">
                                    <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-gray-600" />
                                    <span className="ml-3">Sign up with Google</span>
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 text-sm text-center">
                            <Link href="/login" className="font-medium text-cyan-600 hover:text-cyan-500">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
