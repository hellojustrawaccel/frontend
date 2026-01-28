import { bAuthGET, bAuthPOST, bAuthPATCH, bAuthDELETE, bGET } from '@/utils/axios/http';
import type {
  BackendExperience,
  CreateExperienceRequest,
  UpdateExperienceRequest,
} from '@/types/experience';

export const getExperiences = async (): Promise<BackendExperience[]> => {
  return bGET<BackendExperience[]>('/v1/experience');
};

export const getExperienceById = async (id: string): Promise<BackendExperience> => {
  return bGET<BackendExperience>(`/v1/experience/${id}`);
};

export const createExperience = async (
  data: CreateExperienceRequest,
  token: string
): Promise<BackendExperience> => {
  return bAuthPOST<CreateExperienceRequest, BackendExperience>('/v1/experience', data, token);
};

export const updateExperience = async (
  id: string,
  data: UpdateExperienceRequest,
  token: string
): Promise<BackendExperience> => {
  return bAuthPATCH<UpdateExperienceRequest, BackendExperience>(
    `/v1/experience/${id}`,
    data,
    token
  );
};

export const deleteExperience = async (id: string, token: string): Promise<void> => {
  await bAuthDELETE(`/v1/experience/${id}`, token);
};
