import { ExperienceType, LinkType } from '@/constants/enums.constant';
import { UUID } from './base';

// #region Links

export type ServerLink = {
  id: UUID;
  title: string;
  type: string | LinkType;
  url: string;
  description: string | null;
  color: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ClientLink<Type extends LinkType> = Type extends LinkType.Home
  ? Omit<ServerLink, 'id' | 'type' | 'createdAt' | 'updatedAt' | 'color' | 'description'>
  : Omit<ServerLink, 'id' | 'type' | 'createdAt' | 'updatedAt'>;

// #endregion

// #region Experience

export type ServerExperience = {
  id: UUID;
  company: string;
  role: string;
  type: string | ExperienceType;
  url: string;
  color: string;
  startDate: string;
  endDate: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ClientExperience = Omit<ServerExperience, 'createdAt' | 'updatedAt'>;

// #endregion

// #region User & Auth

export type ServerUser = {
  id: UUID;
  username: string;
  email: string;
  image: string | null;
  emailVerified: boolean;
  active: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OAuthAccount = {
  provider: string;
  providerId: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  image?: string | null;
  provider?: 'passwordless' | 'google' | 'github' | 'discord' | 'gitlab';
  providerId?: string | null;
  emailVerified: boolean;
  verified?: boolean;
  active: boolean;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  oauthAccounts?: OAuthAccount[];
};

// #endregion

// https://github.com/cnrad/lanyard-profile-readme/blob/main/src/utils/LanyardTypes.ts
// #region Lanyard

export interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}

export interface LanyardData {
  spotify: Spotify;
  listening_to_spotify: boolean;
  discord_user: DiscordUser;
  discord_status: string;
  activities: Activity[];
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
}

export interface Spotify {
  track_id: string;
  timestamps: Timestamps;
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface Timestamps {
  start: number;
  end: number;
}

export interface DiscordUser {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
  global_name: string;
  display_name: string;
  clan: ClanTag | null;
  avatar_decoration_data: AvatarDecoration | null;
}

export interface ClanTag {
  tag: string;
  badge: string;
  identity_enabled: boolean;
  identity_guild_id: number;
}

export interface AvatarDecoration {
  sku_id: string;
  asset: string;
  expires_at: number;
}

export interface Activity {
  type: number;
  state: string;
  name: string;
  id: string;
  emoji?: Emoji;
  created_at: number;
  application_id?: string;
  timestamps?: Timestamps2;
  sync_id?: string;
  session_id?: string;
  party?: Party;
  flags?: number;
  details?: string;
  assets?: Assets;
  buttons?: string[];
}

export interface Emoji {
  name: string;
  id: number;
  animated: boolean;
}

export interface Timestamps2 {
  start: number;
  end?: number;
}

export interface Party {
  id: string;
}

export interface Assets {
  small_text?: string;
  small_image?: string;
  large_text: string;
  large_image: string;
}

// #endregion
