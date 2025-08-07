// components/FeaturedArticles.tsx

'use client';

import Image from 'next/image';

export default function FeaturedArticles() {
  return (
    <section className="px-4 py-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Peace & Social Issues</h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Explore stories, articles, and updates related to peace building, conflict resolution, and social development in our communities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Main Article */}
          <div className="col-span-1">
            <div className="shadow-lg hover:shadow-xl transition duration-300">
              <Image
                src="/images/article1.jpg"
                alt="Main article"
                width={600}
                height={400}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Empowering Local Communities</h3>
                <p className="text-sm text-gray-600">
                  How grassroots initiatives are fostering peace in post-conflict zones.
                </p>
              </div>
            </div>
          </div>

          {/* Middle: Two stacked Articles */}
          <div className="col-span-1 flex flex-col gap-6">
            {[1, 2].map((id) => (
              <div key={id} className="flex gap-4 shadow hover:shadow-md transition">
                <Image
                  src={`/images/article${id + 1}.jpg`}
                  alt={`Article ${id}`}
                  width={120}
                  height={80}
                  className="object-cover w-32 h-24"
                />
                <div>
                  <h4 className="font-semibold text-md">Social Programs for Youth</h4>
                  <p className="text-sm text-gray-600">
                    Engaging youth in peacebuilding activities across the region.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Categories and Grid */}
          <div className="col-span-1 space-y-6">
            {/* Categories */}
            <div>
              <h5 className="text-lg font-semibold mb-2">Explore Categories</h5>
              <ul className="space-y-1 text-blue-600 text-sm">
                <li><a href="#">Peace Building</a></li>
                <li><a href="#">Conflict Resolution</a></li>
                <li><a href="#">Community Voices</a></li>
                <li><a href="#">Youth Engagement</a></li>
              </ul>
            </div>

            {/* Thumbnails */}
            <div>
              <h5 className="text-lg font-semibold mb-2">Recent Snippets</h5>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Image
                    key={i}
                    src={`/images/thumb${i}.jpg`}
                    alt={`Thumb ${i}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-20"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 