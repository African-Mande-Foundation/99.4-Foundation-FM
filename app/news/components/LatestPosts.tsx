'use client';

import React from 'react';
import Image from 'next/image';

const LatestPosts: React.FC = () => {
    return (
        <section className="px-4 sm:px-8 md:px-12 lg:px-16 py-10">
            <div className="flex items-center gap-4 mb-6">
                <h2 className="bg-black text-white text-2xl font-bold px-3 py-1">Latest Posts</h2>
                <p className="text-sm text-gray-600">From our blog</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="relative w-full md:w-1/2 aspect-[3/2]">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-olly-771175.jpg?alt=media&token=658ff218-0a07-45a3-8f05-791126a1c240"
                        alt="Blog Image 1"
                        fill
                        className="object-cover rounded"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="relative w-full md:w-1/2 aspect-[3/2]">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-olly-3800507.jpg?alt=media&token=b565164d-623e-4059-9495-6eaae9affefa"
                        alt="Blog Image 2"
                        fill
                        className="object-cover rounded"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>


            <div className="text-gray-800 space-y-6">
                <p className="border-b border-black pb-6">
                    Fresh stories, updates, and insights from our team, sharing voices from the field, community impact, and behind-the-scenes moments at AMFM Radio. At AMFM Radio, we believe that every voice holds the power to lead to change, to heal, and to inspire. By sharing real stories from the ground, we shine a light on everyday heroes, community struggles, and the dreams that bring people together across borders.
                </p>
                <p>
                    Whether it’s a mother speaking on health, a youth sharing innovation, or a leader calling for peace, their stories create ripples of impact that reach far beyond the microphone. When we listen, we grow.
                </p>
                <p>
                    When we share, we build. Our team isn’t just behind the mic, they’re in the field, in the heart of communities, and deeply connected to the stories they share. Through their unique perspectives, lived experiences, and passion for change, they bring challenges to breakthrough moments.
                </p>
            </div>
        </section>
    );
};

export default LatestPosts;
