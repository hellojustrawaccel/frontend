type FileType = 'png' | 'jpg' | 'jpeg' | 'webp' | 'gif' | 'svg' | 'avif';

const cdnURL = process.env.NEXT_PUBLIC_CDN_URL;
const getImageURLFromKey = (key: `${string}.${FileType}`) => cdnURL + '/' + key;

export { getImageURLFromKey };
