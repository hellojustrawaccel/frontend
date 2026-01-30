'use client';

import { useEffect, useState } from 'react';

import { getLanyard } from '@/lib/queries/lanyard';

const useLanyard = (id: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    const update = async () => {
      const res = await getLanyard(id);
      if (mounted) setData(res);
    };

    update();
    const i = setInterval(update, 30_000);

    return () => {
      mounted = false;
      clearInterval(i);
    };
  }, [id]);

  return data;
};

export { useLanyard };
