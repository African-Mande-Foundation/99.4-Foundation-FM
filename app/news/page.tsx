import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import TopNewsSlider from "../ui/News/TopNewsSlider";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45">
      <TopNewsSlider />
      </div>
      <Footer />
    </div>
  );
} 