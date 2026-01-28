'use client';

import { DISCORD_ID } from '@/constants/user.constant';
import { useLanyard } from '@/hooks/useLanyard';
import SpotifyTooltip from './SpotifyTooltip';

export function SpotifyWrapper() {
  const activity = useLanyard(DISCORD_ID);

  return <SpotifyTooltip activity={activity} />;
}
