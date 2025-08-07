import React from 'react';
import Image from 'next/image';

const CommunityHighlights: React.FC = () => {
    return (
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-md">
            <Image
                src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-olly-3768709.jpg?alt=media&token=c23fa750-b11a-4057-abac-e3bb2208c3f6"
                alt="Community Highlights"
                fill
                className="object-cover"
                priority
                sizes="55vw"
            />

            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center text-white p-6">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 leading-tight drop-shadow-md">
                    LATEST UPDATES, STORIES, AND COMMUNITY HIGHLIGHTS
                </h1>
                <p className="text-sm sm:text-base md:text-lg max-w-3xl drop-shadow-md">
                    Stay connected with the latest updates, stories, and community highlights from across the globe.
                    Timely, relevant, and impactful information that matters to you.
                </p>
            </div>
        </div>
    );
};

export default CommunityHighlights;
