'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PAGES } from '@/constants/pages.constant';
import { cn } from '@/utils/cn.util';

const DesktopNav = () => {
  const pathname = usePathname();

  return !pathname.startsWith('/blog/') ? (
    <div
      key="nav"
      className="font-karla text-tertiary fixed top-10 left-10 z-100 hidden flex-row gap-6 pb-3 text-sm sm:flex"
    >
      {Object.entries(PAGES).map(([name, href]) => {
        const isActive = href === '/' ? pathname === href : pathname.includes(href);

        return (
          <Link
            href={href}
            key={name}
            className={cn('hover:text-secondary relative transition-all duration-150', {
              'text-primary hover:text-primary font-medium': isActive,
            })}
          >
            {name}
          </Link>
        );
      })}
    </div>
  ) : null;
};

export default DesktopNav;
