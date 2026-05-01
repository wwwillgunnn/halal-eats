"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Utensils } from "lucide-react";
import { useState } from "react";

export function HalalTierToggle() {
  const [tier, setTier] = useState<"fully-halal" | "halal-options">(
    "fully-halal",
  );

  return (
    <Tabs
      value={tier}
      onValueChange={(value) =>
        setTier(value as "fully-halal" | "halal-options")
      }
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="fully-halal">
          <ShieldCheck /> Fully
        </TabsTrigger>

        <TabsTrigger value="halal-options">
          <Utensils /> Partial
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
