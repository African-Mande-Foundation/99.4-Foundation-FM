'use client';

import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faXTwitter,
  faYoutube,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SocialMedia = () => {
  return (
    <div className="p-6 border-t-8 border-b-8 border-black mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900  pb-2">Our Social Networks</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
          <span>Facebook</span>
        </Link>
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-pink-600">
          <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
          <span>Instagram</span>
        </Link>
        <Link
          href="https://www.tiktok.com/@99.4foundationfm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-700 hover:text-black"
        >
          <FontAwesomeIcon icon={faTiktok} className="w-6 h-6" />
          <span>TikTok</span>
        </Link>
        <Link
          href="https://x.com/foundationfm_99"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-700 hover:text-black"
        >
          <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
          <span>Twitter</span>
        </Link>
        <Link
          href="https://www.youtube.com/@FoundationFM-99.4"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
        >
          <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
          <span>YouTube</span>
        </Link>
        <Link
          href="https://www.linkedin.com/in/foundation-fm-b00b20374"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faLinkedinIn} className="w-6 h-6" />
          <span>LinkedIn</span>
        </Link>
      </div>
    </div>
  );
};

export default SocialMedia;
