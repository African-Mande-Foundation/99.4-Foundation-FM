import Navbar from "../ui/Navbar";

import PhotoGallery from "../ui/PhotoGallery";

export default function MediaPage() {
  return (
    <div className=" min-h-screen md:h-screen bg-white">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45">
        <div className="max-w-7xl mx-auto my-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Media Gallery</h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Explore our collection of photos showcasing our community events, programs, 
              and initiatives that make a difference in South Sudan.
            </p>
          </div>
          
          <PhotoGallery />
        </div>
      </div>
    
    </div>
  );
} 