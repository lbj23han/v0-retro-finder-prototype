"use client";

import { RetroProject } from "@/lib/mock-data";
import { X, ExternalLink, ArrowLeft, TrendingDown, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectDetailOverlayProps {
  project: RetroProject | null;
  onClose: () => void;
}

function getStatusColor(status: string) {
  if (status.includes("실패")) return "bg-red-100 text-red-700";
  if (status.includes("중단")) return "bg-amber-100 text-amber-700";
  if (status.includes("종료")) return "bg-gray-100 text-gray-700";
  return "bg-gray-100 text-gray-700";
}

function getPhaseColor(phase: string) {
  if (phase.includes("Soft Launch")) return "bg-teal-100 text-teal-700";
  if (phase.includes("Prototype")) return "bg-blue-100 text-blue-700";
  if (phase.includes("FTUE")) return "bg-violet-100 text-violet-700";
  if (phase.includes("Creative")) return "bg-pink-100 text-pink-700";
  return "bg-gray-100 text-gray-700";
}

const dropOffData = [
  { step: "튜토리얼 완료", rate: "42%", severity: "high" },
  { step: "첫 유료 아이템 결제", rate: "12%", severity: "medium" },
  { step: "스테이지 5 진입", rate: "28%", severity: "high" },
];

export function ProjectDetailOverlay({ project, onClose }: ProjectDetailOverlayProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Detail Card */}
      <div className="relative z-10 mx-4 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-1.5 text-muted-foreground shadow-sm hover:bg-white hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">
                Case Insights
              </span>
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", getStatusColor(project.status))}>
                {project.status.includes("실패") ? "Failed" : project.status.includes("중단") ? "Paused" : "Hold"}
              </span>
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", getPhaseColor(project.phase))}>
                {project.phase}
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">{project.projectName}</h2>
            <div className="flex flex-wrap gap-2">
              {project.failureTags.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metric Snapshot */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">메트릭 스냅샷</span>
              </div>
              <span className="text-xs text-muted-foreground">{project.period}</span>
            </div>
            <div className="h-16 rounded-lg bg-gradient-to-r from-violet-50 to-violet-100 p-3">
              <div className="flex h-full items-end gap-1">
                {[100, 85, 60, 45, 30, 25, 20].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-violet-400"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Key Drop-offs */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">주요 이탈 구간 (KEY DROP-OFFS)</span>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">단계 (Step)</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">이탈률</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">영향도</th>
                  </tr>
                </thead>
                <tbody>
                  {dropOffData.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 text-sm text-foreground">{row.step}</td>
                      <td className="px-4 py-2.5 text-sm text-violet-600">{row.rate}</td>
                      <td className="px-4 py-2.5">
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          row.severity === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {row.severity === "high" ? "High" : "Medium"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights */}
          <div className="mb-6">
            <h4 className="mb-2 text-sm font-medium text-foreground">핵심 인사이트</h4>
            <ul className="space-y-1.5">
              {project.insights.map((insight, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-violet-500">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          {/* Project Timeline */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">프로젝트 타임라인</span>
            </div>
            <div className="flex items-center gap-3">
              {["Concept", "Prototype", "Test", "Review"].map((phase, i) => (
                <div key={phase} className="flex items-center gap-2">
                  <div className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
                    i <= 2 ? "bg-violet-100 text-violet-700" : "bg-muted text-muted-foreground"
                  )}>
                    {i + 1}
                  </div>
                  {i < 3 && <div className={cn("h-0.5 w-8", i < 2 ? "bg-violet-300" : "bg-muted")} />}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-700">
              <ExternalLink className="h-4 w-4" />
              View Source Retrospective
            </button>
            <button
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-white py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Flip Back to Cards
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="border-t border-border bg-muted/30 px-6 py-3">
          <p className="text-center text-xs text-muted-foreground">
            이 인사이트는 최신 50개의 프로젝트 회고를 바탕으로 AI가 생성했습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
