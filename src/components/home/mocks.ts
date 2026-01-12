import { ExperienceType, LinkType } from '@/constants/enums.constant';
import { Experience } from '@/types/experience';
import { Link } from '@/types/links';
import { Project } from '@/types/project';

export const mockLinks: Link[] = [
  {
    name: 'github',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'https://github.com/justrawaccel',
  },
  {
    name: 'srht',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'https://github.com/justrawaccel',
  },
  {
    name: 'waka',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'https://github.com/justrawaccel',
  },
  {
    name: 'dsc',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'https://github.com/justrawaccel',
  },
  {
    name: 'music',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'https://github.com/justrawaccel',
  },
  {
    name: 'message',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'MAIL:invok@justrawaccel.dev',
  },
];

export const mockExp: Experience[] = [
  {
    id: 'a8jasfasf',
    company: 'Assisterr',
    color: '#282828',
    role: 'backend engineer',
    startedAt: new Date('2022-01-01'),
    endedAt: new Date('2022-12-31'),
    type: ExperienceType.PartTime,
    url: 'https://assisterr.ai/',
  },
  {
    id: 'agjasfasf',
    company: 'Assisterr',
    color: '#282828',
    role: 'backend engineer',
    startedAt: new Date('2022-01-01'),
    endedAt: new Date('2022-12-31'),
    type: ExperienceType.PartTime,
    url: 'https://assisterr.ai/',
  },
  {
    id: 'ahjasfasf',
    company: 'Assisterr',
    color: '#282828',
    role: 'backend engineer',
    startedAt: new Date('2022-01-01'),
    endedAt: new Date('2022-12-31'),
    type: ExperienceType.PartTime,
    url: 'https://assisterr.ai/',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'd28djhawjda',
    name: 'vahue',
    description: 'ahahahahahah umora pizda',
    html_url: 'https://github.com/justrawaccel/vahue',
    stargazers_count: 10,
    source: 'github',
    owner: 'justrawaccel',
  },
];
