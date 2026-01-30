import { Suspense } from 'react';

import PageContent from '@/components/layout/PageContent';
import PageWrapper from '@/components/layout/PageWrapper';
import CurrentAge from '@/components/more/CurrentAge';
import LinksClient from '@/components/common/LinksClient';
import FunFactsClient from '@/components/more/FunFactsClient';
import { getLinks } from '@/lib/queries/links';
import { LinkType } from '@/constants/enums.constant';
import LinksSkeleton from '@/components/common/skeletons/LinksSkeleton';

export const dynamic = 'force-dynamic';

const MoreLinks = async () => {
  const links = await getLinks(LinkType.More);

  return <LinksClient links={links} variant="vertical" title="other links" />;
};

export default function MorePage() {
  const funFacts = [
    {
      id: 1,
      text: (
        <>
          i&apos;m <CurrentAge /> years old
        </>
      ),
    },
    { id: 2, text: <>i&apos;ve spent 7 and a half years mastering the piano</> },
    { id: 3, text: <>actively interested in open source</> },
    { id: 4, text: <>very quiet and show more through actions than words</> },
  ];

  return (
    <PageWrapper>
      <PageContent>
        <div className="flex h-full flex-col gap-6 text-sm">
          <div className="flex flex-col">
            <p className="mb-2">you clicked it, you got it. here&apos;s some more:</p>
          </div>

          <FunFactsClient facts={funFacts.map((f) => ({ key: f.id, content: f.text }))} />

          <Suspense fallback={<LinksSkeleton />}>
            <MoreLinks />
          </Suspense>
        </div>
      </PageContent>
    </PageWrapper>
  );
}
