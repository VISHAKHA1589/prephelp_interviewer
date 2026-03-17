"use client";

import { useState } from "react";
import { Coins } from "lucide-react";
import UpgradeModal from "./UpgradeModal";
import { Button } from "./ui/button";

export default function CreditButton({ role, credits }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="border-amber-400/20 text-amber-400 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Coins size={14} />
        <span className=" opacity-70">
          {credits} {role === "INTERVIEWER" ? "Earned" : "Credits"}
        </span>
      </Button>

      <UpgradeModal open={open} onOpenChange={setOpen} />
    </>
  );
}
