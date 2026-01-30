'use client';

import { useEffect, useState } from 'react';

import { LinkType } from '@/constants/enums.constant';
import { getLinks } from '@/lib/queries/links';
import { ClientLink } from '@/types';

export const useLinks = (type: LinkType) => {
  const [links, setLinks] = useState<ClientLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLinks(type)
      .then((res) => setLinks(res))
      .finally(() => setLoading(false));
  }, [type]);

  return { links, loading };
};
