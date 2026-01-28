import { ExperienceType } from '@/constants/enums.constant';

export type Experience = {
  id: string;
  title: string;
  company: string;
  description?: string | null;
  type: ExperienceType | string;
  url?: string | null;
  color?: string | null;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  order: number;
};

// Backend API types
export type BackendExperience = {
  id: string;
  title: string;
  company: string;
  description?: string | null;
  type: string;
  url?: string | null;
  color?: string | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateExperienceRequest = {
  title: string;
  company: string;
  description?: string;
  type: string;
  url?: string;
  color?: string;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
  order?: number;
};

export type UpdateExperienceRequest = {
  title?: string;
  company?: string;
  description?: string;
  type?: string;
  url?: string;
  color?: string;
  startDate?: string;
  endDate?: string | null;
  current?: boolean;
  order?: number;
};
