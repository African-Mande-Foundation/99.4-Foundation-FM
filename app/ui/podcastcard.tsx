
import Image from "next/image"


type PodcastCardProps = {
    title:string;
    thumbnailUrl:string;
    youtubeUrl:string;
    onClick?: () => void;
}

export default function PodcastCard ({
    title,
    thumbnailUrl,
    youtubeUrl,
    onClick,
}: PodcastCardProps) {
    return(
<div
            className="relative lg:w-[400px] lg:h-[225px] w-[350px] h-[250px] rounded overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 border-0 border-red-500"
            onClick={onClick}
            tabIndex={-1}
        >
            <Image
                src={thumbnailUrl}
                alt={title}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="absolute inset-0 z-0"
                draggable={false}
            />
            <div className="absolute bottom-0 left-0 w-full bg-[#03A0B4] bg-opacity-90 p-4 z-10">
                <p className="text-white text-lg font-semibold">{title}</p>
            </div>
        </div>
    )
}