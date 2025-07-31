"use client";


import{useRef, useState, useEffect} from 'react';
import {Pause, Play, SkipBack, SkipForward, Volume2, VolumeX} from 'lucide-react';

const playlist = [
    {
        title: 'Song One',
        desc: 'Description of Music',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
        title: 'Song Two',
        desc: 'Description of Music',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
        title: 'Song Three',
        desc: 'Description of Music',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
    
];


export default function Player(){
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        audio.src = playlist[currentSongIndex].url;
        if (isPlaying) {
            audio.play();
        } 
    },[currentSongIndex]);

    useEffect(() => {
        const audio =audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play();
        } else{
            audio.pause();
        }
    },[isPlaying])

    useEffect(() => { 
        const audio = audioRef.current;
        if(!audio) return;

        const hanldeTimeUpdate = () => {
            setProgress(audio.currentTime);
        };

        const handleLoadedMetaData = () => {
            setDuration(audio.duration);
        }

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
            setTimeout(playNextSong, 3000);
        }

        audio.addEventListener('timeupdate', hanldeTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetaData);
        audio.addEventListener('ended',handleEnded);

        return () =>{
            audio.removeEventListener('timeupdate', hanldeTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetaData);
            audio.removeEventListener('ended',handleEnded);
        };
    },[]);


    const skipForward =() => {
        setCurrentSongIndex(prev => (prev+1) % playlist.length);
        setProgress(0);
    };

    const skipBack = () => {
        setCurrentSongIndex(prev => prev === 0 ? playlist.length -1 : prev-1);
        setProgress(0);
    };

    const playNextSong = () => {
        setCurrentSongIndex((prev)=> {
            const nextIndex = (prev + 1) % playlist.length;
            return nextIndex;
        });
        setIsPlaying(true);
    }



    const togglePlayPause = () => {
        const audio =audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const formatTime = (time: number) => {
        const minutes =Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2,'0');
        return `${minutes}:${seconds}`;
    }

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect =e.currentTarget.getBoundingClientRect();
        const clickx =e.clientX - rect.left;
        const newTime = (clickx / rect.width) * duration;

        const audio =audioRef.current;
        if (audio) {
            audio.currentTime =newTime;
            setProgress(newTime);
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !audio.muted;
        setIsMuted(audio.muted);
    }

    return(
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 absolute z-40 bottom-0 left-0 h-1/3 lg:h-20 w-screen bg-[#1b1b1b] lg:bg-[#1b1b1bcc] ">
          {/* song title */}
          <div className='flex flex-col w-full lg:w-1/2 px-2 items-center justify-end text-left'>
          <div className='w-full'>
            <p className='text-white text-sm font-semibold mb-1'>
                Amplifying voices, education, community engagement
                </p>
                
                <p className='text-[#03FFDD] text-sm font-semibold mb-1'>
                   Your voice, your station
                </p>
          </div>
          
                
          </div>
                
            {/* Control buttons*/}
            <div className='flex items-center gap-6 text-white'>
                <button onClick={skipBack} className='hover:text-[#03FFDD] transition duration-200 cursor-pointer'>
                    <SkipBack size={28}/>
                </button>
                <button onClick={togglePlayPause} className='bg-transparent border-2 border-white px-4 py-2 rounded hover:border-[#03FFDD] text-white hover:text-[#03FFDD] font-semibold transition duration-200 cursor-pointer'>
                    {isPlaying? <Pause size={20}/>: <Play size={20}/>}
                </button>
                <button onClick={skipForward} className='hover:text-[#03FFDD] transition duration-200 cursor-pointer'>
                    <SkipForward size={28}/>
                </button>
     
            </div>

            {/*Progress Bar*/}
           <div className='flex items-center justify-around gap-6 w-full lg:w-1/2 px-6 mt-2'>
           <span className='w-1/3 md:w-1/5 xl:w-1/6 items-center justify-center flex text-white'>{formatTime(progress)}</span>

            <div className='w-full h-2 bg-gray-600 rounded mt-1 relative hover:cursor-pointer ' onClick={handleSeek}>
                <div
                className='h-2 bg-[#03FFDD] rounded absolute top-0 left-0 transition-all duration-200 ease-linear'
                style={{width: `${(progress / duration) * 100}%`}}
                />
            </div>
            
            <span className='w-1/3 md:w-1/5 xl:w-1/6 items-center justify-center flex text-white'>{formatTime(duration)}</span>

             <button onClick={toggleMute} className='cursor-pointer  text-white hover:text-[#03FFDD]'>
                    {isMuted? <VolumeX size={20}/> : <Volume2 size={20}/>}
                </button>

          
           </div>

            

            <audio
            ref={audioRef}
            />
        </div>
    )

}