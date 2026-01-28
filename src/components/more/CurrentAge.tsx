'use client';

import { BIRTH_DATE } from '@/constants/user.constant';
import { useEffect, useRef } from 'react';

const CurrentAge = () => {
  const ref = useRef<HTMLSpanElement>(null);

  const update = () => {
    const age = (
      (new Date().getTime() - new Date(BIRTH_DATE).getTime()) /
      (365.25 * 24 * 60 * 60 * 1000)
    ).toFixed(10);

    if (ref.current) ref.current.innerText = age;
  };

  useEffect(() => {
    const interval = setInterval(update, 1);

    return () => clearInterval(interval);
  }, []);

  return <span ref={ref} />;
};

export default CurrentAge;
