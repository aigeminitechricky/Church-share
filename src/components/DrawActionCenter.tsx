import React from 'react';
import { Sparkles, Dice3, Users, Shuffle, ArrowRight, UserCheck } from 'lucide-react';

interface DrawActionCenterProps {
  onDrawMemberFirst: () => void;
  onDrawSequential: () => void;
  onDrawBoth: () => void;
  onDrawTopics: () => void;
  isDrawing: boolean;
  activeTopicsCount: number;
  presentMembersCount: number;
  unsharedCount: number;
  avoidRepeat?: boolean;
  onToggleAvoidRepeat?: () => void;
}

export const DrawActionCenter: React.FC<DrawActionCenterProps> = ({
  onDrawMemberFirst,
  onDrawSequential,
  onDrawBoth,
  onDrawTopics,
  isDrawing,
  activeTopicsCount,
  presentMembersCount,
  unsharedCount,
}) => {
  const canDrawMember = unsharedCount > 0;
  const canDrawTopics = activeTopicsCount >= 3;
  const canDrawBoth = canDrawTopics && canDrawMember;

  return (
    <div className="bg-gradient-to-r from-blue-500/10 via-amber-500/10 to-indigo-500/10 rounded-2xl border border-blue-200/80 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left guide message */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold">
              推薦分享流程
            </span>
            <h3 className="font-bold text-stone-800 text-base sm:text-lg">
              小組分享抽籤工作台
            </h3>
          </div>
          <p className="text-xs text-stone-600">
            可選擇 <span className="font-semibold text-blue-700">「先隨機選出分享人物」</span> 再為他抽選 3 個題目，或一鍵連鎖抽出！
          </p>
        </div>

        {/* Big Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full lg:w-auto">
          {/* Priority Button 1: Draw Member First */}
          <button
            onClick={onDrawMemberFirst}
            disabled={isDrawing || !canDrawMember}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-400/30 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 transform active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title={
              canDrawMember
                ? `隨機選出分享人物（剩餘 ${unsharedCount} 位未抽中）`
                : '所有出席肢體皆已抽中分享，請先點擊「清空已分享」重設！'
            }
          >
            <UserCheck className="w-4 h-4 text-blue-200" />
            <span>🎯 先抽分享人物 ({unsharedCount})</span>
          </button>

          {/* Sequential 2-step button: Member first -> then Topics */}
          <button
            onClick={onDrawSequential}
            disabled={isDrawing || !canDrawBoth}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-300/40 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 transform active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
            title={
              canDrawBoth
                ? '自動兩段式：先抽人物，公佈後自動為他抽出 3 個題目'
                : canDrawMember
                ? '啟用題目不足 3 個'
                : '所有人皆已抽中分享，請先點擊清空已分享重設！'
            }
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform text-amber-200" />
            <span>✨ 先抽人物 ➔ 抽 3 題</span>
          </button>

          {/* Draw Topics Only */}
          <button
            onClick={onDrawTopics}
            disabled={isDrawing || !canDrawTopics}
            className="px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white hover:bg-amber-50 text-amber-900 text-xs sm:text-sm font-semibold shadow-2xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
            title="僅隨機抽取 3 個題目"
          >
            <Dice3 className="w-4 h-4 text-amber-600" />
            <span>只抽 3 個題目</span>
          </button>

          {/* Master Draw Both Button */}
          <button
            onClick={onDrawBoth}
            disabled={isDrawing || !canDrawBoth}
            className="px-3 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="同時揭曉 3 個題目與 1 位人物"
          >
            <Shuffle className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">同時抽出</span>
            <span className="sm:hidden">同時</span>
          </button>
        </div>

        {/* Anti-repeat rule indicator */}
        <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-white/90 px-3 py-1.5 rounded-xl border border-stone-200/90 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
          <span>
            嚴格不重複：抽中自動標記灰色排除，直到 Reset（待抽中 <strong>{unsharedCount}</strong> 位）
          </span>
        </div>
      </div>
    </div>
  );
};
