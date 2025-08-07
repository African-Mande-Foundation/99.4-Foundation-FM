'use client';

import Image from 'next/image';

const PeaceAndSocialIssues = () => {
    return (
        <section className="px-4 py-10 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Section Heading */}
                <div className="mb-8 flex gap-4 items-center">
                    <div className="text-white px-4 py-2 rounded-md">
                        <h2 className="bg-black text-white text-2xl font-bold px-3 py-1">Peace & Social Issues</h2>
                    </div>
                    <p className="text-gray-700">
                        With coverage on peace-building efforts
                    </p>
                </div>


                {/* Image Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    {/* Card 1 */}
                    <div>
                        <div className="relative w-full h-64 mb-4">
                            <Image
                                src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fimages.jpeg?alt=media&token=4bef070c-596f-4e03-86c7-f494156b6403"
                                alt="Mr. Sami Charles Mande"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover rounded-md"
                            />

                        </div>
                        <h3 className="font-semibold">Mr. Sami Charles Mande</h3>
                        <p className="italic text-sm mb-2">Executive Director, AMF</p>
                        <p className="text-sm text-gray-700">
                            Coverage on peace-building efforts, conflict resolution, human rights, and advocacy.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div>
                        <div className="relative w-full h-64 mb-4">
                            <Image
                                src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fimages.jpeg?alt=media&token=4bef070c-596f-4e03-86c7-f494156b6403"
                                alt="Women & Gender Empowerment"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover rounded-md"
                            />
                        </div>
                        <h3 className="font-semibold">Women & Gender Empowerment</h3>
                        <p className="text-sm text-gray-700">
                            Stories focused on women’s voices, gender equality, and empowerment campaigns.
                        </p>
                    </div>
                </div>

                {/* Paragraph Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-800 leading-relaxed">
                    <p>
                        At AMF FM Radio, we shine a light on stories that promote peace-building, conflict resolution, and social harmony. Our coverage highlights the efforts of many individuals and communities working to heal divisions and prevent violence. We give voice to those advocating for human rights, justice, and inclusive development, especially in underrepresented areas.
                    </p>
                    <p>
                        At AMF FM Radio, we are committed to amplifying women’s roles and achievements. Our stories help play a role in equalizing women’s rights, increasing opportunities, and showcasing their impact in families and society. These narratives reflect the ongoing fight for dignity and opportunity.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PeaceAndSocialIssues;
