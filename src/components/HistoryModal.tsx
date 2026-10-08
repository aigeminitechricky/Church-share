import React, { useState } from 'react';
import { SharingRecord } from '../types';
import { X, Copy, Check, Trash2, Calendar, MessageSquare } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: SharingRecord[];
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  records,
  onClearHistory,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySummary = () => {
    if (records.length === 0) return;

    const dateStr = new Date().toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let text = `✝️【小組聚會分享與代禱記錄】\n日期：${dateStr}\n\n`;

    records.forEach((rec, idx) => {
      text += `第 ${idx + 1} 位：${rec.memberName} ${rec.memberRole ? `(${rec.memberRole})` : ''}\n`;
      if (rec.chosenTopic) {
        text += `🔹 分享題目：${rec.chosenTopic}\n`;
      } else if (rec.topics && rec.topics.length > 0) {
        text += `🔹 抽中題目：${rec.topics[0]} 等\n`;
      }
      if (rec.note) {
        text += `📝 筆記/代禱：${rec.note}\n`;
      }
      text += `\n`;
    });

    text += `願神大大賜福小組每一位弟兄姊妹！彼此相顧，激發愛心。`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200/90 w-full max-w-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-800 text-base">小組分享紀錄</h3>
              <p className="text-xs text-stone-500">
                本聚會已記錄 {records.length} 位肢體的分享
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          {records.length === 0 ? (
            <div className="text-center py-12 text-stone-400 space-y-2">
              <MessageSquare className="w-10 h-10 mx-auto text-stone-300" />
              <p className="text-sm font-medium">目前尚無分享紀錄</p>
              <p className="text-xs">抽籤並點選「完成分享並記錄」後會儲存在這裡</p>
            </div>
          ) : (
            records.map((rec, index) => (
              <div
                key={`${rec.id}-${index}`}
                className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/70 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    {rec.avatarUrl && (
                      <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-stone-200 shadow-2xs">
                        <img src={rec.avatarUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <span className="font-bold text-stone-800 text-sm">
                      {rec.memberName}
                    </span>
                    {rec.memberRole && rec.memberRole !== '組員' && rec.memberRole !== '小組長' && rec.memberRole !== '小組組長' && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-200 text-stone-700">
                        {rec.memberRole}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400">
                    {new Date(rec.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {rec.chosenTopic && (
                  <p className="text-xs text-stone-700 bg-white p-2 rounded-lg border border-stone-200/60 font-medium">
                    <span className="text-amber-700 font-semibold mr-1">分享主題：</span>
                    {rec.chosenTopic}
                  </p>
                )}

                {rec.note && (
                  <p className="text-xs text-stone-600 pl-1 italic">
                    <span className="font-semibold text-stone-500 not-italic">備忘/代禱：</span>
                    {rec.note}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-3">
          <button
            onClick={onClearHistory}
            disabled={records.length === 0}
            className="text-xs text-rose-600 hover:text-rose-700 disabled:opacity-40 flex items-center gap-1 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>清除所有紀錄</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              disabled={records.length === 0}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> 已複製到剪貼簿！
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> 複製摘要 (發群組)
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-100 text-xs font-medium"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
