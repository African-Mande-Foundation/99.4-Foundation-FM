
import Image from 'next/image';

const categories = [
  {
    title: 'Community News',
    description: 'Stories and updates that affect our neighborhoods and people.',
    image: 'https://source.unsplash.com/random/400x300?community',
  },
  {
    title: 'Health & Wellness',
    description: 'Tips and news on staying healthy in mind and body.',
    image: 'https://source.unsplash.com/random/400x300?health',
  },
  {
    title: 'Education & Youth',
    description: 'Spotlighting young voices and educational initiatives.',
    image: 'https://source.unsplash.com/random/400x300?education',
  },
];

export default function CategoryHighlights() {
  return (
    <section className="bg-white py-10 px-4 md:px-16">
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
