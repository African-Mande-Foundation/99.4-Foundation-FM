import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45 mb-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Support Our Mission</h1>
          <div className="text-white space-y-8">
            <p className="text-lg">
              Your donation helps us continue our mission of serving the community through radio programming, 
              educational initiatives, and community development projects.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-3">$25</h3>
                <p>Supports one day of community programming</p>
                <button className="mt-4 bg-[#03A0B4] text-white px-6 py-2 rounded hover:bg-[#03FFDD] transition-colors">
                  Donate $25
                </button>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-3">$50</h3>
                <p>Helps fund youth empowerment programs</p>
                <button className="mt-4 bg-[#03A0B4] text-white px-6 py-2 rounded hover:bg-[#03FFDD] transition-colors">
                  Donate $50
                </button>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-3">$100</h3>
                <p>Contributes to health outreach initiatives</p>
                <button className="mt-4 bg-[#03A0B4] text-white px-6 py-2 rounded hover:bg-[#03FFDD] transition-colors">
                  Donate $100
                </button>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Other Amount</h3>
              <p className="mb-4">Choose your own donation amount to support our community programs.</p>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="number" 
                  placeholder="Enter amount" 
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
                />
                <button className="bg-[#03A0B4] text-white px-6 py-2 rounded hover:bg-[#03FFDD] transition-colors">
                  Donate
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