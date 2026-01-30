'use client';

import { motion } from 'motion/react';

interface FunFactsClientProps {
  facts: { key: number; content: React.ReactNode }[];
}

const FunFactsClient = ({ facts }: FunFactsClientProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="leading-none font-bold">fun facts</h3>
      <div className="ml-3 flex flex-col gap-1">
        {facts.map((fact, i) => (
          <motion.p
            key={fact.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: [0.26, 1, 0.6, 1] }}
            whileHover={{ x: 2 }}
            className="transition-all duration-150"
          >
            - {fact.content}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default FunFactsClient;
