"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const generateRandomLines = () =>
  Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    delay: Math.random() * 3,
    direction: Math.random() > 0.5 ? 1 : -1,
    duration: 8 + Math.random() * 8,
  }));

export default function MovingLines() {
  const [lines, setLines] = useState(generateRandomLines);

  return (
    <div className="w-full h-24 bg-transparent flex flex-col justify-center gap-2 ">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="h-[2px] bg-gray-400 rounded mx-0"
          initial={{ width: "70%" }}
          animate={{
            x: line.direction === 1 ? ["-10%", "20%", "-10%"] : ["20%", "-10%", "20%"],
          }}
          transition={{
            repeat: Infinity,
            duration: line.duration,
            delay: line.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
