import { CDN_URL } from '@/constants/env.constant';

type FileType = 'png' | 'jpg' | 'jpeg' | 'webp' | 'gif' | 'svg' | 'avif';

const getImageURLFromKey = (key: `${string}.${FileType}`) => CDN_URL + '/' + key;

export { getImageURLFromKey };
