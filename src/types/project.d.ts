export type Project = {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number | null;
  source: 'github' | 'sourcehut';
  owner: string;
};
