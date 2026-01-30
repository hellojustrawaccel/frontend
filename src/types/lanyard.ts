// Lanyard API types for Discord presence
// Based on https://github.com/Phineas/lanyard

export interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}

export interface LanyardData {
  spotify: Spotify | null;
  listening_to_spotify: boolean;
  discord_user: DiscordUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Activity[];
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_web?: boolean;
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
  identity_guild_id: string;
}

export interface AvatarDecoration {
  sku_id: string;
  asset: string;
  expires_at: number | null;
}

export interface Activity {
  type: number;
  state?: string;
  name: string;
  id: string;
  emoji?: Emoji;
  created_at: number;
  application_id?: string;
  timestamps?: ActivityTimestamps;
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
  id?: number;
  animated?: boolean;
}

export interface ActivityTimestamps {
  start?: number;
  end?: number;
}

export interface Party {
  id: string;
  size?: [number, number];
}

export interface Assets {
  small_text?: string;
  small_image?: string;
  large_text?: string;
  large_image?: string;
}
