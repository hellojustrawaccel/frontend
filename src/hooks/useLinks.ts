'use client';

import { useEffect, useState } from 'react';

import { LinkType } from '@/constants/enums.constant';
import { getLinks } from '@/services/links';
import { BackendLink } from '@/types/links';

export const useLinks = (type: LinkType) => {
  const [links, setLinks] = useState<BackendLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLinks()
      .then((res) => setLinks(res.filter((link) => link.type === type)))
      .finally(() => setLoading(false));
  }, []);

  return { links, loading };
};
