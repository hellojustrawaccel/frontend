import Link from 'next/link';

interface BackLinkProps {
  href: string;
  text: string;
}

const BackLink = ({ href, text }: BackLinkProps) => (
  <Link
    href={href}
    className="text-tertiary hover:text-primary group inline-flex w-fit items-center gap-2 text-xs transition-colors"
  >
    <svg
      viewBox="0 0 24 24"
      className="size-3.5 transition-transform group-hover:-translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
    <span>{text}</span>
  </Link>
);

export default BackLink;
