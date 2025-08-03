
'use client';

import { faFacebookF, faInstagram, faTiktok, faXTwitter, faYoutube, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SocialMedia = () => {
  return (
    <div className="p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Our Social Networks</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
          <span>Facebook</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-pink-600">
          <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
          <span>Instagram</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <FontAwesomeIcon icon={faTiktok} className="w-6 h-6" />
          <span>Tiktok</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
          <span>Twitter</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
          <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
          <span>Youtube</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
          <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
          <span>Whatsapp</span>
        </Link>
      </div>
    </div>
  );
};

export default SocialMedia;
