import { Experience } from '@/types/experience';
import { bGET } from '@/utils/axios/http.axios';

export const getExperience = async (): Promise<Experience[]> =>
  bGET<Experience[]>('/v1/experience');
