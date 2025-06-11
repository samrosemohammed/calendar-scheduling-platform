import { Check } from "lucide-react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[400px] w-full mx-auto">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="size-16 bg-green-500/10 rounded-full flex items-center justify-center">
            <Check className="size-8 text-green-500" />
          </div>
          <h1 className="mt-4 font-semibold text-2xl">
            This event is scheduled
          </h1>
          <p className="text-center text-sm text-muted-foreground mt-1">
            We emailed you a calendar invitation with all the details and video
            call link !!
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href={"/"}>Close this page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default page;
