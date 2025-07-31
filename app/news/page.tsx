import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Latest News</h1>
          <div className="text-white space-y-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Community Health Fair Success</h3>
              <p className="text-gray-300 mb-2">December 15, 2024</p>
              <p>
                Our recent health fair brought together over 200 community members for health screenings, 
                education, and wellness activities. The event was a great success in promoting health awareness.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">New Youth Program Launched</h3>
              <p className="text-gray-300 mb-2">December 10, 2024</p>
              <p>
                We're excited to announce the launch of our new youth leadership program, designed to 
                empower young people with skills and confidence for community leadership.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Radio Station Expansion</h3>
              <p className="text-gray-300 mb-2">December 5, 2024</p>
              <p>
                Foundation FM is expanding its reach with new equipment and extended broadcasting hours 
                to better serve our growing community.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 