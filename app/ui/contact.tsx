export default function Contact() {
    return(
        
            <form className="flex flex-col-reverse md:flex-row  w-full mb-10">
                <div className="relative flex flex-col items-center w-95/100 md:w-1/2 h-[350px] justify-center">
                    <div className="absolute top-0 left-0 z-30 p-4 w-full bg-white h-full">
                        <div className="flex flex-col mb-2 pt-2">
                        <p className="text-xs mb-2 text-left text-black">Full Name</p>
                        <input type="text" required className="w-full bg-gray-100 p-2 rounded-md border-2 border-gray-300 text-black text-xs" />
                        </div>
                        <div className="flex flex-col mb-2 pt-2">
                        <p className="text-xs mb-2 text-left text-black">Email</p>
                        <input type="email" required className="w-full bg-gray-100 p-2 rounded-md border-2 border-gray-300 text-black text-xs" />
                        </div>
                        <div className="flex flex-col mb-2 pt-2">
                        <p className="text-xs mb-2 text-left text-black">Message</p>
                        <textarea 
                            required 
                            maxLength={1000}
                            placeholder="Enter your message (max 250 words)"
                            className="w-full bg-gray-100 p-2 rounded-md h-32 resize-none border-2 border-gray-300 text-black text-xs" 
                        />
                        </div>
                    </div>
                    <div className="absolute top-2 left-2 z-20 w-full bg-white/60 h-full"></div>
                    <div className="absolute top-4 left-4 z-10 w-full bg-white/30 h-full"></div>
                    
                </div>
                <div className="flex flex-col mb-8 md:mb-0 md:w-1/2 items-center justify-center gap-4">
                    <h2 className="text-3xl font-bold text-center">CONTACT US</h2>
                    <p className="text-xs mb-4 text-center text-white">Stay connected with us</p>
                    <button type="submit" className="px-4 py-2 bg-[#03A0B4] text-white text-xs md:text-sm lg:text-base rounded cursor-pointer">Send Message</button>

                </div>
            </form>
        
    );
}