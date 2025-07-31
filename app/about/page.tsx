'use client';

import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState({
    mission: false,
    vision: false,
    team: false
  });

  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            console.log('Section visible:', sectionId); // Debug log
            if (sectionId) {
              setIsVisible(prev => ({
                ...prev,
                [sectionId]: true
              }));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const sections = [missionRef.current, visionRef.current, teamRef.current];
    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    // Fallback: Show all sections after 2 seconds if they haven't triggered
    const fallbackTimer = setTimeout(() => {
      setIsVisible({
        mission: true,
        vision: true,
        team: true
      });
    }, 0);

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45 mb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-left text-white mb-12">ABOUT US</h1>
          
          {/* Mission Section */}
          <div 
            ref={missionRef}
            data-section="mission"
            className={`bg-white grid grid-cols-1 lg:grid-cols-2 transition-all duration-1000 ease-out ${
              isVisible.mission 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="flex items-center justify-center">
              <div className="w-full h-80 overflow-hidden">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756768.jpg?alt=media&token=e776768b-4691-4347-922d-0af8bf155208"
                  alt="Community Voice"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center justify-center flex-col p-4">
              <div className="text-black">
                <h2 className="text-2xl font-bold mb-4">OUR MISSION</h2>
                <p className="text-sm leading-relaxed">
                  To amplify community voices and deliver impactful, inclusive radio programs that educate, 
                  engage, and empower. We create a platform where every voice matters, addressing real-life 
                  issues through trusted storytelling, local dialogue, and accessible information.
                </p>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div 
            ref={visionRef}
            data-section="vision"
            className={`bg-white grid grid-cols-1 lg:grid-cols-2 transition-all duration-1000 ease-out  ${
              isVisible.vision 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-full'
            }`}
          >
            <div className="flex items-center justify-center flex-col p-4 order-2 lg:order-1">
              <div className="text-black">
                <h2 className="text-2xl font-bold mb-4">OUR VISION</h2>
                <p className="text-sm leading-relaxed">
                  We envision media as a powerful catalyst for awareness, equality, and positive change. 
                  Through Foundation FM Radio, we bridge gaps and amplify unheard voices, creating a future 
                  where information is accessible, conversations are inclusive, and individuals are informed, 
                  inspired, and heard.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="w-full h-80 overflow-hidden">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756993.jpg?alt=media&token=ecda6a3f-cd2d-4715-85b6-1099632bec55"
                  alt="Future Vision"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div 
            ref={teamRef}
            data-section="team"
            className={`bg-white grid grid-cols-1 lg:grid-cols-2 transition-all duration-1000 ease-out ${
              isVisible.team 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="flex items-center justify-center">
              <div className="w-full h-80 overflow-hidden">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-olly-3800499.jpg?alt=media&token=1bde06d4-8573-498e-956d-bfccbab34674"
                  alt="Our Team"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center justify-center flex-col p-4">
              <div className="text-black">
                <h2 className="text-2xl font-bold mb-4">OUR TEAM</h2>
                <p className="text-sm leading-relaxed">
                  We are journalists, communicators, and change-makers united by our mission to inform, 
                  uplift, and empower our community. Our team brings stories to life through interviews, 
                  field reporting, live discussions, and creative production that reflects the voices, 
                  values, and realities of the people we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 