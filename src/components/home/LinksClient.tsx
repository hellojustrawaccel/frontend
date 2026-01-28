'use client';

import { motion } from 'motion/react';
import { ClientLink } from '@/types';
import { LinkType } from '@/constants/enums.constant';

interface LinksClientProps {
  links: ClientLink<LinkType.Home>[];
}

export function LinksClient({ links }: LinksClientProps) {
  return (
    <div className="flex flex-row flex-wrap gap-6 gap-y-1">
      {links.map(({ url, title }, i) => (
        <a
          key={`${i}-${title}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tertiary hover:text-primary cursor-pointer whitespace-nowrap transition-colors duration-150"
        >
          {title}
        </a>
      ))}
    </div>
  );
}
