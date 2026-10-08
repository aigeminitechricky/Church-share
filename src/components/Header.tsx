import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  History,
  RotateCcw,
  BookOpen,
  Maximize2,
  Minimize2,
  Columns,
  ArrowUpToLine
} from 'lucide-react';
import { SCRIPTURES } from '../data/initialData';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHistory: () => void;
  historyCount: number;
  onResetAll: () => void;
  layoutMode: 'members-top' | 'side-by-side';
  onToggleLayout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenHistory,
  historyCount,
  onResetAll,
  layoutMode,
  onToggleLayout,
}) => {
  const [scriptureIndex, setScriptureIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentScripture = SCRIPTURES[scriptureIndex];

  const handleNextScripture = () => {
    setScriptureIndex((prev) => (prev + 1) % SCRIPTURES.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-amber-100/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm shadow-amber-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-stone-800 tracking-tight">
                教會小組分享抽籤器
              </h1>
              <span className="text-[11px] font-medium px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full">
                團契聚會
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block">
              左選 3 個分享題目 · 右抽 1 位分享肢體 · 彼此相顧激發愛心
            </p>
          </div>
        </div>

        {/* Scripture Box */}
        <div 
          onClick={handleNextScripture}
          title="點擊切換經文金句"
          className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-50/80 hover:bg-amber-50/70 border border-stone-200/60 transition-colors max-w-xl text-center md:text-left"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-xs text-stone-600 line-clamp-1 italic">
            {currentScripture.verse}
          </span>
          <span className="text-[11px] text-amber-700 font-medium shrink-0">
            — {currentScripture.reference}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Layout Mode Toggle */}
          <button
            onClick={onToggleLayout}
            title={layoutMode === 'members-top' ? '目前：組員名單在最上（點擊切換為左右並排）' : '目前：左右並排（點擊切換為組員名單在最上）'}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50/90 hover:bg-blue-100 border border-blue-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            {layoutMode === 'members-top' ? (
              <>
                <ArrowUpToLine className="w-3.5 h-3.5 text-blue-600" />
                <span>名單在最上</span>
              </>
            ) : (
              <>
                <Columns className="w-3.5 h-3.5 text-stone-600" />
                <span>左右並排</span>
              </>
            )}
          </button>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? '關閉音效' : '開啟音效'}
            className={`p-2 rounded-lg border transition-colors ${
              soundEnabled
                ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                : 'bg-stone-100 border-stone-200 text-stone-400 hover:text-stone-600'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg shadow-2xs transition-colors"
          >
            <History className="w-3.5 h-3.5 text-stone-500" />
            <span>分享紀錄</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? '退出全螢幕' : '投影/全螢幕模式'}
            className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors hidden sm:inline-flex"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onResetAll}
            title="重設分享狀態"
            className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-stone-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
