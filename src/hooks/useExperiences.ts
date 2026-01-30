'use client';

import { useEffect, useState } from 'react';

import { getExperiences } from '@/lib/queries/experience';
import { ClientExperience } from '@/types';

export const useHomeExperience = () => {
  const [experiences, setExperiences] = useState<ClientExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences()
      .then(setExperiences)
      .finally(() => setLoading(false));
  }, []);

  return { experiences, loading };
};
