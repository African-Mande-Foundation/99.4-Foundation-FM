import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

export default function JoinLivePage() {
  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Schedule</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>06:00 - 09:00</span>
                    <span>Morning Show</span>
                  </div>
                  <div className="flex justify-between">
                    <span>09:00 - 12:00</span>
                    <span>Community News</span>
                  </div>
                  <div className="flex justify-between">
                    <span>12:00 - 15:00</span>
                    <span>Health & Education</span>
                  </div>
                  <div className="flex justify-between">
                    <span>15:00 - 18:00</span>
                    <span>Youth Programs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>18:00 - 21:00</span>
                    <span>Evening Entertainment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>21:00 - 24:00</span>
                    <span>Late Night Talk</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Contact Studio</h3>
                <p className="mb-4">
                  Want to share your story or request a song? Contact our studio team.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Phone:</strong> +123 456 7890</p>
                  <p><strong>Email:</strong> studio@foundationfm.com</p>
                  <p><strong>WhatsApp:</strong> +123 456 7890</p>
                </div>
                <button className="mt-4 bg-[#03A0B4] text-white px-6 py-2 rounded hover:bg-[#03FFDD] transition-colors">
                  Contact Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 