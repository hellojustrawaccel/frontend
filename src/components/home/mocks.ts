import { ExperienceType, LinkType } from '@/constants/enums.constant';
import { Experience, Link } from '@/types';
import { Project } from '@/types/project';

export const mockLinks: Link[] = [
  {
    title: 'github',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'https://github.com/justrawaccel',
    order: 0,
  },
  {
    title: 'srht',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'https://github.com/justrawaccel',
    order: 1,
  },
  {
    title: 'waka',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'https://github.com/justrawaccel',
    order: 2,
  },
  {
    title: 'dsc',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'https://github.com/justrawaccel',
    order: 3,
  },
  {
    title: 'music',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'https://github.com/justrawaccel',
    order: 4,
  },
  {
    title: 'message',
    color: null,
    description: null,
    type: LinkType.Home,
    url: 'MAIL:invok@justrawaccel.dev',
    order: 5,
  },
];

export const mockExp: Experience[] = [
  {
    id: 'assisterr',
    company: 'Assisterr',
    color: '#282828',
    role: 'backend engineer',
    startDate: '2022-01-01',
    endDate: '2022-12-31',
    type: ExperienceType.PartTime,
    url: 'https://assisterr.ai/',
    order: 0,
  },
  {
    id: 'insiders',
    company: 'Assisterr',
    color: '#282828',
    role: 'backend engineer',
    startDate: '2022-01-01',
    endDate: '2022-12-31',
    type: ExperienceType.PartTime,
    url: 'https://assisterr.ai/',
    order: 1,
  },
  {
    id: 'yamiko',
    company: 'Assisterr',
    color: '#282828',
    role: 'backend engineer',
    startDate: '2022-01-01',
    endDate: '2022-12-31',
    type: ExperienceType.PartTime,
    url: 'https://assisterr.ai/',
    order: 2,
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
