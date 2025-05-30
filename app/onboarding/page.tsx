import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="">
          <CardTitle className="text-2xl font-semibold">
            Welcom to Cal<span className="text-primary">Scheduler</span>
          </CardTitle>
          <CardDescription>
            We need the following information to set up your profile !
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-5">
          <form className="space-y-4">
            <div className="grid gap-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                name="full-name"
                id="full-name"
                placeholder="Mohammed Samrose"
              />
            </div>
            <div className="grid gap-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  CalScheduler.com/
                </span>
                <Input
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default page;
