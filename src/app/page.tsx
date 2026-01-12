import PageContent from '@/components/PageContent';
import PageWrapper from '@/components/PageWrapper';
import { DISCORD_ID } from '@/constants/user.constant';
import { useLanyard } from '@/hooks/useLanyard.hook';

const HomePage = async () => {
  const activity = useLanyard(DISCORD_ID);
  // const { links, loading: loadingLinks } = useHomeLinks();
  // const { experiences, loading: loadingExp } = useHomeExperience();

  return (
    <PageWrapper>
      <PageContent>
        <div className="text-primary flex h-full flex-col gap-6 text-sm max-md:pb-14">
          <div className="flex flex-col">
            {/*<HomeHeader />
            <HomeLinks loading={loadingLinks} links={homeLinks} />*/}
          </div>
        </div>
      </PageContent>

      {/*<ProjectsModal
        isOpen={showProjectsModal}
        onClose={() => setShowProjectsModal(false)}
        projects={projects}
      />*/}

      <SpotifyNowPlaying activity={activity} />
    </PageWrapper>
  );
};

export default HomePage;
