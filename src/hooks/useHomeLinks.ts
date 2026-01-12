'use client';

import { useEffect, useState } from 'react';

import { LinkType } from '@/constants/enums.constant';
import { getLinks } from '@/services/links';
import { Link } from '@/types/links';

export const useHomeLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLinks()
      .then((res) => setLinks(res.filter((l) => l.type === LinkType.Home)))
      .finally(() => setLoading(false));
  }, []);

  return { links, loading };
};
