import { Link } from '@/types/links';
import { bGET } from '@/utils/axios/http.axios';

export const getLinks = async (): Promise<Link[]> => bGET<Link[]>('/v1/links');
