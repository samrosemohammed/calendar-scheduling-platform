import { AuthDialog } from "./AuthDialog";

export const Cta = () => {
  return (
    <section className="my-20 relative isolate overflow-hidden px-6 py-20 text-center sm:rounded-3xl sm:border sm:shadow-sm">
      <h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
        Start uinsg CalScheduler!
      </h2>
      <p className="max-w-xl mx-auto text-muted-foreground mt-6 text-lg leading-8">
        Scheduling meetings has never been easier. Sign up now and experience
        the ease of scheduling with CalScheduler.
      </p>
      <div className="mt-6">
        <AuthDialog />
      </div>
    </section>
  );
};
