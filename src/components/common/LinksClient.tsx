'use client';

import { motion } from 'motion/react';
import { ClientLink } from '@/types';
import { LinkType } from '@/constants/enums.constant';

interface LinksClientProps<T extends LinkType> {
  links: ClientLink<T>[];
  variant?: 'horizontal' | 'vertical';
  title?: string;
}

const LinksClient = <T extends LinkType>({
  links,
  variant = 'horizontal',
  title,
}: LinksClientProps<T>) => {
  if (variant === 'vertical') {
    return (
      <div className="flex flex-col gap-2">
        {title && <h3 className="leading-none font-bold">{title}</h3>}
        <div className="ml-3 flex flex-col gap-1">
          {links.map((link, i) => {
            const {
              url,
              title: linkTitle,
              color,
              description,
            } = link as ClientLink<LinkType.More>;
            return (
              <motion.div
                key={i}
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
                    {linkTitle}
                  </a>
                  {description && <> - {description}</>}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-6 gap-y-1">
      {links.map(({ url, title: linkTitle }, i) => (
        <a
          key={`${i}-${linkTitle}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tertiary hover:text-primary cursor-pointer whitespace-nowrap transition-colors duration-150"
        >
          {linkTitle}
        </a>
      ))}
    </div>
  );
};

export default LinksClient;
