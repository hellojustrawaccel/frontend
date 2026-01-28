'use client';

import { motion } from 'motion/react';

import PageContent from '@/components/PageContent';
import PageWrapper from '@/components/PageWrapper';
import CurrentAge from '@/components/more/CurrentAge';
import MoreLinks from '@/components/more/Links';
import { useLinks } from '@/hooks/useLinks';
import { LinkType } from '@/constants/enums.constant';

const MorePage = () => {
  const { links, loading: loadingLinks } = useLinks(LinkType.More);

  const funFacts = [
    <>
      i&apos;m <CurrentAge /> years old
    </>,
    <>i&apos;ve spent 7 and a half years mastering the piano</>,
    <>actively interested in open source</>,
    <>very quiet and show more through actions than words</>,
  ];

  return (
    <PageWrapper>
      <PageContent>
        <div className="flex h-full flex-col gap-6 text-sm">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.26, 1, 0.6, 1] }}
          >
            <p className="mb-2">you clicked it, you got it. here&apos;s some more:</p>
          </motion.div>

          <div className="flex flex-col gap-2">
            <h3 className="leading-none font-bold">fun facts</h3>
            <div className="ml-3 flex flex-col gap-1">
              {funFacts.map((fact, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: [0.26, 1, 0.6, 1] }}
                  whileHover={{ x: 2 }}
                  className="transition-all duration-150"
                >
                  - {fact}
                </motion.p>
              ))}
            </div>
          </div>

          <MoreLinks loading={loadingLinks} links={links} />
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default MorePage;
