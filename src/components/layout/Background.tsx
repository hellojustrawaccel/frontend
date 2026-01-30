'use client';

import { motion } from 'motion/react';

const Background = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.2 }}
    transition={{ duration: 2, ease: [0.26, 1, 0.6, 1] }}
    className="pointer-events-none fixed top-0 left-0 z-0 flex h-screen w-screen flex-col items-center justify-center gap-32 bg-linear-to-l from-[#121212] to-white to-75%"
    style={{
      maskImage:
        'linear-gradient(to right, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%)',
      WebkitMaskImage:
        'linear-gradient(to right, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%)',
    }}
  >
    <div
      className="bg-background mt-80 ml-[50vw] min-h-34 w-[200vw] blur-md"
      style={{ animation: 'sway 7s infinite' }}
    />
    <div
      className="bg-background mt-48 ml-[50vw] min-h-30 w-[200vw] blur-md"
      style={{ animation: 'sway 6s infinite' }}
    />
    <div
      className="bg-background mt-18 ml-[50vw] min-h-64 w-[200vw] blur-md"
      style={{ animation: 'sway 8s infinite' }}
    />
  </motion.div>
);

export default Background;
