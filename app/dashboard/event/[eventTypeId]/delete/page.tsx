import { GeneralButton } from "@/app/components/SubmitButton";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { deleteEventTypeAction } from "@/app/lib/action";
import Link from "next/link";

const page = async ({
  params,
}: {
  params: Promise<{ eventTypeId: string }>;
}) => {
  const { eventTypeId } = await params;
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle>Delete Event Type</CardTitle>
          <CardDescription>
            This action cannot be undone. All associated bookings will be
            removed.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button variant={"secondary"} asChild>
            <Link href={"/dashboard"}>Cancel</Link>
          </Button>
          <form action={deleteEventTypeAction}>
            <input type="hidden" name="id" value={eventTypeId} />
            <GeneralButton
              buttonText="Delete"
              variant={"destructive"}
              loadingText="Loading"
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};
export default page;
