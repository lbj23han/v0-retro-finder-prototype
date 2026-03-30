"use client";

import { RetroProject } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: RetroProject;
  onClick: () => void;
  isFaded?: boolean;
}

const thumbnailImages: Record<string, string> = {
  "rf-001": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
  "rf-002": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=250&fit=crop",
  "rf-003": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop",
  "rf-004": "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&h=250&fit=crop",
  "rf-005": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=250&fit=crop",
  "rf-006": "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=400&h=250&fit=crop",
  "rf-007": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=250&fit=crop",
  "rf-008": "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=250&fit=crop",
};

function getStatusColor(status: string) {
  if (status.includes("실패")) return "bg-red-500";
  if (status.includes("중단")) return "bg-amber-500";
  if (status.includes("종료")) return "bg-gray-500";
  return "bg-gray-500";
}

function getPhaseColor(phase: string) {
  if (phase.includes("Soft Launch")) return "bg-teal-500";
  if (phase.includes("Prototype")) return "bg-blue-500";
  if (phase.includes("FTUE")) return "bg-violet-500";
  if (phase.includes("Creative")) return "bg-pink-500";
  return "bg-gray-500";
}

export function ProjectCard({ project, onClick, isFaded = false }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md",
        isFaded && "pointer-events-none opacity-40 blur-[2px]"
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={thumbnailImages[project.id] || thumbnailImages["rf-001"]}
          alt={project.projectName}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {/* Status Pills */}
        <div className="absolute left-2 top-2 flex gap-1.5">
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium text-white", getStatusColor(project.status))}>
            {project.status.includes("실패") ? "Failed" : project.status.includes("중단") ? "Paused" : "Hold"}
          </span>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium text-white", getPhaseColor(project.phase))}>
            {project.phase}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-base font-semibold text-foreground">{project.projectName}</h3>
        
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.failureTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="mb-4 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">
          {project.oneLineSummary}
        </p>

        {/* CTA */}
        <button className="w-full rounded-lg bg-violet-600 py-2 text-xs font-medium text-white transition-colors hover:bg-violet-700">
          View Details
        </button>
      </div>
    </div>
  );
}
