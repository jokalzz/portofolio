/// <reference types="vite/client" />

declare module 'gsap-trial/SplitText';
declare module 'gsap-trial/ScrollSmoother';

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
