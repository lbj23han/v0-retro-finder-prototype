"use client";

import { Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RetroHeader() {
  return (
    <header className="fixed left-52 right-0 top-0 z-30 flex h-14 items-center justify-end border-b border-border bg-background px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1">
          <Sparkles className="h-3.5 w-3.5 text-violet-600" />
          <span className="text-xs font-medium text-violet-700">AI Insights Active</span>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
          <AvatarFallback className="bg-violet-100 text-xs text-violet-700">PM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
