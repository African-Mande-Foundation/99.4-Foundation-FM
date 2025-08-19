import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import  Link  from "next/link";

export default function Footer() {
    return(
        <div className="bg-[#026C79] text-white">
        <div className=" flex flex-col p-4 pt-6 md:pt-10 lg:px-20 xl:px-45 items-center justify-center bg-[#026C79] w-full border-green-600 border-0">
            <div className="flex flex-col md:flex-row items-start justify-center w-full ">
                <div className="flex flex-col lg:flex-row items-start justify-center w-full md:w-1/2 border-amber-400 border-0">
                    <div className="flex flex-col gap-4 w-full lg:w-1/2 mb-16">
                        <h2 className="text-xl font-bold">Learn More</h2>
                        <Link href=""><p className="text-sm underline">Africano Mande Foundation</p></Link>
                        <Link href="/donate">
                        <button className="px-4 py-2 bg-white text-[#03A0B4] font-bold text-lg md:text-sm lg:text-base cursor-pointer">
                            Donate
                        </button>
                        </Link>
                        <div className="flex items-center justify-start gap-4 w-full">
                            <Link href=""><FontAwesomeIcon icon={faFacebookF} size="sm" className="w-6 h-6" /></Link>
                            <Link href=""><FontAwesomeIcon icon={faInstagram} size="sm" className="w-6 h-6" /></Link>
                            <Link href=""><FontAwesomeIcon icon={faTiktok} size="sm" className="w-6 h-6" /></Link>
                            <Link href=""><FontAwesomeIcon icon={faXTwitter} size="sm" className="w-6 h-6" /></Link>
                            <Link href=""><FontAwesomeIcon icon={faYoutube} size="sm" className="w-6 h-6" /></Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full lg:w-1/2 mb-16">
                        <h2 className="text-xl font-bold">Head Office</h2>
                        <p className="text-sm">Hillside, Maridi, South Sudan </p>

                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-start justify-around w-full md:w-1/2 border-amber-400 border-0  ">
                    <div className="flex flex-col gap-4 w-full lg:w-1/2 mb-16">
                        <h2 className="text-xl font-bold">Operations Office</h2>
                        <p className="text-sm">Greater Maridi</p>
                    </div>
                    <div className="flex flex-col gap-4 w-full lg:w-1/2 mb-16">
                        <h2 className="text-xl font-bold">Contact Us</h2>
                        <div className="flex items-center justify-start gap-2">
        <FontAwesomeIcon icon={faPhone} size="sm" className="w-6 h-6" />
        <p className="text-sm">+211 929 756 681</p>
    </div>
    <div className="flex items-center justify-start gap-2">
        <FontAwesomeIcon icon={faWhatsapp} size="sm" className="w-6 h-6" />
        <p className="text-sm">+211 919 599 084</p>
    </div>
    <div className="flex items-center justify-start gap-2">
        <FontAwesomeIcon icon={faEnvelope} size="sm" className="w-6 h-6" />
        <p className="text-sm">info@africanomandefoundation.org</p>
    </div>
                    </div>
                </div>

            </div>
           
        </div>
         <div className="border-t-1 border-white flex flex-col p-4 pt-6 md:pt-10 lg:px-20 xl:px-45 items-center justify-center bg-[#026C79]  w-full">
                <p className="text-xs">© 2025 </p>
                <p className="text-xs">99.4 Foundation FM. All rights reserved.</p>
            </div>
        </div>

    ); 
}