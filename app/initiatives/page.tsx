import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import Image from "next/image";
import { Triangle } from "lucide-react";

export default function InitiativesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px] w-full">
        {/* Placeholder for your image */}
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fistockphoto-1205763729-612x612.jpg?alt=media&token=260d540d-f45f-4265-8af3-1e954fe4ec51"
            alt="Community Voice"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay Banner with integrated triangle */}
        
        <div className=" mx-5 md:mx-20 xl:mx-45 absolute bottom-0 left-0 right-0 bg-black/50 bg-opacity-80 py-6">
          <div className="text-center">
            <h1 className="text-white text-3xl lg:text-4xl font-bold uppercase tracking-wide">OUR INITIATIVE</h1>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-black/50 py-16 px-4 lg:px-20 relative mx-5 md:mx-20 xl:mx-45" 
           style={{
             clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)'
           }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-white text-center text-lg leading-relaxed">
            At 99.4 Foundation FM, we believe that radio is more than sound, it's a tool for transformation. 
            Our initiatives are designed to inform, inspire, and empower communities across South Sudan. 
            Through every broadcast, partnership, and outreach program, we bring real stories to life and 
            amplify voices that matter.
          </p>
        </div>
      </div>

      {/* Key Initiatives Section */}
      <div className="py-16 px-4 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">KEY INITIATIVES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Youth Voices for Peace */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">YOUTH VOICES FOR PEACE</h3>
              <p className="text-gray-600 leading-relaxed">
                Empowering young people through radio dialogues, leadership training, and community 
                engagement programs that promote peace and reconciliation across South Sudan.
              </p>
            </div>

            {/* Education on Air */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">EDUCATION ON AIR</h3>
              <p className="text-gray-600 leading-relaxed">
                Broadcasting educational content and radio lessons to reach learners in remote areas, 
                providing access to quality education where traditional schools are unavailable.
              </p>
            </div>

            {/* Voices Without Borders */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">VOICES WITHOUT BORDERS</h3>
              <p className="text-gray-600 leading-relaxed">
                A media exchange program that connects grassroots storytellers and community journalists 
                across different regions, sharing stories and experiences that bridge cultural divides.
              </p>
            </div>

            {/* Women's Voices Rising */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">WOMEN'S VOICES RISING</h3>
              <p className="text-gray-600 leading-relaxed">
                Amplifying the stories and experiences of women in South Sudan, providing platforms 
                for female voices to be heard and creating opportunities for women's leadership.
              </p>
            </div>

            {/* Community Health Hour */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">COMMUNITY HEALTH HOUR</h3>
              <p className="text-gray-600 leading-relaxed">
                Collaborating with local health organizations to broadcast life-saving information, 
                health tips, and connect communities with essential healthcare resources.
              </p>
            </div>

            {/* Digital Literacy Program */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">DIGITAL LITERACY PROGRAM</h3>
              <p className="text-gray-600 leading-relaxed">
                Teaching digital skills and media literacy to help communities navigate the modern 
                information landscape and participate in digital conversations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fresh Stories Section */}
      <div className="bg-gray-100 py-16 px-4 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">FRESH STORIES FROM THE HEART OF AMF</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            These are the stories that reflect the spirit of our work, from the voices of women rising, 
            to youth leading change, to communities coming together through the power of radio. Every story 
            shared is a step toward awareness, healing, and transformation across South Sudan.
          </p>
          <button className="bg-[#03A0B4] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
} 