import { LinkType } from '@/constants/enums.constant';

export type Link = {
  name: string;
  type: string | LinkType;
  url: string;
  description: string | null;
  color: `#${string}` | null;
};
