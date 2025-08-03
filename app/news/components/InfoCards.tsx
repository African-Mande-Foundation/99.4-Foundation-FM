'use client';

import Image from 'next/image';

const cards = [
    {
        title: 'COMMUNITY NEWS',
        description:
            'Updates on local events, village stories, cultural happenings, and grassroots activities.',
        image: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756768.jpg?alt=media&token=e776768b-4691-4347-922d-0af8bf155208',
    },
    {
        title: 'HEALTH & WELLNESS',
        description:
            'News on health campaigns, medical outreaches, public health updates, and awareness days.',
        image: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756945.jpg?alt=media&token=454a5f6f-4b7e-4310-b6eb-1b003d14869f',
    },
    {
        title: 'EDUCATION & YOUTH',
        description:
            'Stories on school programs, youth initiatives, trainings, and student achievements.',
        image: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756993.jpg?alt=media&token=ecda6a3f-cd2d-4715-85b6-1099632bec55',
    },
];

const InfoCards = () => {
    return (
        <section className="w-full px-4 py-10 bg-white " >
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card, index) => (
                    <div key={index} className="text-center">
                        <div className="w-full h-60 relative mb-4">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                        <p className="text-sm text-gray-700">{card.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InfoCards;
