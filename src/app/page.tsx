import Image from "next/image";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col justify-start py-32 bg-white dark:bg-black">
        <HeroSection />
      </main>
    </div>
  );
}
