import { api } from '@/lib/api';
import { ClientExperience, ServerExperience } from '@/types';

export const getExperiences = async (): Promise<ClientExperience[]> => {
  const data = await api.get<ServerExperience[]>('/v1/experience');

  return data.map(({ id, company, role, url, color, order, type, startDate, endDate }) => ({
    id,
    company,
    role,
    url,
    type,
    color,
    order,
    startDate,
    endDate,
  }));
};

export const getExperienceById = (id: string): Promise<ClientExperience> => {
  return api.get<ServerExperience>(`/v1/experience/${id}`);
};
