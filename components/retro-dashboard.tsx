"use client";

import { useState, useMemo } from "react";
import { RetroSidebar } from "./retro-sidebar";
import { RetroHeader } from "./retro-header";
import { ProjectCard } from "./project-card";
import { retroMockData, searchMapping } from "@/lib/mock-data";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Target,
  Zap,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function RetroDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [appliedSearch, setAppliedSearch] = useState("");
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProjects = useMemo(() => {
    let results = [...retroMockData];

    // Apply status filter
    if (selectedStatus !== "all") {
      results = results.filter((p) => {
        if (selectedStatus === "prototype")
          return p.status.includes("프로토타입");
        if (selectedStatus === "paused") return p.status === "중단";
        if (selectedStatus === "softlaunch")
          return p.status.includes("소프트런치");
        if (selectedStatus === "failed") return p.status === "실패";
        return true;
      });
    }

    // Apply search
    if (appliedSearch) {
      const matchingTags =
        Object.entries(searchMapping).find(([key]) =>
          appliedSearch.includes(key),
        )?.[1] || [];

      if (matchingTags.length > 0) {
        results = results.filter((p) =>
          p.failureTags.some((tag) => matchingTags.includes(tag)),
        );
      } else {
        // Fallback: search in project name, tags, or summary
        const query = appliedSearch.toLowerCase();
        results = results.filter(
          (p) =>
            p.projectName.toLowerCase().includes(query) ||
            p.failureTags.some((tag) => tag.toLowerCase().includes(query)) ||
            p.oneLineSummary.toLowerCase().includes(query),
        );
      }
    }

    return results;
  }, [selectedStatus, appliedSearch]);

  const visibleProjects = filteredProjects.slice(
    currentPage * 3,
    currentPage * 3 + 3,
  );
  const totalPages = Math.ceil(filteredProjects.length / 3);

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) {
      setAppliedSearch("");
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setAppliedSearch(searchQuery);
      setCurrentPage(0);
      setIsSearching(false);
    }, 600);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RetroSidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        isSearching={isSearching}
      />
      <RetroHeader />

      {/* Main Content */}
      <main className="ml-52 pt-14">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="mb-1 text-2xl font-bold text-foreground">
              Project Insight Cards
            </h1>
            <p
              suppressHydrationWarning
              className="mb-4 text-sm text-muted-foreground"
            >
              우리가 실패로 쌓아온 자산, 이제 쉽게 꺼내보세요.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-violet-600" />
              <span
                suppressHydrationWarning
                className="text-xs font-medium text-violet-700"
              >
                AI 검색기능을 활용해 보세요
              </span>
            </div>
          </div>

          {/* Loading State */}
          {isSearching && (
            <div className="flex h-64 items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" />
                <p className="text-sm text-muted-foreground">
                  유사한 실패 패턴을 분석 중...
                </p>
              </div>
            </div>
          )}

          {/* Cards Section */}
          {!isSearching && (
            <>
              {filteredProjects.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white">
                  <p className="mb-2 text-lg font-medium text-foreground">
                    검색 결과가 없습니다
                  </p>
                  <p className="text-sm text-muted-foreground">
                    검색어를 수정하거나 필터 조건을 완화해보세요
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* Navigation Arrows */}
                  {currentPage > 0 && (
                    <button
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white shadow-md transition-shadow hover:shadow-lg"
                    >
                      <ChevronLeft className="h-5 w-5 text-foreground" />
                    </button>
                  )}
                  {currentPage < totalPages - 1 && (
                    <button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white shadow-md transition-shadow hover:shadow-lg"
                    >
                      <ChevronRight className="h-5 w-5 text-foreground" />
                    </button>
                  )}

                  {/* Cards Grid */}
                  <div className="grid grid-cols-3 gap-5">
                    {visibleProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onFlip={(id) => setActiveCardId(id)}
                        isFaded={
                          activeCardId !== null && activeCardId !== project.id
                        }
                      />
                    ))}
                  </div>

                  {/* Pagination Dots */}
                  {totalPages > 1 && (
                    <div className="mt-6 flex justify-center gap-2">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i)}
                          className={cn(
                            "h-2 rounded-full transition-all",
                            i === currentPage
                              ? "w-6 bg-violet-600"
                              : "w-2 bg-gray-300 hover:bg-gray-400",
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Value Summary Boxes */}
          <div className="mt-10 grid grid-cols-3 gap-5">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-violet-50">
                <Target className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold text-foreground">
                  정밀 분석
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  각 카드는 데이터 기반의 상세 회고 수치를 포함하고 있습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-violet-50">
                <Zap className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold text-foreground">
                  빠른 의사결정
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  실패 원인을 즉각적으로 파악하여 다음 스프린트에 반영하십시오.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-violet-50">
                <Database className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold text-foreground">
                  히스토리 추적
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  과거의 보류된 프로젝트를 다시 활성화하기 위한 최적의 시점을
                  찾습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t border-border bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              © 2024 Retro Finder • Proprietary Data
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground">
                  System Operational
                </span>
              </div>
              <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                Privacy Policy
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
