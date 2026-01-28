'use client';

import { ExperienceType as ExperienceTypeEnum } from '@/constants/enums.constant';

const TypeTitles: Record<string | ExperienceTypeEnum, string> = {
  [ExperienceTypeEnum.Contract]: 'contract',
  [ExperienceTypeEnum.FullTime]: 'full-time',
  [ExperienceTypeEnum.PartTime]: 'part-time',
};

interface ExperienceTypeProps {
  type: ExperienceTypeEnum;
}

export default function ExperienceType({ type }: ExperienceTypeProps) {
  return (
    <span className="text-tertiary inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] leading-none font-medium">
      {TypeTitles[type]}
    </span>
  );
}
