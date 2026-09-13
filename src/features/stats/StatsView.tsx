import React from "react";
import { UserStatistics, CumulativeCategoryStats, calculateStudyNextRecommendation } from "../../domain/scoring/statistics.ts";
import { BarChart3, CheckCircle2, Clock, RotateCcw, Lightbulb, Trash2, ArrowLeft } from "lucide-react";

interface StatsViewProps {
  stats: UserStatistics;
  reviewQueueCount: number;
  onResetStats: () => void;
  onBack: () => void;
  onStartStudyRecommended: (category: string) => void;
}

export const StatsView: React.FC<StatsViewProps> = ({
  stats,
  reviewQueueCount,
  onResetStats,
  onBack,
  onStartStudyRecommended,
}) => {
  const recommendation = calculateStudyNextRecommendation(stats);
  const categoriesList: CumulativeCategoryStats[] = Object.values(stats.categories || {});

  const totalMinutes = Math.round(stats.totalPracticeTimeSeconds / 60);

  return (
    <div id="stats-viewport" className="max-w-4xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#D9DED9]">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5D6870] hover:text-[#172026] mb-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Practice</span>
          </button>
          <h1 className="text-2xl font-bold text-[#172026]">Your Practice Statistics</h1>
          <p className="text-xs sm:text-sm text-[#5D6870] mt-0.5">
            Transparent metrics derived solely from your browser sessions.
          </p>
        </div>

        {stats.totalSessionsCompleted > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all local progress statistics?")) {
                onResetStats();
              }
            }}
            className="px-3 py-1.5 rounded-lg border border-[#D9DED9] text-xs font-medium text-[#B42318] hover:bg-[#FDECEA] flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset History</span>
          </button>
        )}
      </div>

      {/* Aggregate metric cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-[#D9DED9] rounded-xl shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#5D6870]">
            Sessions Finished
          </div>
          <div className="text-3xl font-black text-[#172026] mt-1">
            {stats.totalSessionsCompleted}
          </div>
          <div className="text-[11px] text-[#5D6870] mt-0.5">completed drills</div>
        </div>

        <div className="p-4 bg-white border border-[#D9DED9] rounded-xl shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            Overall Accuracy
          </div>
          <div className="text-3xl font-black text-[#0F766E] mt-1">
            {stats.overallAccuracy}%
          </div>
          <div className="text-[11px] text-[#5D6870] mt-0.5">
            {stats.totalCorrectAnswers} / {stats.totalQuestionsAnswered} correct
          </div>
        </div>

        <div className="p-4 bg-white border border-[#D9DED9] rounded-xl shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#5D6870]">
            Total Time
          </div>
          <div className="text-3xl font-black text-[#172026] mt-1">
            {totalMinutes}m
          </div>
          <div className="text-[11px] text-[#5D6870] mt-0.5">focused training</div>
        </div>

        <div className="p-4 bg-white border border-[#D9DED9] rounded-xl shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-[#B42318]">
            Review Queue
          </div>
          <div className="text-3xl font-black text-[#B42318] mt-1">
            {reviewQueueCount}
          </div>
          <div className="text-[11px] text-[#5D6870] mt-0.5">items to consolidate</div>
        </div>
      </div>

      {/* Recommended Study Target */}
      {recommendation && (
        <div className="p-5 rounded-xl bg-[#CCFBF1]/40 border border-[#0F766E]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                Recommended Target Area
              </h3>
              <div className="text-base font-bold capitalize text-[#172026] mt-0.5">
                {recommendation.category.replace("-", " ")}
              </div>
              <p className="text-xs text-[#5D6870] mt-0.5">{recommendation.reason}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onStartStudyRecommended(recommendation.category)}
            className="px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white rounded-lg text-xs font-semibold cursor-pointer shrink-0"
          >
            Practice This Category
          </button>
        </div>
      )}

      {/* Category Performance Breakdown */}
      <div className="p-6 bg-white border border-[#D9DED9] rounded-xl shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#5D6870]">
          Domain Proficiency
        </h3>

        {categoriesList.length === 0 ? (
          <p className="text-xs text-[#5D6870]">
            Complete your first session to view per-category accuracy breakdowns.
          </p>
        ) : (
          <div className="divide-y divide-[#E7EBE7]">
            {categoriesList.map((cat) => {
              const accuracy =
                cat.attempts > 0 ? Math.round((cat.correct / cat.attempts) * 100) : 0;
              return (
                <div key={cat.category} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-semibold capitalize text-[#172026] block">
                      {cat.category.replace("-", " ")}
                    </span>
                    <span className="text-xs text-[#5D6870]">
                      {cat.correct} / {cat.attempts} correct ({cat.unanswered} skipped)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-28 h-2 bg-[#E7EBE7] rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-[#0F766E] rounded-full"
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono font-bold text-[#172026] w-12 text-right">
                      {accuracy}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Sessions */}
      <div className="p-6 bg-white border border-[#D9DED9] rounded-xl shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#5D6870]">
          Recent Sessions History
        </h3>

        {stats.recentResults.length === 0 ? (
          <p className="text-xs text-[#5D6870]">No recent sessions recorded yet.</p>
        ) : (
          <div className="divide-y divide-[#E7EBE7]">
            {stats.recentResults.map((r, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#F6F8F6] font-semibold uppercase text-[10px] text-[#5D6870] border border-[#D9DED9]">
                    {r.mode}
                  </span>
                  <span className="text-[#5D6870]">
                    {new Date(r.completedAt).toLocaleDateString()} at{" "}
                    {new Date(r.completedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="font-mono font-bold text-[#172026]">
                  {r.mode === "assessment" ? `${r.scorePercentage}% Score` : `${r.accuracyPercentage}% Accuracy`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
