import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Globe, Check, Trash2, Sparkles, Smile, Heart } from 'lucide-react';
import { AVATAR_PRESETS, AvatarPreset } from '../data/avatarPresets';
import { GroupMember } from '../types';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: GroupMember | null;
  onSaveAvatar: (memberId: string, avatarUrl: string | undefined) => void;
}

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({
  isOpen,
  onClose,
  member,
  onSaveAvatar,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [customUrl, setCustomUrl] = useState('');
  const [urlPreviewError, setUrlPreviewError] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !member) return null;

  // Handle preset selection
  const handleSelectPreset = (preset: AvatarPreset) => {
    onSaveAvatar(member.id, preset.url);
    onClose();
  };

  // Handle local file upload with canvas compression
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('請選擇圖片檔案（支援 JPG、PNG、WebP 等格式）');
      return;
    }

    setIsProcessingFile(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const maxDim = 320;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            onSaveAvatar(member.id, dataUrl);
            setIsProcessingFile(false);
            onClose();
          }
        } catch {
          setIsProcessingFile(false);
          alert('相片載入失敗，請嘗試其他相片');
        }
      };
      img.onerror = () => {
        setIsProcessingFile(false);
        alert('相片載入失敗');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (!customUrl.trim()) return;
    onSaveAvatar(member.id, customUrl.trim());
    onClose();
  };

  const handleRemoveAvatar = () => {
    onSaveAvatar(member.id, undefined);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs"
        />

        {/* Dialog */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-3">
              {/* Current avatar preview */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-xs border-2 border-white ring-2 ring-stone-200">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center text-white font-bold text-base ${
                      member.avatarBg || 'bg-blue-600'
                    }`}
                  >
                    {member.name.replace(/[^0-9]/g, '') || member.name}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
                  設定肢體頭像相片
                </h3>
                <p className="text-xs text-stone-500">
                  為 <span className="font-semibold text-blue-600">{member.name}</span>{' '}
                  選擇專屬相片或精美團契頭像
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-200/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-stone-200 px-4 pt-2 bg-stone-50/40 text-xs font-semibold gap-2">
            <button
              onClick={() => setActiveTab('presets')}
              className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'presets'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>精選頭像庫</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>上傳本機相片</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'url'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>網路相片網址</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="p-5 overflow-y-auto flex-1 space-y-5">
            {activeTab === 'presets' && (
              <div className="space-y-4">
                {/* 1. Character Avatars */}
                <div>
                  <div className="text-xs font-bold text-stone-500 mb-2.5 flex items-center gap-1.5">
                    <Smile className="w-3.5 h-3.5 text-amber-500" />
                    <span>肢體人物頭像（弟兄姊妹）</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {AVATAR_PRESETS.filter((p) => p.category === '肢體人物').map((preset) => {
                      const isCurrent = member.avatarUrl === preset.url;
                      return (
                        <button
                          key={`char-${preset.id}`}
                          onClick={() => handleSelectPreset(preset)}
                          className={`group relative flex flex-col items-center p-2 rounded-2xl border transition-all text-center ${
                            isCurrent
                              ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-400'
                              : 'border-stone-200 hover:border-blue-300 hover:bg-stone-50'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden shadow-xs ring-2 ring-white mb-1.5 transition-transform group-hover:scale-105">
                            <img
                              src={preset.url}
                              alt={preset.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[11px] font-medium text-stone-700 truncate w-full">
                            {preset.name}
                          </span>
                          {isCurrent && (
                            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Faith & Fellowship Symbols */}
                <div>
                  <div className="text-xs font-bold text-stone-500 mb-2.5 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>信仰象徵與恩典標誌</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {AVATAR_PRESETS.filter((p) => p.category === '信仰象徵').map((preset) => {
                      const isCurrent = member.avatarUrl === preset.url;
                      return (
                        <button
                          key={`sym-${preset.id}`}
                          onClick={() => handleSelectPreset(preset)}
                          className={`group relative flex flex-col items-center p-2 rounded-2xl border transition-all text-center ${
                            isCurrent
                              ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-400'
                              : 'border-stone-200 hover:border-blue-300 hover:bg-stone-50'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden shadow-xs ring-2 ring-white mb-1.5 transition-transform group-hover:scale-105">
                            <img
                              src={preset.url}
                              alt={preset.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[11px] font-medium text-stone-700 truncate w-full">
                            {preset.name}
                          </span>
                          {isCurrent && (
                            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-300 hover:border-blue-400 hover:bg-blue-50/30 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-3"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">
                      {isProcessingFile ? '正在壓縮處理相片...' : '點擊選擇相片檔案'}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">
                      支援手機自拍相簿、相機拍照或電腦圖片（自動裁切優化）
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>從本機選取相片</span>
                  </button>
                </div>

                <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/80 text-xs text-amber-800">
                  💡 提示：上傳的相片會保存在您這台裝置的瀏覽器本地存儲，小組抽籤隨時開啟即能即時顯示！
                </div>
              </div>
            )}

            {activeTab === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    輸入或貼上相片圖片網址 (Image URL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      value={customUrl}
                      onChange={(e) => {
                        setCustomUrl(e.target.value);
                        setUrlPreviewError(false);
                      }}
                      className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <button
                      onClick={handleApplyUrl}
                      disabled={!customUrl.trim() || urlPreviewError}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-50"
                    >
                      套用網址
                    </button>
                  </div>
                </div>

                {customUrl.trim() && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-200 shrink-0">
                      <img
                        src={customUrl}
                        alt="網址預覽"
                        onError={() => setUrlPreviewError(true)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-800">相片網址預覽</div>
                      {urlPreviewError ? (
                        <div className="text-xs text-rose-500 font-medium">無法載入此圖片網址</div>
                      ) : (
                        <div className="text-xs text-emerald-600 font-medium">圖片載入成功</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
            {member.avatarUrl ? (
              <button
                onClick={handleRemoveAvatar}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>清除頭像相片 (還原純數字)</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-200 rounded-xl transition-colors"
            >
              關閉
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
