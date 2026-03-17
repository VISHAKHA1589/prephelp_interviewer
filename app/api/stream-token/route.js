import { auth } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_SECRET_KEY
  );

  // Single token works for both Video and Chat SDKs
  const token = client.generateUserToken({
    user_id: userId,
    validity_in_seconds: 60 * 60, // 1 hour
  });

  return Response.json({ token });
}
