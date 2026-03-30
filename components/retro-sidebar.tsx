"use client";

import { Search, Filter, LayoutDashboard, History, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { statusFilters } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface RetroSidebarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  isSearching: boolean;
}

export function RetroSidebar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  selectedStatus,
  onStatusChange,
  isSearching,
}: RetroSidebarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-52 flex-col border-r border-border bg-background">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
            <span className="text-xs font-bold text-white">RF</span>
          </div>
          <span className="text-sm font-semibold text-foreground">Retro Finder</span>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex flex-col gap-4 p-4">
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            AI Case Search
          </p>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="과거 실패 사례 검색..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSearching}
              className="h-8 pl-8 text-xs"
            />
          </div>
        </div>

        {/* Filters */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Filters
            </p>
            <button
              onClick={() => onStatusChange("all")}
              className="text-[10px] text-muted-foreground hover:text-foreground"
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col gap-0.5">
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onStatusChange(filter.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors",
                  selectedStatus === filter.id
                    ? "bg-violet-50 text-violet-700"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Filter className="h-3 w-3" />
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-2 flex flex-col gap-0.5 px-4">
        <button className="flex items-center gap-2 rounded-md bg-violet-50 px-2 py-1.5 text-xs font-medium text-violet-700">
          <LayoutDashboard className="h-3.5 w-3.5" />
          Dashboard
        </button>
        <button className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
          <History className="h-3.5 w-3.5" />
          History
        </button>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-border p-4">
        <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
          <Settings className="h-3.5 w-3.5" />
          Settings
        </button>
      </div>
    </aside>
  );
}
