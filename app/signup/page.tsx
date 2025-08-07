export default function SignUp(){
    return(
        <div className="w-screen h-screen">
        <div className="relative flex flex-col items-center w-95/100 h-95/100 justify-center">
            <div className="absolute top-0 left-0 z-30 p-4 w-full bg-white h-full">
                <h2 className="text-2xl text-black font-bold text-center">Sign Up</h2>
                <form>
                    <div className="flex flex-col mb-2 pt-2">
                        <p className="text-xs mb-2 text-left text-black">Email</p>
                        <input type="email" required className="w-full bg-gray-100 p-2 rounded-md border-2 border-gray-300 text-black text-xs" placeholder="Enter you email address"/>
                    </div>
                    <div className="flex flex-col mb-2 pt-2">
                        <p className="text-xs mb-2 text-left text-black">Password</p>
                        <input type="text" required className="w-full bg-gray-100 p-2 rounded-md border-2 border-gray-300 text-black text-xs" placeholder="Enter your new password"/>
                    </div>
                    <div className="flex flex-col mb-2 pt-2">
                        <p className="text-xs mb-2 text-left text-black">Confirm Password</p>
                        <input type="text" required className="w-full bg-gray-100 p-2 rounded-md border-2 border-gray-300 text-black text-xs" placeholder="Confirm your new password"/>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-[#03A0B4] text-white text-xs md:text-sm lg:text-base rounded cursor-pointer">Sign Up</button>
                </form>

            </div>
            <div className="absolute top-2 left-2 z-20 w-full bg-white/60 h-full"></div>
            <div className="absolute top-4 left-4 z-10 w-full bg-white/30 h-full"></div>
        </div>
        </div>
    )
}