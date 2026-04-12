"use client";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WorkSpotlight } from "@/components/sections/WorkSpotlight";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-start font-sans dark:bg-black overflow-x-hidden">
      <main className="flex flex-col flex-1 w-full bg-white dark:bg-black">
        <HeroSection />
        <ProcessSection />
        <WorkSpotlight />
      </main>
    </div>
  );
}
