import Image from "next/image";
import Nextjs from "@/public/next.svg";
import Vercel from "@/public/vercel-logotype-light.svg";
import Turbo from "@/public/turborepo-logotype-light-background.svg";
import Supabase from "@/public/supabase-logo-wordmark--light.png";
import Nylas from "@/public/nylas.png";
export const Logos = () => {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Tech Stack that powers CalScheduler
      </h2>
      <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <Image
          src={Nextjs}
          alt="Logo"
          className="col-span-2 w-full max-h-12 object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={Vercel}
          alt="Logo"
          className="col-span-2 w-full max-h-12 object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={Turbo}
          alt="Logo"
          className="col-span-2 w-full max-h-12 object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={Supabase}
          alt="Logo"
          className="col-span-2 w-full max-h-12 object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={Nylas}
          alt="Logo"
          className="col-span-2 w-full max-h-12 object-contain lg:col-span-1 dark:invert"
        />
      </div>
    </div>
  );
};
