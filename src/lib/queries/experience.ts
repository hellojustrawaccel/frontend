import { api } from '@/lib/api';
import type {
  BackendExperience,
  CreateExperienceRequest,
  UpdateExperienceRequest,
} from '@/types';

export const getExperiences = async (): Promise<BackendExperience[]> =>
  api.get<BackendExperience[]>('/v1/experience');

export const getExperienceById = async (id: string): Promise<BackendExperience> =>
  api.get<BackendExperience>(`/v1/experience/${id}`);

export const createExperience = async (
  data: CreateExperienceRequest,
  token: string
): Promise<BackendExperience> =>
  api.post<BackendExperience, CreateExperienceRequest>('/v1/experience', data, token);

export const updateExperience = async (
  id: string,
  data: UpdateExperienceRequest,
  token: string
): Promise<BackendExperience> =>
  api.patch<BackendExperience, UpdateExperienceRequest>(`/v1/experience/${id}`, data, token);

export const deleteExperience = async (id: string, token: string): Promise<void> =>
  api.delete<void>(`/v1/experience/${id}`, token);
