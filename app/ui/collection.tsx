"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import { useState, useRef } from "react";

type CollectionProps = {
  id: number;
  name: string;
  genre: string;
  channel: string;
  url: string;
  followers: number;
  streamLink: string;
};

const samplePrograms: CollectionProps[] = [
  {
    id: 1,
    name: "Groove Salad",
    genre: "Chillout",
    channel: "SomaFM",
    url: "https://somafm.com/groovesalad/",
    followers: 1200,
    streamLink: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
  },
  {
    id: 2,
    name: "BBC Radio 2",
    genre: "Pop",
    channel: "BBC 88.1",
    url: "https://www.bbc.co.uk/sounds",
    followers: 2400,
    streamLink: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
  },
  {
    id: 3,
    name: "BBC 1Xtra",
    genre: "R&B",
    channel: "BBC 100.1",
    url: "https://www.bbc.co.uk/sounds",
    followers: 1800,
    streamLink: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
  },
  {
    id: 4,
    name: "BBC Radio 4 FM",
    genre: "Talk/Drama",
    channel: "BBC 104.4",
    url: "https://www.bbc.co.uk/sounds",
    followers: 1600,
    streamLink: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
  },
  {
    id: 5,
    name: "SomaFM: Drone Zone",
    genre: "Ambient",
    channel: "Drone 128",
    url: "https://somafm.com/dronezone/",
    followers: 900,
    streamLink: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
  },
];

export default function Collection() {
  const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({});
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  const handlePlay = async (program: CollectionProps) => {
    // Pause all audio refs
    Object.keys(audioRefs.current).forEach((key) => {
      const audio = audioRefs.current[parseInt(key)];
      if (audio && parseInt(key) !== program.id) {
        audio.pause();
      }
    });

    const currentAudio = audioRefs.current[program.id];
    if (!currentAudio) return;

    if (currentPlayingId === program.id) {
      currentAudio.pause();
      setCurrentPlayingId(null);
    } else {
      try {
        setLoadingStates(prev => ({ ...prev, [program.id]: true }));
        
        // Use the API route to proxy the stream
        const proxyUrl = `/api/stream?url=${encodeURIComponent(program.streamLink)}`;
        currentAudio.src = proxyUrl;
        
        await currentAudio.play();
        setCurrentPlayingId(program.id);
      } catch (err) {
        console.error("Playback error:", err);
        alert("Failed to play audio. Please try again.");
      } finally {
        setLoadingStates(prev => ({ ...prev, [program.id]: false }));
      }
    }
  };

  // Handle audio events
  const handleAudioLoadStart = (programId: number) => {
    setLoadingStates(prev => ({ ...prev, [programId]: true }));
  };

  const handleAudioCanPlay = (programId: number) => {
    setLoadingStates(prev => ({ ...prev, [programId]: false }));
  };

  const handleAudioError = (programId: number) => {
    console.error(`Audio error for program ${programId}`);
    setLoadingStates(prev => ({ ...prev, [programId]: false }));
    setCurrentPlayingId(null);
  };

  return (
    <div className="w-full text-white p-4">
      <h2 className="text-3xl font-bold text-center mb-8">OUR COLLECTIONS</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-700 text-left border-separate border-spacing-y-4">
          <thead>
            <tr>
              <th className="px-3 py-2 text-sm sm:text-base">#</th>
              <th className="px-3 py-2 text-sm sm:text-base">Program Name</th>
              <th className="px-3 py-2 text-sm sm:text-base">Genre</th>
              <th className="px-3 py-2 text-sm sm:text-base">Channel</th>
              <th className="px-3 py-2 text-sm sm:text-base">URL</th>
              <th className="px-3 py-2 text-sm sm:text-base">Followers</th>
              <th className="px-3 py-2 text-sm sm:text-base"><Volume2 /></th>
            </tr>
          </thead>
          <tbody>
            {samplePrograms.map((program) => (
              <tr key={program.id} className="bg-neutral-900 border border-gray-600 rounded">
                <td className="px-3 py-2 text-sm sm:text-base">{program.id}</td>
                <td className="px-3 py-2 text-sm sm:text-base">{program.name}</td>
                <td className="px-3 py-2 text-sm sm:text-base">{program.genre}</td>
                <td className="px-3 py-2 text-sm sm:text-base">{program.channel}</td>
                <td className="px-3 py-2 text-sm sm:text-base">
                  <a href={program.url} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                    {program.url}
                  </a>
                </td>
                <td className="px-3 py-2 text-sm sm:text-base">{program.followers}</td>
                <td className="px-3 py-2 text-sm sm:text-base">
                  <audio
                    ref={(el) => {audioRefs.current[program.id] = el;}}
                    preload="none"
                    onLoadStart={() => handleAudioLoadStart(program.id)}
                    onCanPlay={() => handleAudioCanPlay(program.id)}
                    onError={() => handleAudioError(program.id)}
                    onEnded={() => setCurrentPlayingId(null)}
                  />
                  <button
                    onClick={() => handlePlay(program)}
                    disabled={loadingStates[program.id]}
                    className={`border cursor-pointer rounded-md px-4 py-2 transition-all ${
                      currentPlayingId === program.id
                        ? "bg-red-600 text-white border-red-600"
                        : "text-cyan-300 border-cyan-400"
                    } ${loadingStates[program.id] ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {loadingStates[program.id] ? (
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    ) : currentPlayingId === program.id ? (
                      <Pause size={18} />
                    ) : (
                      <Play size={18} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
