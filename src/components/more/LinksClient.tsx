'use client';

import { motion } from 'motion/react';
import { ClientLink } from '@/types';
import { LinkType } from '@/constants/enums.constant';

interface LinksClientProps {
  links: ClientLink<LinkType.More>[];
}

export function LinksClient({ links }: LinksClientProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="leading-none font-bold">other links</h3>
      <div className="ml-3 flex flex-col gap-1">
        {links.map(({ order, url, title, color, description }, i) => (
          <motion.div
            key={order}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 + 0.2, ease: [0.26, 1, 0.6, 1] }}
            whileHover={{ x: 2 }}
            className="transition-all duration-150"
          >
            <p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors duration-150 hover:text-(--link-hover-color)"
                style={{
                  ['--link-hover-color' as any]: color,
                }}
              >
                {title}
              </a>
              {description && <> - {description}</>}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
