declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BACKEND_URL: string;
      NEXT_PUBLIC_CDN_URL: string;
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_EMAIL: string;
    }
  }
}

export {};
