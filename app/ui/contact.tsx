'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string | null }>({ type: null, message: null });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: null, message: null });

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', message: data.message });
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus({ type: 'error', message: data.message || 'Failed to send message.' });
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            setStatus({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (status.message) {
            const timer = setTimeout(() => {
                setStatus({ type: null, message: null });
            }, 2000); // 2 seconds

            return () => clearTimeout(timer);
        }
    }, [status.message]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col-reverse md:flex-row w-full mb-10">
            <div className="relative flex flex-col items-center w-95/100 md:w-1/2 h-[350px] justify-center">
                <div className="absolute top-0 left-0 z-30 p-4 w-full bg-white h-full">
                    <div className="flex flex-col mb-2 pt-2">
                        <p className="text-xs mb-2 text-left text-black">Full Name</p>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-100 p-2 rounded-md border-2 border-gray-300 text-black text-xs"
                        />
                    </div>
                    <div className="flex flex-col mb-2 pt-2">
                        <p className="text-xs mb-2 text-left text-black">Email</p>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-100 p-2 rounded-md border-2 border-gray-300 text-black text-xs"
                        />
                    </div>
                    <div className="flex flex-col mb-2 pt-2">
                        <p className="text-xs mb-2 text-left text-black">Message</p>
                        <textarea
                            required
                            maxLength={1000}
                            placeholder="Enter your message (max 250 words)"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-gray-100 p-2 rounded-md h-32 resize-none border-2 border-gray-300 text-black text-xs"
                        />
                    </div>
                </div>
                <div className="absolute top-2 left-2 z-20 w-full bg-white/60 h-full"></div>
                <div className="absolute top-4 left-4 z-10 w-full bg-white/30 h-full"></div>
            </div>

            <div className="flex flex-col mb-8 md:mb-0 md:w-1/2 items-center justify-center gap-4">
                <h2 className="text-3xl font-bold text-center">CONTACT US</h2>
                <p className="text-xs mb-4 text-center text-white">Stay connected with us</p>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-[#03A0B4] text-white text-xs md:text-sm lg:text-base rounded cursor-pointer disabled:opacity-50"
                >
                    {isLoading ? 'Sending...' : 'Send Message'}
                </button>

                {status.message && (
                    <div
                        className={`mt-4 w-4/5 px-4 py-2 rounded-md text-sm text-center font-semibold
            ${status.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}
                    >
                        {status.message}
                    </div>
                )}
            </div>
        </form>
    );
}