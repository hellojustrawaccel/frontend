export type Project = {
  id: string;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  source: 'github' | 'gitlab' | 'other';
  owner: string;
  language?: string;
  topics?: string[];
  homepage?: string | null;
  fork?: boolean;
  archived?: boolean;
  created_at?: string;
  updated_at?: string;
  pushed_at?: string;
};
