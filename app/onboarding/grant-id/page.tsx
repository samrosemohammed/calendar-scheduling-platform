import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Image from "next/image";
import videoGif from "@/public/giphy.gif";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
import { getUserSession } from "@/app/lib/action";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getUserSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>You are almost there!</CardTitle>
          <CardDescription>
            We have to now connect your calendar to your account.
          </CardDescription>
          <Image
            src={videoGif}
            alt="almost done"
            className="rounded-lg w-full"
          />
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <Link href={"/api/auth"}>
              <CalendarCheck2 className="size-4 my-2" />
              Connect calendar to your account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default page;
