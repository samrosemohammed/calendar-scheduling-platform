import { redirect } from "next/navigation";
import { NavBar } from "./components/Navbar";
import { auth } from "./lib/auth";
import { Hero } from "./components/Hero";
import { Logos } from "./components/Logos";
import { Feature } from "./components/Feature";
import { Testimonial } from "./components/Testimonial";
import { Cta } from "./components/Cta";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
      <Hero />
      <Logos />
      <Feature />
      <Testimonial />
      <Cta />
    </div>
  );
}
