"use client";

import { useState, useEffect } from "react";
import { RetroProject } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ExternalLink, ArrowLeft, TrendingDown, AlertTriangle, ChevronDown } from "lucide-react";

const dropOffData = [
  { step: "튜토리얼 완료", rate: "42%", severity: "high" },
  { step: "첫 유료 아이템 결제", rate: "12%", severity: "medium" },
  { step: "스테이지 5 진입", rate: "28%", severity: "high" },
];

interface ProjectCardProps {
  project: RetroProject;
  isFaded?: boolean;
  onFlip?: (id: string | null) => void;
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

function getFrontStatusColor(status: string) {
  if (status.includes("실패")) return "bg-red-500";
  if (status.includes("중단")) return "bg-amber-500";
  return "bg-gray-500";
}

function getFrontPhaseColor(phase: string) {
  if (phase.includes("Soft Launch")) return "bg-teal-500";
  if (phase.includes("Prototype")) return "bg-blue-500";
  if (phase.includes("FTUE")) return "bg-violet-500";
  if (phase.includes("Creative")) return "bg-pink-500";
  return "bg-gray-500";
}

function getBackStatusStyle(status: string) {
  if (status.includes("실패")) return "bg-red-100 text-red-700";
  if (status.includes("중단")) return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-700";
}

function getBackPhaseStyle(phase: string) {
  if (phase.includes("Soft Launch")) return "bg-teal-100 text-teal-700";
  if (phase.includes("Prototype")) return "bg-blue-100 text-blue-700";
  if (phase.includes("FTUE")) return "bg-violet-100 text-violet-700";
  if (phase.includes("Creative")) return "bg-pink-100 text-pink-700";
  return "bg-gray-100 text-gray-700";
}

const BAR_HEIGHTS = [48, 41, 29, 22, 14, 12, 10];

export function ProjectCard({ project, isFaded = false, onFlip }: ProjectCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showDropoff, setShowDropoff] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleFlipOn = () => {
    setIsFlipped(true);
    onFlip?.(project.id);
  };

  const handleFlipOff = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setShowMetrics(false);
    setShowDropoff(false);
    onFlip?.(null);
  };

  // SSR과 클라이언트 첫 렌더를 일치시켜 hydration mismatch 방지
  if (!mounted) {
    return (
      <div className="relative min-h-[420px] w-full rounded-xl border border-border bg-card shadow-sm" />
    );
  }

  return (
    <div
      className={cn(
        "relative min-h-[420px] w-full [perspective:1200px]",
        isFlipped ? "z-50" : "z-0",
        isFaded && "pointer-events-none opacity-40 blur-[2px]"
      )}
    >
      {/* Flip container */}
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d]",
          isFlipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* ── FRONT ── */}
        <div
          className={cn(
            "absolute inset-0 flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md [backface-visibility:hidden]",
            isFlipped && "pointer-events-none"
          )}
          onClick={handleFlipOn}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <img
              src={thumbnailImages[project.id] || thumbnailImages["rf-001"]}
              alt={project.projectName}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute left-2 top-2 flex gap-1.5">
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium text-white", getFrontStatusColor(project.status))}>
                {project.status.includes("실패") ? "Failed" : project.status.includes("중단") ? "Paused" : "Hold"}
              </span>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium text-white", getFrontPhaseColor(project.phase))}>
                {project.phase}
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="mb-2 text-base font-semibold text-foreground">{project.projectName}</h3>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.failureTags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-700">
                  #{tag}
                </span>
              ))}
            </div>
            <p className="mb-4 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">
              {project.oneLineSummary}
            </p>
            <button className="w-full rounded-lg bg-violet-600 py-2 text-xs font-medium text-white transition-colors hover:bg-violet-700">
              View Details
            </button>
          </div>
        </div>

        {/* ── BACK ── 앞면과 동일한 absolute inset-0으로 고정 크기 유지 */}
        <div
          className="absolute inset-0 flex flex-col overflow-y-auto rounded-xl border border-violet-200 bg-white shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          {/* 상단 accent */}
          <div style={{ height: "4px", flexShrink: 0, background: "linear-gradient(to right, #a78bfa, #7c3aed)" }} />

          {/* Header */}
          <div style={{ flexShrink: 0, borderBottom: "1px solid #e5e7eb", padding: "12px 16px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <span style={{ borderRadius: "9999px", background: "#ede9fe", color: "#6d28d9", fontSize: "10px", fontWeight: 500, padding: "2px 10px" }}>
                Case Insights
              </span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-medium", getBackStatusStyle(project.status))}>
                {project.status.includes("실패") ? "Failed" : project.status.includes("중단") ? "Paused" : "Hold"}
              </span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-medium", getBackPhaseStyle(project.phase))}>
                {project.phase}
              </span>
            </div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>{project.projectName}</h3>
            <div style={{ marginTop: "4px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.failureTags.map((tag) => (
                <span key={tag} style={{ fontSize: "11px", color: "#6b7280" }}>#{tag}</span>
              ))}
            </div>
          </div>

          {/* 핵심 인사이트 — 항상 노출 */}
          <div style={{ flexShrink: 0, padding: "12px 16px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}>핵심 인사이트</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
              {project.insights.map((insight, i) => (
                <li key={i} style={{ display: "flex", gap: "8px", fontSize: "12px", lineHeight: 1.5, color: "#6b7280" }}>
                  <span style={{ color: "#a78bfa", flexShrink: 0 }}>•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          {/* 메트릭 스냅샷 — accordion */}
          <div style={{ flexShrink: 0, borderTop: "1px solid #e5e7eb" }}>
            <button
              onClick={(e) => { e.stopPropagation(); setShowMetrics((v) => !v); }}
              style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <TrendingDown style={{ width: "14px", height: "14px", color: "#8b5cf6" }} />
                <span style={{ fontSize: "12px", fontWeight: 600 }}>메트릭 스냅샷</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "11px", color: "#9ca3af" }}>{project.period}</span>
                <ChevronDown style={{ width: "14px", height: "14px", color: "#9ca3af", transition: "transform 0.2s", transform: showMetrics ? "rotate(180deg)" : "rotate(0deg)" }} />
              </div>
            </button>
            <div style={{ maxHeight: showMetrics ? "72px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease-in-out" }}>
              <div style={{ background: "#f5f3ff", padding: "8px 16px" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "48px" }}>
                  {BAR_HEIGHTS.map((px, i) => (
                    <div key={i} style={{ flex: 1, height: `${px}px`, background: "#a78bfa", borderRadius: "2px 2px 0 0" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 주요 이탈 구간 — accordion */}
          <div style={{ flexShrink: 0, borderTop: "1px solid #e5e7eb" }}>
            <button
              onClick={(e) => { e.stopPropagation(); setShowDropoff((v) => !v); }}
              style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <AlertTriangle style={{ width: "14px", height: "14px", color: "#8b5cf6" }} />
                <span style={{ fontSize: "12px", fontWeight: 600 }}>주요 이탈 구간</span>
              </div>
              <ChevronDown style={{ width: "14px", height: "14px", color: "#9ca3af", transition: "transform 0.2s", transform: showDropoff ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>
            <div style={{ maxHeight: showDropoff ? "200px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease-in-out" }}>
              <table style={{ width: "100%", borderTop: "1px solid #e5e7eb", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f9fafb" }}>
                    <th style={{ padding: "6px 16px", textAlign: "left", fontSize: "11px", fontWeight: 500, color: "#6b7280" }}>단계</th>
                    <th style={{ padding: "6px 16px", textAlign: "left", fontSize: "11px", fontWeight: 500, color: "#6b7280" }}>이탈률</th>
                    <th style={{ padding: "6px 16px", textAlign: "left", fontSize: "11px", fontWeight: 500, color: "#6b7280" }}>영향도</th>
                  </tr>
                </thead>
                <tbody>
                  {dropOffData.map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "8px 16px", fontSize: "12px" }}>{row.step}</td>
                      <td style={{ padding: "8px 16px", fontSize: "12px", fontWeight: 600, color: "#7c3aed" }}>{row.rate}</td>
                      <td style={{ padding: "8px 16px" }}>
                        <span style={{
                          borderRadius: "9999px",
                          padding: "2px 8px",
                          fontSize: "10px",
                          fontWeight: 500,
                          background: row.severity === "high" ? "#fee2e2" : "#fef3c7",
                          color: row.severity === "high" ? "#b91c1c" : "#b45309",
                        }}>
                          {row.severity === "high" ? "High" : "Medium"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions — mt-auto pushes to bottom */}
          <div style={{ marginTop: "auto", display: "flex", gap: "8px", borderTop: "1px solid #e5e7eb", padding: "12px" }}>
            <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", borderRadius: "8px", background: "#7c3aed", color: "white", border: "none", padding: "8px", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>
              <ExternalLink style={{ width: "14px", height: "14px" }} />
              View Retrospective
            </button>
            <button
              onClick={handleFlipOff}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", borderRadius: "8px", background: "white", border: "1px solid #e5e7eb", padding: "8px 16px", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}
            >
              <ArrowLeft style={{ width: "14px", height: "14px" }} />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
