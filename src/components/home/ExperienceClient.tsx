'use client';

import { motion } from 'motion/react';
import LinkPreview from '@/components/common/LinkPreview';
import ExperienceDuration from '@/components/home/ExperienceDuration';
import { getImageURLFromKey } from '@/lib/cdn';
import { ClientExperience } from '@/types';
import { ExperienceType } from '@/constants/enums.constant';

const TypeTitles: Record<string | ExperienceType, string> = {
  [ExperienceType.Contract]: 'contract',
  [ExperienceType.FullTime]: 'full-time',
  [ExperienceType.PartTime]: 'part-time',
};

interface ExperienceClientProps {
  experiences: ClientExperience[];
}

const ExperienceClient = ({ experiences }: ExperienceClientProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="leading-none font-bold">experience</h3>

      <div className="text-primary relative ml-3 flex flex-col gap-2">
        {experiences.map((data, i) => (
          <motion.div
            key={data.order}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: [0.26, 1, 0.6, 1] }}
            whileHover={{ x: 2 }}
          >
            <LinkPreview
              href={data.url}
              preview={getImageURLFromKey(`experiences/${data.id}.webp`)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="font-medium transition-colors duration-150"
                  style={{ color: data.color }}
                >
                  {data.company}
                </span>

                <ExperienceDuration startedAt={data.startDate} endedAt={data.endDate} />
              </div>

              <p className="text-tertiary">
                {data.role}{' '}
                <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] leading-none font-medium">
                  {TypeTitles[data.type]}
                </span>
              </p>
            </LinkPreview>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceClient;
