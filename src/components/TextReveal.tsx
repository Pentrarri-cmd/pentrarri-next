'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
  children: string;
  delay?: number;
}

export function TextReveal({ children, delay = 0 }: TextRevealProps) {
  const words = children.split(' ');

  return (
    <span className="inline-flex flex-wrap gap-x-[0.25em]">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + wordIndex * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
