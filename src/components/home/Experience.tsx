'use client';

import { motion } from 'motion/react';

import ExperienceDuration from '@/components/home/ExperienceDuration';
import LinkPreview from '@/components/LinkPreview';
import Skeleton from '@/components/Skeleton';
import { ExperienceType } from '@/constants/enums.constant';
import { Experience } from '@/types/experience';
import { getImageURLFromKey } from '@/utils/cdn/image';

const TypeTitles: Record<string | ExperienceType, string> = {
  [ExperienceType.Contract]: 'contract',
  [ExperienceType.FullTime]: 'full-time',
  [ExperienceType.PartTime]: 'part-time',
};

type Props = {
  loading: boolean;
  experiences: Experience[];
};

const HomeExperience = ({ loading, experiences }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="leading-none font-bold">experience</h3>

      <div className="text-primary relative ml-3 flex flex-col gap-2">
        {loading ? (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <Skeleton className="h-4 w-28 rounded-sm" />
                  <Skeleton className="h-4 w-36 rounded-sm opacity-70" />
                </div>
                <Skeleton className="h-4 w-48 rounded-sm opacity-60" />
              </div>
            ))}
          </>
        ) : (
          experiences.map((data, i) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
                ease: [0.26, 1, 0.6, 1],
              }}
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

                  <ExperienceDuration startedAt={data.startedAt} endedAt={data.endedAt} />
                </div>

                <p className="text-tertiary">
                  {data.role} ({TypeTitles[data.type]})
                </p>
              </LinkPreview>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeExperience;
