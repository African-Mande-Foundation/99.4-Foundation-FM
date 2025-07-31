import Image from "next/image";
import HeroSlider from "./ui/slider";
import Navbar from "./ui/Navbar";
import { Mic} from "lucide-react";
import Podcasts from "./ui/podcasts";
import Link from "next/link";
import MovingLines from "./ui/random_lines";
import Testimonial from "./ui/testimonial";
import Contact from "./ui/contact";
import Footer from "./ui/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import Collection from "./ui/collection";
config.autoAddCss = false;
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      
      {/* Hero - Section*/}
      <div id="home" className="flex h-screen border-amber-400 border-0 ">
        <HeroSlider/>
        
      </div>
      <div className="flex flex-col min-h-screen border-red-600 border-0 bg-[#1b1b1b]">
        <Navbar/>
        <div id="podcasts" className="flex flex-col p-4 pt-6 md:pt-10 lg:px-20 xl:px-45 items-center justify-center w-full border-green-600 border-0">
          <div className="w-full px-3 mb-6">
            <p className="text-xs text-center text-[#828282]">Listen to top stories, voices, and music on 99.4 Foundation FM</p>
          </div>
          <div className="w-full md:w-2/3 lg:w-1/2 flex items-center mb-10 justify-around ">
            <div className="w-1/2 h-0 border-t-1 border-[#828282]"/>
            <Mic className="text-[#828282] mx-2"/>
            <div className="w-1/2 h-0 border-t-1 border-[#828282]"/>
          </div>
         
        <div className="flex flex-col w-full border-0 border-amber-400">
          <Podcasts/>
          </div>
          

        </div>
        <div id="collection" className=" flex flex-col p-4 pt-6 md:pt-10 lg:px-20 xl:px-45 items-center justify-center w-full border-green-600 border-0">
          <Collection/>
        </div>
        <div id="about" className=" flex flex-col p-4 pt-6 md:pt-10 lg:px-20 xl:px-45 items-center justify-center w-full border-green-600 border-0">
          <h2 className="text-3xl font-bold text-center mb-8">ABOUT OUR RADIO STATION</h2>
          <div className="text-justify text-white text-sm lg:text-base flex flex-col items-center justify-center gap-4 mb-8 ">
          <p>
            99.4 Foundation FM is the voice of the community, informing, inspiring, and empowering through the power of sound. As a project of Africano Mande Foundation, our station bridges the gap between information and transformation by delivering programs that reflect the real issues, stories, and hopes of the people we serve.
          </p>
          <p>
            Our broadcasts promote education, health awareness, peace-building, youth empowerment, and social inclusion. We give a platform to voices often unheard, rural communities, women, youth, and marginalized groups, creating space for dialogue, learning, and collective action.
          </p>
          <p>
            With a passionate team of local presenters, volunteers, and contributors, 99.4 Foundation FM goes beyond entertainment. We are a tool for change, connection, and community development. 
          </p>

          </div>

          <Link href="">
          <button className="cursor-pointer border-1 border-[#03A0B4] text-white text-sm md:text-base lg:text-xl px-4 py-2">Learn More</button>
          </Link>
          
        </div>

        <div id="programs" className=" flex flex-col p-4 pt-6 md:pt-10 lg:px-20 xl:px-45 items-center justify-center bg-[#0d0d0d] w-full border-green-600 border-0">
           <h2 className="text-3xl font-bold text-center mb-8">OUR PROGRAMS</h2>
           <div className="flex flex-col md:flex-row w-full">
           <div className="w-full md:w-1/2 lg:w-1/3">
            <MovingLines/>
           </div>
           <div className="hidden md:flex border-0 border-amber-500 md:w-1/2 lg:w-2/3"></div>
           </div>
           <div className="flex flex-col md:flex-row-reverse">
            <div className="mb-4 md:w-1/2">
              <Image
              src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fistockphoto-1212074366-612x612-removebg-preview.png?alt=media&token=14950853-ca77-46f5-962b-60f2e94ebe0d"
              alt="Programs Pic"
              width={200}
              height={200}
              className="w-2xl"/>
            </div>
            <div className="flex flex-col items-start justify-center gap-4 mb-8 md:w-1/2">
              <p className="text-justify text-white text-sm lg:text-base">
                At Africano Mande Foundation, our programs and initiatives are designed to respond to the real needs of the communities we serve From health outreach and education support to youth empowerment, media, and sustainable livelihoods, each initiative is built on inclusivity, collaboration, and long-term impact. Explore our ongoing efforts and discover how we're turning ideas into action.
              </p>
              <Link href="" className="">
              <button className="px-4 py-2 bg-[#03A0B4] text-white text-xs md:text-sm lg:text-base rounded cursor-pointer">
                Learn More
              </button>
              </Link>
            </div>
           </div>
        </div>
        <div id="testimonials" className=" flex flex-col p-4 pt-6 md:pt-10 lg:px-20 xl:px-45 items-center justify-center  w-full border-green-600 border-0">
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full mb-4 md:w-1/2">
              <Image
              src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2FIMG-20220323-WA0012.jpg?alt=media&token=181d64fc-c649-495a-95a9-1ff82a7643ee"
              alt="Testimonial"
              width={200}
              height={200}
              className="w-2xl md:w-xl lg:w-sm"
              />
            </div>
            <div className="flex flex-col border-0 border-amber-500 w-full md:w-1/2">
              <p className="text-xs mb-4 text-center text-[#828282]">What You Say About Us?</p>
              <h2 className="text-3xl font-bold text-center">TESTIMONIALS</h2>
              <Testimonial/>
            </div>
          </div>
        </div>
        <div id="contact" className="flex flex-col md:py-10 w-full border-green-600 border-0"
        style={{
          background:'url(https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-iriser-1707232.jpg?alt=media&token=4a4f9108-ccfc-4abe-bdaf-aff6bd9cda0c)',
          backgroundRepeat:'no-repeat',
          backgroundSize:'cover',
          backgroundPosition:'center',
        }} 
        >
          <div className="p-4 lg:pl-20 w-full xl:pl-45 items-center md:w-4/5 justify-center bg-black/50">
            <Contact/>
          </div>
          <div className="hidden md:flex w-1/5"></div>      

        </div>
        <Footer/>
        
      </div>

    </main>
  );
}
