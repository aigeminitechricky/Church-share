import React, { useState } from 'react';
import { SharingTopic } from '../types';
import { TOPIC_PRESETS } from '../data/initialData';
import { Dice3, Plus, Trash2, Edit3, Check, X, RefreshCw, Layers } from 'lucide-react';

interface TopicsPanelProps {
  topics: SharingTopic[];
  selectedTopicIds: string[];
  onDrawTopics: () => void;
  onToggleTopic: (id: string) => void;
  onUpdateTopic: (id: string, text: string) => void;
  onDeleteTopic: (id: string) => void;
  onAddTopic: (text: string, category: SharingTopic['category']) => void;
  onApplyPreset: (presetId: string) => void;
  isDrawing: boolean;
  isTopLayout?: boolean;
}

export const TopicsPanel: React.FC<TopicsPanelProps> = ({
  topics,
  selectedTopicIds,
  onDrawTopics,
  onToggleTopic,
  onUpdateTopic,
  onDeleteTopic,
  onAddTopic,
  onApplyPreset,
  isDrawing,
  isTopLayout = false,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState<SharingTopic['category']>('生活');
  const [showPresets, setShowPresets] = useState(false);

  const activeTopicsCount = topics.filter((t) => t.enabled).length;

  const handleStartEdit = (topic: SharingTopic) => {
    setEditingId(topic.id);
    setEditText(topic.text);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      onUpdateTopic(id, editText.trim());
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (newText.trim()) {
      onAddTopic(newText.trim(), newCategory);
      setNewText('');
      setIsAdding(false);
    }
  };

  const getCategoryBadgeClass = (category?: SharingTopic['category']) => {
    switch (category) {
      case '感恩':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case '靈修':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '代禱':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case '同行':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case '生活':
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs flex flex-col h-full">
      {/* Panel Header */}
      <div className="p-4 sm:p-5 border-b border-stone-100">
        <div
          className={`flex flex-col ${
            isTopLayout ? 'md:flex-row md:items-center' : ''
          } justify-between gap-3 ${isTopLayout ? '' : 'mb-3'}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100" />
            <h2 className="font-bold text-stone-800 text-base sm:text-lg flex items-center gap-2">
              分享題目庫
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                {activeTopicsCount} 項啟用 / 共 {topics.length} 項
              </span>
            </h2>
            <span className="text-xs text-stone-500 ml-1">
              （隨機抽選 3 個題目供挑選分享）
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <button
                onClick={() => setShowPresets(!showPresets)}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
                title="切換預設題庫"
              >
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>題庫範本</span>
              </button>

              {showPresets && (
                <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-lg border border-stone-200 p-2 z-20">
                  <div className="text-[11px] font-semibold text-stone-400 px-2 py-1">選擇 10 題範本</div>
                  {TOPIC_PRESETS.map((preset, pIdx) => (
                    <button
                      key={`${preset.id}-${pIdx}`}
                      onClick={() => {
                        onApplyPreset(preset.id);
                        setShowPresets(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-amber-50 text-xs transition-colors flex flex-col cursor-pointer"
                    >
                      <span className="font-medium text-stone-800">{preset.name}</span>
                      <span className="text-[11px] text-stone-500 line-clamp-1">{preset.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isTopLayout && (
              <button
                onClick={onDrawTopics}
                disabled={isDrawing || activeTopicsCount < 3}
                className="py-1.5 px-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.99] text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
              >
                <Dice3 className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                <span>🎲 隨機抽選 3 個題目</span>
              </button>
            )}
          </div>
        </div>

        {!isTopLayout && (
          <>
            {/* Big Draw 3 Topics Button */}
            <button
              onClick={onDrawTopics}
              disabled={isDrawing || activeTopicsCount < 3}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.99] text-white font-semibold shadow-sm shadow-amber-200 flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              <Dice3 className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-sm sm:text-base">🎲 隨機抽選 3 個題目</span>
            </button>
            {activeTopicsCount < 3 && (
              <p className="text-[11px] text-rose-500 text-center mt-1.5">
                請至少啟用 3 個題目以供隨機抽選
              </p>
            )}
          </>
        )}
      </div>

      {/* Topics List */}
      <div
        className={`p-3 sm:p-4 flex-1 overflow-y-auto ${
          isTopLayout
            ? 'grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[500px]'
            : 'space-y-2.5 max-h-[620px]'
        }`}
      >
        {topics.map((topic, index) => {
          const isSelected = selectedTopicIds.includes(topic.id);
          const isEditing = editingId === topic.id;

          return (
            <div
              key={`${topic.id}-${index}`}
              className={`group relative p-3 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-amber-50/80 border-amber-400 shadow-xs ring-2 ring-amber-200'
                  : topic.enabled
                  ? 'bg-stone-50/60 hover:bg-stone-50 border-stone-200/70 text-stone-800'
                  : 'bg-stone-100/40 border-stone-200/40 text-stone-400 opacity-60'
              }`}
            >
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2 bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800"
                    rows={2}
                    autoFocus
                  />
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={handleCancelEdit}
                      className="px-2 py-1 text-xs text-stone-600 hover:bg-stone-200 rounded"
                    >
                      <X className="w-3.5 h-3.5 inline mr-1" /> 取消
                    </button>
                    <button
                      onClick={() => handleSaveEdit(topic.id)}
                      className="px-2.5 py-1 text-xs bg-amber-500 text-white rounded hover:bg-amber-600 font-medium"
                    >
                      <Check className="w-3.5 h-3.5 inline mr-1" /> 儲存
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5">
                  {/* Item Number Pill */}
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs'
                        : topic.enabled
                        ? 'bg-stone-200/80 text-stone-700'
                        : 'bg-stone-200 text-stone-400'
                    }`}
                  >
                    {index + 1}
                  </span>

                  {/* Main Text & Category */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {topic.category && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${getCategoryBadgeClass(
                            topic.category
                          )}`}
                        >
                          {topic.category}
                        </span>
                      )}
                      {isSelected && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-amber-500 text-white rounded-full font-semibold animate-pulse">
                          ★ 本輪選中
                        </span>
                      )}
                      {topic.timesDrawn > 0 && (
                        <span className="text-[10px] text-stone-400">
                          已抽過 {topic.timesDrawn} 次
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed select-text">
                      {topic.text}
                    </p>
                  </div>

                  {/* Row Actions */}
                  <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onToggleTopic(topic.id)}
                      title={topic.enabled ? '停用此題目' : '啟用此題目'}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium border transition-colors ${
                        topic.enabled
                          ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                          : 'bg-stone-200 border-stone-300 text-stone-500 hover:bg-stone-300'
                      }`}
                    >
                      {topic.enabled ? '開' : '關'}
                    </button>
                    <button
                      onClick={() => handleStartEdit(topic)}
                      title="編輯題目"
                      className="w-7 h-7 rounded-lg hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteTopic(topic.id)}
                      title="刪除題目"
                      className="w-7 h-7 rounded-lg hover:bg-rose-100 text-stone-400 hover:text-rose-600 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add Topic Form */}
        {isAdding ? (
          <form
            onSubmit={handleCreateTopic}
            className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-2.5"
          >
            <div className="flex items-center justify-between text-xs font-semibold text-amber-900">
              <span>新增分享題目</span>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="請輸入題目內容（例如：這週最感恩的一件事...）"
              className="w-full text-xs sm:text-sm p-2.5 bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows={2}
              autoFocus
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-stone-500">分類:</span>
                {(['感恩', '生活', '靈修', '代禱', '同行'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNewCategory(cat)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      newCategory === cat
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-white text-stone-600 border-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                disabled={!newText.trim()}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold"
              >
                新增加入
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-2.5 px-3 rounded-xl border border-dashed border-stone-300 hover:border-amber-400 hover:bg-amber-50/40 text-stone-600 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4 text-amber-600" />
            <span>自訂新增題目</span>
          </button>
        )}
      </div>

      {/* Footer info */}
      <div className="p-3 border-t border-stone-100 bg-stone-50/50 rounded-b-2xl text-[11px] text-stone-500 flex items-center justify-between">
        <span>💡 點擊「🎲 隨機抽選 3 個題目」會隨機抽 3 題</span>
        <button
          onClick={() => onApplyPreset('preset-classic')}
          className="text-amber-700 hover:underline flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> 重置為預設10題
        </button>
      </div>
    </div>
  );
};
