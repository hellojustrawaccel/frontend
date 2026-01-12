'use client';

import { useState } from 'react';

import HomeDescription from '@/components/home/Description';
import HomeLinks from '@/components/home/Links';
import SpotifyTooltip from '@/components/home/SpotifyTooltip';
import PageContent from '@/components/PageContent';
import PageWrapper from '@/components/PageWrapper';
import { DISCORD_ID } from '@/constants/user.constant';
import { useHomeExperience } from '@/hooks/useHomeExperience';
import { useHomeLinks } from '@/hooks/useHomeLinks';
import { useLanyard } from '@/hooks/useLanyard';

import HomeExperience from './Experience';
import { mockExp, mockLinks, mockProjects } from './mocks';
import { HomeProjectsPreview } from './ProjectsPreview';

const HomeClient = () => {
  const activity = useLanyard(DISCORD_ID);
  const { links, loading: loadingLinks } = useHomeLinks();
  const { experiences, loading: loadingExp } = useHomeExperience();

  const [showProjectsModal, setShowProjectsModal] = useState(false);

  return (
    <PageWrapper>
      <PageContent>
        <div className="text-primary flex h-full flex-col gap-6 text-sm max-md:pb-14">
          <div className="flex flex-col">
            <HomeDescription />
            <HomeLinks loading={loadingLinks} links={mockLinks} />
          </div>

          <HomeExperience loading={loadingExp} experiences={mockExp} />
          <HomeProjectsPreview
            projects={mockProjects}
            onViewAll={() => setShowProjectsModal(true)}
          />
        </div>
      </PageContent>

      {/*<ProjectsModal
        isOpen={showProjectsModal}
        onClose={() => setShowProjectsModal(false)}
        projects={projects}
      />*/}

      <SpotifyTooltip activity={activity} />
    </PageWrapper>
  );
};

export default HomeClient;
