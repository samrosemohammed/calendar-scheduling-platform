import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "./(components)/AppSideBar";
import { ThemeToggle } from "./(components)/ThemeToggle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { auth, signOut } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";
import { getUserSession } from "../lib/action";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });
  if (!data?.username) {
    return redirect("/onboarding");
  }
  return data;
};
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }
  const data = await getData(session.user?.id as string);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        <div className="h-14 flex items-center justify-between px-4 border-b">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={
                      session?.user?.image ?? "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href={"/settings"}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button>Log Out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
