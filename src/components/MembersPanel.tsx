import React, { useState } from 'react';
import { GroupMember } from '../types';
import { AVATAR_COLORS } from '../data/initialData';
import { UserCheck, Users, UserPlus, Trash2, CheckCircle2, RotateCcw, Award, Camera, Pencil } from 'lucide-react';
import { AvatarPickerModal } from './AvatarPickerModal';

interface MembersPanelProps {
  members: GroupMember[];
  selectedMemberId: string | null;
  onDrawMember: () => void;
  onTogglePresent: (id: string) => void;
  onToggleShared: (id: string) => void;
  onAddMember: (name: string, role: string) => void;
  onDeleteMember: (id: string) => void;
  onResetSharedStatus: () => void;
  isDrawing: boolean;
  isTopLayout?: boolean;
  onUpdateMember?: (id: string, name: string) => void;
  onUpdateMemberAvatar?: (id: string, avatarUrl: string | undefined) => void;
}

export const MembersPanel: React.FC<MembersPanelProps> = ({
  members,
  selectedMemberId,
  onDrawMember,
  onTogglePresent,
  onToggleShared,
  onAddMember,
  onDeleteMember,
  onResetSharedStatus,
  isDrawing,
  isTopLayout = false,
  onUpdateMember,
  onUpdateMemberAvatar,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('組員');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [avatarPickerMember, setAvatarPickerMember] = useState<GroupMember | null>(null);

  // Exclude any group leader as requested (不需要顯示小組組長)
  const visibleMembers = members.filter(
    (m) => m.role !== '小組長' && m.role !== '小組組長'
  );

  const presentMembers = visibleMembers.filter((m) => m.isPresent);
  const unsharedPresentMembers = presentMembers.filter((m) => !m.hasShared);
  const sharedCount = presentMembers.filter((m) => m.hasShared).length;

  const handleStartAdd = () => {
    setIsAdding(true);
    setNewName(`${visibleMembers.length + 1} 號肢體`);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAddMember(newName.trim(), newRole);
      setNewName('');
      setIsAdding(false);
    }
  };

  const handleStartEdit = (member: GroupMember) => {
    setEditingId(member.id);
    setEditText(member.name);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim() && onUpdateMember) {
      onUpdateMember(id, editText.trim());
    }
    setEditingId(null);
  };

  // Get avatar number or symbol (never personal names)
  const getAvatarLabel = (name: string, index: number) => {
    const digits = name.replace(/[^0-9]/g, '');
    return digits || String(index + 1);
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case '副組長':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case '敬拜同工':
      case '同工':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case '關懷同工':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case '新朋友':
        return 'bg-orange-100 text-orange-800 border-orange-300 font-bold';
      default:
        return 'bg-stone-100 text-stone-600 border-stone-200';
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
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />
            <h2 className="font-bold text-stone-800 text-base sm:text-lg flex items-center gap-2">
              小組組員名單
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                {presentMembers.length} 出席 / 共 {visibleMembers.length} 位
              </span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-600 ml-1">
              <span className="text-blue-700 font-medium bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                編號抽籤 · 不顯示姓名
              </span>
              <span>·</span>
              <span className="text-stone-500">
                已抽中 <strong className="text-stone-800">{sharedCount}</strong> 人
              </span>
              <span>·</span>
              <span>
                {unsharedPresentMembers.length > 0 ? (
                  <span className="text-emerald-700 font-semibold">
                    剩餘 {unsharedPresentMembers.length} 位待抽中
                  </span>
                ) : (
                  <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    🎉 全員已完成本輪！請清空重設
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onResetSharedStatus}
              title="重設所有肢體為白色未抽中狀態，開始新一輪抽籤"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-medium shadow-2xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>清空已分享 (Reset)</span>
            </button>

            {isTopLayout && (
              <button
                onClick={onDrawMember}
                disabled={isDrawing || unsharedPresentMembers.length === 0}
                className="py-1.5 px-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed group cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>
                  {unsharedPresentMembers.length > 0
                    ? `🎯 抽分享人物 (${unsharedPresentMembers.length}位)`
                    : '全員已抽完 (請先Reset)'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Color Legend Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2.5 mt-2 border-t border-stone-100 text-xs text-stone-600">
          <span className="font-semibold text-stone-500 text-[11px]">狀態顏色：</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#ccff00] text-black font-bold border border-[#a6d800] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            這輪抽中（瑩光綠色）
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 font-medium border border-stone-300">
            <span className="w-2 h-2 rounded-full bg-stone-500" />
            已抽中分享（灰色）
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white text-stone-700 font-medium border border-stone-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-stone-300" />
            未抽中（白色）
          </span>
        </div>

        {!isTopLayout && (
          <div className="mt-3">
            {/* Big Draw Member Button */}
            <button
              onClick={onDrawMember}
              disabled={isDrawing || unsharedPresentMembers.length === 0}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-semibold shadow-sm shadow-blue-200 flex items-center justify-center gap-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed group cursor-pointer"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm sm:text-base">
                {unsharedPresentMembers.length > 0
                  ? `🎯 隨機選出分享人物（剩餘 ${unsharedPresentMembers.length} 位）`
                  : '🎉 全員皆已抽中分享！（請點擊清空已分享重設）'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Members List */}
      <div
        className={`p-3 sm:p-4 flex-1 overflow-y-auto ${
          isTopLayout
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 max-h-[380px]'
            : 'space-y-2.5 max-h-[620px]'
        }`}
      >
        {visibleMembers.map((member, index) => {
          const isSelected = selectedMemberId === member.id;
          const isShared = member.hasShared;
          const isEditing = editingId === member.id;

          // Color rules:
          // 1. 這 round 抽中：瑩光綠色 (bg-[#ccff00] / border-[#8cb800])
          // 2. 當抽中分享：灰色 (bg-stone-200 / border-stone-300)
          // 3. 未抽中：白色 (bg-white / border-stone-200)
          let cardColorClass = '';
          if (isSelected) {
            cardColorClass =
              'bg-[#ccff00] border-2 border-[#8cb800] text-black shadow-md ring-4 ring-[#ccff00]/60 z-10 scale-[1.01]';
          } else if (isShared) {
            cardColorClass =
              'bg-stone-200/90 border border-stone-300 text-stone-600 shadow-none';
          } else if (member.isPresent) {
            cardColorClass =
              'bg-white hover:bg-stone-50 border-2 border-stone-200/90 text-stone-800 shadow-2xs';
          } else {
            cardColorClass =
              'bg-stone-100/50 border border-stone-200/50 text-stone-400 opacity-50';
          }

          return (
            <div
              key={`${member.id}-${index}`}
              className={`group relative p-3 rounded-xl transition-all flex items-center justify-between gap-3 ${cardColorClass}`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {/* Avatar with image or number badge */}
                <div
                  onClick={() => setAvatarPickerMember(member)}
                  className="relative group/avatar cursor-pointer shrink-0"
                  title="點擊設定或更換頭像相片"
                >
                  {member.avatarUrl ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-xs ring-1 ring-stone-200 bg-stone-100">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform group-hover/avatar:scale-105"
                      />
                      {/* Sub-badge indicating number */}
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 text-[8px] font-black px-1 rounded-full border border-white leading-tight ${
                          isSelected
                            ? 'bg-black text-[#ccff00]'
                            : 'bg-stone-900 text-white'
                        }`}
                      >
                        {getAvatarLabel(member.name, index)}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-xs ${
                        isSelected
                          ? 'bg-black text-[#ccff00] ring-2 ring-black font-black'
                          : `${member.avatarBg || 'bg-blue-500'} text-white`
                      }`}
                    >
                      {getAvatarLabel(member.name, index)}
                    </div>
                  )}

                  {/* Hover icon to change avatar */}
                  <div className="absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px]">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Info / Edit */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {isEditing ? (
                      <div className="flex items-center gap-1 w-full">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(member.id);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                          className="text-xs p-1 border border-blue-400 rounded bg-white w-full focus:outline-none text-stone-900"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(member.id)}
                          className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded shrink-0 cursor-pointer font-bold"
                        >
                          儲存
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStartEdit(member)}
                          title="點擊修改組員名稱或編號"
                          className={`font-bold text-sm truncate text-left hover:underline transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                            isSelected ? 'text-black' : isShared ? 'text-stone-700' : 'text-stone-900'
                          }`}
                        >
                          <span>{member.name}</span>
                          <Pencil className="w-3 h-3 text-stone-400 group-hover:text-blue-600 transition-colors shrink-0" />
                        </button>
                        {member.role && member.role !== '組員' && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${getRoleBadge(
                              member.role
                            )}`}
                          >
                            {member.role}
                          </span>
                        )}
                        {isSelected ? (
                          <span className="text-[10px] px-2 py-0.5 bg-black text-[#ccff00] rounded-full font-black animate-pulse shadow-xs">
                            ★ 這輪抽中
                          </span>
                        ) : isShared ? (
                          <span className="text-[10px] px-1.5 py-0.2 bg-stone-300/80 text-stone-700 rounded font-medium">
                            ✓ 已分享 (灰色)
                          </span>
                        ) : member.isPresent ? (
                          <span className="text-[10px] px-1.5 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded font-medium">
                            待抽中 (白色)
                          </span>
                        ) : null}
                      </>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-2 mt-0.5 text-[11px] ${
                      isSelected ? 'text-black/80 font-medium' : isShared ? 'text-stone-500' : 'text-stone-500'
                    }`}
                  >
                    <span
                      className={
                        isSelected
                          ? 'text-black font-black'
                          : member.isPresent
                          ? isShared
                            ? 'text-stone-600 font-medium'
                            : 'text-emerald-600 font-medium'
                          : 'text-stone-400'
                      }
                    >
                      {isSelected ? '● 正在分享' : member.isPresent ? (isShared ? '● 已分享' : '● 出席待抽') : '○ 請假'}
                    </span>
                    {member.sharedCount > 0 && (
                      <span className={isSelected ? 'text-black/70' : 'text-stone-400'}>
                        ({member.sharedCount}次)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Toggle Present */}
                <button
                  onClick={() => onTogglePresent(member.id)}
                  title={member.isPresent ? '標記為未到' : '標記為出席'}
                  className={`px-2 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white border-black hover:bg-stone-800'
                      : member.isPresent
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200'
                  }`}
                >
                  {member.isPresent ? '出席' : '請假'}
                </button>

                {/* Toggle Shared */}
                {member.isPresent && (
                  <button
                    onClick={() => onToggleShared(member.id)}
                    title={member.hasShared ? '點擊重設為未分享（白色）' : '點擊標記為已分享（灰色）'}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors border cursor-pointer ${
                      isSelected
                        ? 'bg-black text-[#ccff00] border-black hover:bg-stone-800'
                        : member.hasShared
                        ? 'bg-stone-300 text-stone-700 border-stone-400 hover:bg-stone-400'
                        : 'bg-white text-stone-400 border-stone-300 hover:text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Change Avatar Button */}
                <button
                  onClick={() => setAvatarPickerMember(member)}
                  title="設定或更換此肢體頭像相片"
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors border cursor-pointer ${
                    isSelected
                      ? 'bg-black text-[#ccff00] border-black hover:bg-stone-800'
                      : 'bg-white hover:bg-stone-100 text-stone-400 hover:text-blue-600 border-stone-200 hover:border-blue-300'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => onDeleteMember(member.id)}
                  title="移除此編號"
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-black/70 hover:bg-black/10'
                      : 'hover:bg-rose-100 text-stone-400 hover:text-rose-600'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Add Member Form */}
        {isAdding ? (
          <form
            onSubmit={handleAddSubmit}
            className={`p-3 bg-blue-50/50 rounded-xl border border-blue-200 space-y-2.5 ${
              isTopLayout ? 'col-span-full' : ''
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold text-blue-900">
              <span>新增肢體編號（不記錄姓名）</span>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={`輸入編號或座號（如：${visibleMembers.length + 1} 號肢體）`}
                className="text-xs sm:text-sm p-2 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoFocus
              />
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="text-xs sm:text-sm p-2 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-stone-700 cursor-pointer"
              >
                <option value="組員">組員</option>
                <option value="同工">同工</option>
                <option value="副組長">副組長</option>
                <option value="新朋友">新朋友</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-200 rounded-lg cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={!newName.trim()}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                確認新增
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={handleStartAdd}
            className={`py-2.5 px-3 rounded-xl border border-dashed border-stone-300 hover:border-blue-400 hover:bg-blue-50/40 text-stone-600 text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isTopLayout ? 'min-h-[56px] w-full' : 'w-full'
            }`}
          >
            <UserPlus className="w-4 h-4 text-blue-600" />
            <span>新增肢體（編號 / 座號）</span>
          </button>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-stone-100 bg-stone-50/50 rounded-b-2xl text-[11px] text-stone-500 flex items-center justify-between">
        <span>💡 僅在「出席中」的編號中隨機抽選</span>
        <span className="text-stone-400">不公開個人真實姓名 · 保護組員隱私</span>
      </div>

      {/* Avatar Picker Modal */}
      <AvatarPickerModal
        isOpen={!!avatarPickerMember}
        onClose={() => setAvatarPickerMember(null)}
        member={avatarPickerMember}
        onSaveAvatar={(memberId, avatarUrl) => {
          onUpdateMemberAvatar?.(memberId, avatarUrl);
        }}
      />
    </div>
  );
};
