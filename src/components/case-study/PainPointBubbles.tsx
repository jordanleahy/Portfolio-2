"use client";

import { motion } from "framer-motion";

const bubbles = [
  {
    text: "\"It is very complex and difficult to find what you need.\"",
    color: "bg-amber-500",
    size: "w-44 h-44",
    top: "top-[8%]",
    left: "left-[2%]",
  },
  {
    text: "\"Find common asks and make them one step easier to consume as insight instead of data\"",
    color: "bg-cyan-400",
    size: "w-48 h-48",
    top: "top-[0%]",
    left: "left-[25%]",
  },
  {
    text: "\"...make it more user friendly\"",
    color: "bg-emerald-700",
    size: "w-40 h-40",
    top: "top-[2%]",
    left: "left-[58%]",
  },
  {
    text: "\"Make searching and putting together reports easier\"",
    color: "bg-red-600",
    size: "w-44 h-44",
    top: "top-[42%]",
    left: "left-[0%]",
  },
  {
    text: "\"Search engine needs to be more intuitive, and less restrictive\"",
    color: "bg-blue-700",
    size: "w-48 h-48",
    top: "top-[40%]",
    left: "left-[20%]",
  },
  {
    text: "\"easier navigation\"",
    color: "bg-amber-600",
    size: "w-36 h-36",
    top: "top-[38%]",
    left: "left-[48%]",
  },
  {
    text: "\"Easier navigation and some way to define what each category means before attempting to use. It is not a user-friendly application\"",
    color: "bg-purple-600",
    size: "w-52 h-52",
    top: "top-[35%]",
    left: "left-[62%]",
  },
  {
    text: "\"Search results should provide a summary of search\"",
    color: "bg-orange-500",
    size: "w-40 h-40",
    top: "top-[72%]",
    left: "left-[38%]",
  },
];

export function PainPointBubbles() {
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className={`absolute ${bubble.size} ${bubble.top} ${bubble.left} ${bubble.color} rounded-full flex items-center justify-center p-5 text-center`}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: i * 0.15,
          }}
        >
          <p className="text-white text-xs font-medium leading-tight">
            {bubble.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
