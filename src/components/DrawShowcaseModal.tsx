import React, { useState, useEffect } from 'react';
import { SharingTopic, GroupMember } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Check, 
  X, 
  Dice3, 
  User, 
  MessageCircle, 
  ChevronRight,
  HeartHandshake,
  RotateCcw,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { AvatarPickerModal } from './AvatarPickerModal';

interface DrawShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTopics: SharingTopic[];
  selectedMember: GroupMember | null;
  onRerollTopics: () => void;
  onRerollMember: () => void;
  onCompleteSharing: (chosenTopicText?: string, note?: string) => void;
  isShuffling: boolean;
  isShufflingTopics?: boolean;
  onUpdateMemberAvatar?: (memberId: string, avatarUrl: string | undefined) => void;
}

export const DrawShowcaseModal: React.FC<DrawShowcaseModalProps> = ({
  isOpen,
  onClose,
  selectedTopics,
  selectedMember,
  onRerollTopics,
  onRerollMember,
  onCompleteSharing,
  isShuffling,
  isShufflingTopics = false,
  onUpdateMemberAvatar,
}) => {
  const [chosenTopicIndex, setChosenTopicIndex] = useState<number | null>(null);
  const [sharingNote, setSharingNote] = useState('');
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  // Confetti on finish roll
  useEffect(() => {
    if (isOpen && !isShuffling && (selectedTopics.length > 0 || selectedMember)) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899'],
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen, isShuffling, selectedTopics, selectedMember]);

  // Reset selected topic and note if reopened or re-rolled
  useEffect(() => {
    if (!isShuffling) {
      setChosenTopicIndex(null);
      setSharingNote('');
    }
  }, [isShuffling, selectedMember, selectedTopics]);

  if (!isOpen) return null;

  const handleFinish = () => {
    const chosenText =
      chosenTopicIndex !== null && selectedTopics[chosenTopicIndex]
        ? selectedTopics[chosenTopicIndex].text
        : undefined;
    onCompleteSharing(chosenText, sharingNote.trim() || undefined);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-stone-200/90 w-full max-w-4xl overflow-hidden my-auto"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 p-4 sm:p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  小組分享時光 · 恩典交談
                </h3>
                <p className="text-xs text-amber-100">
                  {selectedMember
                    ? `邀請 ${selectedMember.name} 從下列 3 個題目中任選分享`
                    : '本輪精選 3 個分享題目，聆聽彼此生命故事'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/15 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Shuffling Loading State */}
            {isShuffling ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-amber-50 ring-8 ring-amber-100 animate-bounce">
                  <Dice3 className="w-8 h-8 text-amber-600 animate-spin" />
                </div>
                <div className="text-lg font-bold text-stone-800">
                  聖靈引導中 · 隨機抽選...
                </div>
                <p className="text-xs text-stone-500">
                  正為大家挑選最適合今天的分享題目與人物！
                </p>
              </div>
            ) : (
              <>
                {/* Speaker Showcase (if drawn) */}
                {selectedMember && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/90 border border-blue-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar container with click to pick/change avatar */}
                      <div
                        onClick={() => setIsAvatarPickerOpen(true)}
                        className="relative group/avatar cursor-pointer shrink-0"
                        title="點擊設定或更換頭像相片"
                      >
                        {selectedMember.avatarUrl ? (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md ring-4 ring-[#ccff00] border-2 border-white transition-transform group-hover/avatar:scale-105 bg-stone-100">
                            <img
                              src={selectedMember.avatarUrl}
                              alt={selectedMember.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-md ring-4 ring-[#ccff00] transition-transform group-hover/avatar:scale-105 ${
                              selectedMember.avatarBg || 'bg-blue-600'
                            }`}
                          >
                            {selectedMember.name.replace(/[^0-9]/g, '') || selectedMember.name}
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-bold">
                          <Camera className="w-4 h-4 mb-0.5 text-[#ccff00]" />
                          <span>更換</span>
                        </div>

                        {/* Camera icon badge in corner */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-stone-900 border-2 border-white text-[#ccff00] flex items-center justify-center shadow-xs">
                          <Camera className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#ccff00] text-black border border-[#8cb800] shadow-2xs">
                            ★ 這輪抽中分享
                          </span>
                          {selectedMember.role && selectedMember.role !== '組員' && (
                            <span className="text-xs px-2 py-0.5 rounded bg-white text-stone-700 font-medium border border-stone-200">
                              {selectedMember.role}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2.5 mt-1 flex-wrap">
                          <h4 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                            {selectedMember.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => setIsAvatarPickerOpen(true)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-blue-700 bg-white/90 hover:bg-white border border-blue-200 shadow-2xs hover:border-blue-400 transition-all cursor-pointer"
                          >
                            <Camera className="w-3.5 h-3.5 text-blue-600" />
                            <span>{selectedMember.avatarUrl ? '換頭像相片' : '＋加頭像圖片'}</span>
                          </button>
                        </div>

                        <p className="text-xs text-stone-600 mt-1">
                          小組同心聆聽你的分享與見證 · 名單已排除本輪不再重抽
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={onRerollMember}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-700 hover:bg-white bg-blue-100/70 border border-blue-200 transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>換抽下一位肢體</span>
                    </button>
                  </div>
                )}

                {/* 3 Selected Topics Showcase or Prompt to Draw Topics */}
                {isShufflingTopics ? (
                  <div className="py-12 text-center bg-amber-50/50 rounded-2xl border border-amber-200/80 space-y-3">
                    <div className="inline-flex p-3 rounded-full bg-amber-100 ring-6 ring-amber-50 animate-bounce">
                      <Dice3 className="w-7 h-7 text-amber-600 animate-spin" />
                    </div>
                    <div className="text-base font-bold text-stone-800">
                      正在為 {selectedMember ? `${selectedMember.name} ` : ''}隨機抽取 3 個題目...
                    </div>
                    <p className="text-xs text-stone-500">
                      精選 10 項題目庫中挑選最打動人心的分享主題
                    </p>
                  </div>
                ) : selectedTopics.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <h4 className="font-bold text-stone-800 text-sm sm:text-base">
                          🎲 隨機選出的 3 個題目（點選以標記分享哪一題）
                        </h4>
                      </div>
                      <button
                        onClick={onRerollTopics}
                        className="text-xs font-medium text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200/80 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>重抽 3 個題目</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {selectedTopics.map((topic, idx) => {
                        const isChosen = chosenTopicIndex === idx;

                        return (
                          <div
                            key={`${topic.id}-${idx}`}
                            onClick={() =>
                              setChosenTopicIndex(isChosen ? null : idx)
                            }
                            className={`cursor-pointer group relative p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                              isChosen
                                ? 'bg-amber-50/90 border-amber-500 shadow-md ring-2 ring-amber-200'
                                : 'bg-white hover:bg-stone-50/80 border-stone-200 hover:border-amber-300'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                                    isChosen
                                      ? 'bg-amber-500 text-white'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  題目 {idx + 1}
                                </span>
                                {topic.category && (
                                  <span className="text-[11px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                                    {topic.category}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm font-semibold text-stone-800 leading-relaxed group-hover:text-amber-950">
                                {topic.text}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                              <span
                                className={`font-medium ${
                                  isChosen ? 'text-amber-700' : 'text-stone-400'
                                }`}
                              >
                                {isChosen ? '✓ 已選中此題分享' : '點擊選擇此題'}
                              </span>
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                  isChosen
                                    ? 'bg-amber-500 border-amber-500 text-white'
                                    : 'border-stone-300 text-transparent'
                                }`}
                              >
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* When member is drawn first but topics not yet drawn */
                  <div className="p-6 sm:p-8 text-center bg-gradient-to-b from-amber-50/70 to-stone-50 rounded-2xl border-2 border-dashed border-amber-300/80 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center shadow-xs">
                      <Dice3 className="w-7 h-7 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-200/60 text-amber-900 text-xs font-bold mb-1">
                        第 2 步：抽取題目
                      </div>
                      <h4 className="text-lg font-bold text-stone-800">
                        已為您選出分享者：{selectedMember?.name} 弟兄/姊妹！
                      </h4>
                      <p className="text-xs text-stone-600 max-w-md mx-auto">
                        點擊下方按鈕，立即從 10 項題目庫中隨機選出 3 個題目供他/她自由挑選分享
                      </p>
                    </div>

                    <button
                      onClick={onRerollTopics}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-98 text-white font-bold text-sm sm:text-base shadow-md shadow-amber-300/50 hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <Dice3 className="w-5 h-5" />
                      <span>🎲 立即為 {selectedMember?.name || '肢體'} 抽取 3 個題目</span>
                    </button>
                  </div>
                )}

                {/* Sharing Helper Tool: Note / Prayer request summary */}
                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between">
                    <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-2">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      分享備忘 / 代禱事項（選填）
                    </span>
                    <input
                      type="text"
                      value={sharingNote}
                      onChange={(e) => setSharingNote(e.target.value)}
                      placeholder="簡記肢體分享重點、恩典或代禱需要..."
                      className="w-full text-xs sm:text-sm p-2 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-stone-50/80 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>
                {chosenTopicIndex !== null
                  ? `已選題目 ${chosenTopicIndex + 1}`
                  : '可點選題目作標記，或自由發揮'}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs sm:text-sm font-semibold transition-colors"
              >
                關閉視窗
              </button>

              <button
                onClick={handleFinish}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>完成分享並記錄</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Avatar Picker Modal */}
      <AvatarPickerModal
        isOpen={isAvatarPickerOpen}
        onClose={() => setIsAvatarPickerOpen(false)}
        member={selectedMember}
        onSaveAvatar={(memberId, avatarUrl) => {
          onUpdateMemberAvatar?.(memberId, avatarUrl);
        }}
      />
    </AnimatePresence>
  );
};
