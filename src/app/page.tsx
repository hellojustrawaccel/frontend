import { Suspense } from 'react';

import PageContent from '@/components/layout/PageContent';
import PageWrapper from '@/components/layout/PageWrapper';
import HomeDescription from '@/components/home/Description';
import ExperienceClient from '@/components/home/ExperienceClient';
import LinksClient from '@/components/common/LinksClient';
import HomeProjectsPreview from '@/components/home/ProjectsPreview';
import SpotifyWrapper from '@/components/home/SpotifyWrapper';
import { getExperiences } from '@/lib/queries/experience';
import { getLinks } from '@/lib/queries/links';
import { LinkType } from '@/constants/enums.constant';
import LinksSkeleton from '@/components/common/skeletons/LinksSkeleton';
import ExperienceSkeleton from '@/components/common/skeletons/ExperienceSkeleton';
import { mockProjects } from '@/components/home/mocks';

export const dynamic = 'force-dynamic';

const HomeLinks = async () => {
  const links = await getLinks(LinkType.Home);

  return <LinksClient links={links} />;
};

const HomeExperience = async () => {
  const experiences = await getExperiences();

  return <ExperienceClient experiences={experiences} />;
};

export default function HomePage() {
  return (
    <PageWrapper>
      <PageContent>
        <div className="text-primary flex h-full flex-col gap-6 text-sm max-md:pb-14">
          <div className="flex flex-col">
            <HomeDescription />
            <Suspense fallback={<LinksSkeleton />}>
              <HomeLinks />
            </Suspense>
          </div>

          <Suspense fallback={<ExperienceSkeleton />}>
            <HomeExperience />
          </Suspense>

          {/*<HomeProjectsPreview projects={mockProjects} onViewAll={() => {}} />*/}
        </div>
      </PageContent>

      <SpotifyWrapper />
    </PageWrapper>
  );
}
