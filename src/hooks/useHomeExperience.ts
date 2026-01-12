'use client';

import { useEffect, useState } from 'react';

import { getExperience } from '@/services/experience';
import { Experience } from '@/types/experience';

export const useHomeExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperience()
      .then(setExperiences)
      .finally(() => setLoading(false));
  }, []);

  return { experiences, loading };
};
