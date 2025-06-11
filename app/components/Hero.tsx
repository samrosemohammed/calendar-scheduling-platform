import Image from "next/image";
import { AuthDialog } from "./AuthDialog";
import HeroImage from "@/public/hero-image.png";

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
          Introducing CalScheduler 1.0
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
          Scheduling made{" "}
          <span className="-mt-2 block text-primary">super easy!</span>
        </h1>
        <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
          Scheduling a meeting can be a pain. But we at CalScheduler made it
          easy for your client to schedule meeting with you.
        </p>
        <div className="mt-5 mb-12">
          <AuthDialog />
        </div>
        <div className="relative items-center w-full py-12 mx-auto mt-12">
          <Image
            className="relative w-full border rounded-lg shadow-2xl lg:rounded-lg-2xl"
            src={HeroImage}
            alt="Hero Image"
          />
        </div>
      </div>
    </section>
  );
};
