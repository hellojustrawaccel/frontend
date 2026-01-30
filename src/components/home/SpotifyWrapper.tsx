'use client';

import { DISCORD_ID } from '@/constants/user.constant';
import { useLanyard } from '@/hooks/useLanyard';
import SpotifyTooltip from './SpotifyTooltip';

const SpotifyWrapper = () => {
  const activity = useLanyard(DISCORD_ID);

  return <SpotifyTooltip activity={activity} />;
};

export default SpotifyWrapper;
