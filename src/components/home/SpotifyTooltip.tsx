'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

import Tooltip from '@/components/common/Tooltip';
import { LanyardData } from '@/types/lanyard';

type Props = {
  activity: LanyardData | null;
};

const SpotifyTooltip = ({ activity }: Props) => {
  if (!activity || !activity.listening_to_spotify || !activity.spotify) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="text-tertiary relative flex w-full flex-col gap-2 text-xs select-none"
    >
      <div className="flex items-center gap-2">
        <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
        <div className="flex items-center gap-1">
          Listening to{' '}
          <span className="relative w-min whitespace-nowrap">
            <Tooltip
              className="absolute -top-18 left-1/2 ml-0! -translate-x-1/2 overflow-visible border-none p-0"
              content={
                <div className="relative h-24 w-24 overflow-visible">
                  <Image
                    src={activity.spotify.album_art_url}
                    width={96}
                    height={96}
                    alt={activity.spotify.album}
                    priority
                    className="absolute rounded-md shadow-md select-none"
                    draggable={false}
                  />
                </div>
              }
            >
              <a
                href={`https://open.spotify.com/track/${activity.spotify.track_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary cursor-alias rounded-[5px] font-medium"
              >
                {activity.spotify.song}
              </a>
            </Tooltip>
          </span>{' '}
          by <span className="text-primary font-medium">{activity.spotify.artist}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SpotifyTooltip;
