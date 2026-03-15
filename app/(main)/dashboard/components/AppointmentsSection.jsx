"use client";

import Link from "next/link";
import { GrayTitle } from "@/components/reusables";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ClipboardList } from "lucide-react";

const STATUS_STYLES = {
  SCHEDULED: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  COMPLETED: "border-green-500/20 bg-green-500/10 text-green-400",
  CANCELLED: "border-red-500/20 bg-red-500/10 text-red-400",
};

const RATING_LABEL = {
  POOR: "Poor",
  AVERAGE: "Average",
  GOOD: "Good",
  EXCELLENT: "Excellent",
};

function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function AppointmentRow({ booking }) {
  const {
    interviewee,
    startTime,
    endTime,
    status,
    creditsCharged,
    streamCallId,
    recordingUrl,
    feedback,
  } = booking;

  return (
    <div className="flex flex-col gap-3 bg-[#141417] border border-white/8 rounded-xl p-5 hover:border-white/15 transition-colors">
      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border border-white/10">
            <AvatarImage src={interviewee.imageUrl} alt={interviewee.name} />
            <AvatarFallback className="bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-medium">
              {interviewee.name?.[0] ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-stone-200">
              {interviewee.name}
            </p>
            <p className="text-xs text-stone-600">{interviewee.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className={STATUS_STYLES[status]}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </Badge>
          <Badge
            variant="outline"
            className="border-amber-400/20 bg-amber-400/5 text-amber-400"
          >
            +{creditsCharged} credits
          </Badge>
        </div>
      </div>

      {/* Time */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <span>🗓</span>
        <span>
          {formatDateTime(startTime)} → {formatTime(endTime)}
        </span>
      </div>

      {/* Bottom actions row */}
      {(recordingUrl || streamCallId || feedback) && (
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          {recordingUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={recordingUrl} target="_blank" rel="noopener noreferrer">
                📹 Recording
              </a>
            </Button>
          )}
          {streamCallId && status === "SCHEDULED" && (
            <Button
              variant="outline"
              size="sm"
              className="border-amber-400/20 bg-amber-400/5 text-amber-400 hover:bg-amber-400/10"
              asChild
            >
              <Link href={`/call/${streamCallId}`}>Join call →</Link>
            </Button>
          )}
          {feedback && (
            <Badge variant="outline" className="border-white/10 text-stone-500">
              AI Feedback: {RATING_LABEL[feedback.overallRating]}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export default function AppointmentsSection({ appointments }) {
  const scheduled = appointments.filter((a) => a.status === "SCHEDULED");
  const past = appointments.filter((a) => a.status !== "SCHEDULED");

  return (
    <section className="bg-[#0f0f11] border border-white/10 rounded-2xl p-8 flex flex-col gap-7">
      <div>
        <span className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-lg mb-4">
          <ClipboardList size={18} className="text-amber-400" />
        </span>
        <h2 className="font-serif text-xl tracking-tight">
          <GrayTitle>Appointments</GrayTitle>
        </h2>
        <p className="text-xs text-stone-500 font-light mt-1">
          All your scheduled and past sessions.
        </p>
      </div>

      <div className="h-px bg-white/5" />

      {appointments.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-stone-600 text-sm">No appointments yet.</p>
          <p className="text-stone-700 text-xs mt-1">
            Once interviewees book your slots, they&apos;ll appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {scheduled.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-stone-500 tracking-widest uppercase">
                Upcoming ({scheduled.length})
              </p>
              {scheduled.map((b) => (
                <AppointmentRow key={b.id} booking={b} />
              ))}
            </div>
          )}

          {past.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-stone-500 tracking-widest uppercase">
                Past ({past.length})
              </p>
              {past.map((b) => (
                <AppointmentRow key={b.id} booking={b} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
