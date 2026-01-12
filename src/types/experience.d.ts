import { ExperienceType } from '@/constants/enums.constant';

export type Experience = {
  id: string;
  company: string;
  role: string;
  type: ExperienceType | string;
  url: string;
  color: `#${string}`;
  startedAt: Date;
  endedAt: Date | null;
};
