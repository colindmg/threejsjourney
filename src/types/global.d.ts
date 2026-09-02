import type Experience from "@/three/experience/Experience";

declare module "*.scss";

declare global {
  interface Window {
    experience: Experience;
  }
}
