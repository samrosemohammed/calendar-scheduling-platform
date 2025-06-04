import { getUserSession } from "@/app/lib/action";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getUserSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Code not provided" }, { status: 400 });
  }
  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      code,
      redirectUri: nylasConfig.redirectUri,
    });
    const { grantId, email } = response;
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        grantId: grantId,
        grantEmail: email,
      },
    });
    console.log("Nylas grantId:", grantId);
  } catch (err) {
    console.error("Error exchanging code for token:", err);
    return NextResponse.json(
      { error: "Failed to link Nylas account" },
      { status: 500 }
    );
  }
  redirect("/dashboard");
};
