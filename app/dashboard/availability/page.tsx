import { GeneralButton } from "@/app/components/SubmitButton";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { getUserSession, updateAvailability } from "@/app/lib/action";
import { prisma } from "@/app/lib/prisma";
import { times } from "@/app/lib/times";
import { notFound } from "next/navigation";

const getData = async (userId: string) => {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
};
const page = async () => {
  const session = await getUserSession();
  const data = await getData(session?.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          In this section you can make your availability !!
        </CardDescription>
      </CardHeader>
      <form action={updateAvailability}>
        <CardContent className="flex flex-col gap-y-4 mb-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
            >
              <input type="hidden" name={`id-${item.id}`} value={item.id} />
              <div className="flex items-center gap-x-3">
                <Switch
                  name={`isActive-${item.id}`}
                  defaultChecked={item.isActive}
                />
                <p>{item.day}</p>
              </div>

              <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"From Time"} />
                </SelectTrigger>
                <SelectContent className="h-50">
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"Till Time"} />
                </SelectTrigger>
                <SelectContent className="h-50">
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <GeneralButton buttonText="Save Changes" loadingText="Loading" />
        </CardFooter>
      </form>
    </Card>
  );
};
export default page;
