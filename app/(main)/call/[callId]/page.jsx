import { currentUser } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import { StreamClient } from "@stream-io/node-sdk";
import CallRoom from "./_components/CallRoom";

export default async function CallPage({ params }) {
  const { callId } = await params;

  const user = await currentUser();
  if (!user) redirect("/");

  // Fetch booking + both participants
  const booking = await db.booking.findUnique({
    where: { streamCallId: callId },
    include: {
      interviewer: {
        select: {
          id: true,
          clerkUserId: true,
          name: true,
          imageUrl: true,
          categories: true,
        },
      },
      interviewee: {
        select: {
          id: true,
          clerkUserId: true,
          name: true,
          imageUrl: true,
        },
      },
    },
  });

  if (!booking) notFound();

  // Only the two participants can access this call
  const isInterviewer = booking.interviewer.clerkUserId === user.id;
  const isInterviewee = booking.interviewee.clerkUserId === user.id;
  if (!isInterviewer && !isInterviewee) redirect("/");

  // Generate Stream token server-side
  const streamClient = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_SECRET_KEY
  );

  const token = streamClient.generateUserToken({
    user_id: user.id,
    validity_in_seconds: 60 * 60,
  });

  return (
    <CallRoom
      callId={callId}
      token={token}
      apiKey={process.env.NEXT_PUBLIC_STREAM_API_KEY}
      currentUser={{
        id: user.id,
        name: `${user.firstName} ${user.lastName}`.trim(),
        imageUrl: user.imageUrl,
      }}
      booking={{
        id: booking.id,
        interviewer: booking.interviewer,
        interviewee: booking.interviewee,
        categories: booking.interviewer.categories,
        startTime: booking.startTime.toISOString(),
        endTime: booking.endTime.toISOString(),
      }}
      isInterviewer={isInterviewer}
    />
  );
}
