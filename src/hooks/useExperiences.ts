'use client';

import { useEffect, useState } from 'react';

import { getExperiences } from '@/services/experience';
import { Experience } from '@/types/experience';

export const useHomeExperience = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences()
      .then(setExperiences)
      .finally(() => setLoading(false));
    setLoading(false);
  }, []);

  return { experiences, loading };
};
