import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

export default function JoinLivePage() {
  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45 mb-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Join Us Live</h1>
          <div className="text-white space-y-8">
            <p className="text-lg">
              Tune in to 99.4 Foundation FM for live programming, community discussions, 
              and the latest news from our region.
            </p>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Live Stream</h3>
              <div className="bg-black h-64 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 animate-pulse"></div>
                  <p className="text-gray-400">Live Stream Coming Soon</p>
                </div>
              </div>
              <p className="text-gray-300">
                Our live stream will be available here soon. In the meantime, 
                tune in to 99.4 FM on your radio.
              </p>
            </div>
            

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 