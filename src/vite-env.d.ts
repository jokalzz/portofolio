/// <reference types="vite/client" />

declare module 'gsap/SplitText';
declare module 'gsap/ScrollSmoother';

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
