'use client';

import dayjs from 'dayjs';
import dayjs_timezone_plugin from 'dayjs/plugin/timezone';
import dayjs_utc_plugin from 'dayjs/plugin/utc';
import { HTMLMotionProps, motion } from 'motion/react';
import { forwardRef, useEffect, useState } from 'react';

import Tooltip from '@/components/Tooltip';
import { TIME_ZONE } from '@/constants/time.constant';
import { NAME } from '@/constants/user.constant';
import { cn } from '@/utils/cn.util';

dayjs.extend(dayjs_utc_plugin);
dayjs.extend(dayjs_timezone_plugin);

type Props = HTMLMotionProps<'div'>;

const PageContent = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    const [date, setDate] = useState(() => dayjs().tz(TIME_ZONE));

    useEffect(() => {
      const id = setInterval(() => setDate(dayjs().tz(TIME_ZONE)), 6e4);

      return () => clearInterval(id);
    }, []);

    return (
      <motion.div
        className={cn(
          'max-xs:p-8 sticky top-0 flex h-min w-full flex-col p-10 max-sm:relative max-sm:min-h-min max-sm:overflow-y-auto max-sm:pt-10 max-sm:pb-8 sm:h-full sm:max-w-lg sm:min-w-md sm:pt-16',
          className
        )}
      >
        <motion.h1
          layoutId="header"
          layout="position"
          className="text-primary xs:mt-4 mt-0 mb-1 text-2xl font-medium"
        >
          {NAME}
        </motion.h1>

        <motion.div ref={ref} {...props}>
          {children}
        </motion.div>

        <motion.footer
          layoutId="footer"
          layout="position"
          className="mt-auto flex w-full flex-row justify-between max-sm:hidden"
        >
          <Tooltip
            content={`This is my time. I'm probably ${date.hour() > 1 && date.hour() < 10 ? 'sleeping' : 'awake'}.`}
            className="whitespace-nowrap"
          >
            <p className="text-primary flex cursor-default flex-row items-center gap-1.5 text-sm">
              <span className="font-medium" suppressHydrationWarning>
                {date.format('h:mm A')}
              </span>
              <span className="bg-primary block size-0.75 rounded-full" />
              <span className="text-tertiary" suppressHydrationWarning>
                {date.format('MMM D, YYYY')}
              </span>
            </p>
          </Tooltip>
        </motion.footer>
      </motion.div>
    );
  }
);

PageContent.displayName = 'PageContent';

export default PageContent;
