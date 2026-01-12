'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

import Tooltip from '@/components/Tooltip';
import { LanyardData } from '@/types/lanyard';

type Props = {
  activity: LanyardData | null;
};

const SpotifyTooltip = ({ activity }: Props) => {
  if (!activity?.listening_to_spotify) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: [0.26, 1, 0.6, 1] }}
      className="absolute right-10 bottom-10 mt-auto w-auto flex-col items-end justify-end max-sm:hidden"
    >
      <div className="flex flex-row items-center gap-2">
        <div className="relative size-1.5 overflow-visible">
          <span className="absolute size-1.25 rounded-full bg-green-600" />
          <span className="absolute size-1.25 animate-ping rounded-full bg-[color(display-p3_0.385_0.8_0.414/1)] [animation-duration:2s]" />
        </div>
        <div className="text-secondary mt-0.5 flex flex-row gap-1 text-end text-sm">
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
