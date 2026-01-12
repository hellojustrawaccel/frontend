import Skeleton from '@/components/Skeleton';
import { Link } from '@/types/links';

interface Props {
  loading: boolean;
  links: Link[];
}

const HomeLinks = ({ loading, links }: Props) => (
  <div className="flex flex-row flex-wrap gap-6 gap-y-1">
    {loading ? (
      <>
        {Array(5)
          .fill('!w-[60px]')
          .map((w, i) => (
            <Skeleton key={i} className={`h-4 ${w} shrink-0 rounded-sm`} />
          ))}
      </>
    ) : (
      links.map(({ name, url }, i) => (
        <a
          key={`${i}-${name}`}
          href={url.startsWith('MAIL:') ? `mailto:${url.slice(5)}` : url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tertiary hover:text-primary cursor-pointer whitespace-nowrap transition-colors duration-150"
        >
          {name}
        </a>
      ))
    )}
  </div>
);

export default HomeLinks;
