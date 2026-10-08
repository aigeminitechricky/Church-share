import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SharingTopic, GroupMember, SharingRecord } from './types';
import { DEFAULT_TOPICS, DEFAULT_MEMBERS, TOPIC_PRESETS, AVATAR_COLORS } from './data/initialData';
import { AVATAR_PRESETS } from './data/avatarPresets';
import { Header } from './components/Header';
import { DrawActionCenter } from './components/DrawActionCenter';
import { TopicsPanel } from './components/TopicsPanel';
import { MembersPanel } from './components/MembersPanel';
import { DrawShowcaseModal } from './components/DrawShowcaseModal';
import { HistoryModal } from './components/HistoryModal';
import { sound } from './utils/audio';

const STORAGE_KEYS = {
  TOPICS: 'church_fellowship_topics_v1',
  MEMBERS: 'church_fellowship_members_v2',
  RECORDS: 'church_fellowship_records_v2',
  SOUND: 'church_fellowship_sound_v1',
  AVOID_REPEAT: 'church_fellowship_avoid_repeat_v1',
  LAYOUT: 'church_fellowship_layout_v1',
};

export default function App() {
  // Layout mode: 'members-top' (肢體名單在最上 - 預設) or 'side-by-side' (左右並排)
  const [layoutMode, setLayoutMode] = useState<'members-top' | 'side-by-side'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAYOUT);
      if (saved === 'side-by-side' || saved === 'members-top') return saved;
    } catch {
      // ignore
    }
    return 'members-top';
  });

  const handleToggleLayout = () => {
    setLayoutMode((prev) => {
      const next = prev === 'members-top' ? 'side-by-side' : 'members-top';
      try {
        localStorage.setItem(STORAGE_KEYS.LAYOUT, next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Topics state
  const [topics, setTopics] = useState<SharingTopic[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOPICS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const seenIds = new Set<string>();
          return parsed.map((t: SharingTopic, idx: number) => {
            let id = t.id;
            if (!id || seenIds.has(id)) {
              id = `t-${idx + 1}-${Date.now()}`;
            }
            seenIds.add(id);
            return { ...t, id };
          });
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_TOPICS;
  });

  // Members state (custom names and avatars are preserved across reloads)
  const [members, setMembers] = useState<GroupMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const seenIds = new Set<string>();
          return parsed
            .filter((m: GroupMember) => m.role !== '小組長' && m.role !== '小組組長')
            .map((m: GroupMember, idx: number) => {
              let id = m.id || `m-${idx + 1}`;
              if (seenIds.has(id)) {
                id = `m-${idx + 1}-${idx}`;
              }
              seenIds.add(id);
              const defaultFallback = DEFAULT_MEMBERS[idx];
              // Truly preserve user's edited name; fallback to default only if empty
              const savedName =
                typeof m.name === 'string' && m.name.trim().length > 0
                  ? m.name.trim()
                  : defaultFallback?.name || `${idx + 1} 號組員`;
              return {
                ...m,
                id,
                name: savedName,
                avatarUrl: m.avatarUrl || defaultFallback?.avatarUrl,
              };
            });
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_MEMBERS;
  });

  // Records state
  const [records, setRecords] = useState<SharingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECORDS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const seenIds = new Set<string>();
          return parsed.map((r: SharingRecord, idx: number) => {
            let id = r.id;
            if (!id || seenIds.has(id)) {
              id = `rec-${idx + 1}-${Date.now()}`;
            }
            seenIds.add(id);
            return { ...r, id };
          });
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Preferences
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return true;
  });

  const [avoidRepeat, setAvoidRepeat] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AVOID_REPEAT);
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return true;
  });

  // Active draw selections
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Modals & animations
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isShufflingTopics, setIsShufflingTopics] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
    } catch {
      // ignore
    }
  }, [topics]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    } catch {
      // ignore
    }
  }, [members]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
    } catch {
      // ignore
    }
  }, [records]);

  useEffect(() => {
    sound.enabled = soundEnabled;
    try {
      localStorage.setItem(STORAGE_KEYS.SOUND, JSON.stringify(soundEnabled));
    } catch {
      // ignore
    }
  }, [soundEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AVOID_REPEAT, JSON.stringify(avoidRepeat));
    } catch {
      // ignore
    }
  }, [avoidRepeat]);

  // Topic actions
  const handleToggleTopic = (id: string) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const handleUpdateTopic = (id: string, text: string) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text } : t))
    );
  };

  const handleDeleteTopic = (id: string) => {
    setTopics((prev) => prev.filter((t) => t.id !== id));
    setSelectedTopicIds((prev) => prev.filter((tid) => tid !== id));
  };

  const handleAddTopic = (text: string, category: SharingTopic['category']) => {
    const newTopic: SharingTopic = {
      id: 't-' + Date.now(),
      text,
      category,
      enabled: true,
      timesDrawn: 0,
    };
    setTopics((prev) => [...prev, newTopic]);
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = TOPIC_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const newTopics: SharingTopic[] = preset.topics.map((text, i) => {
      let cat: SharingTopic['category'] = '生活';
      if (text.includes('感恩') || text.includes('笑')) cat = '感恩';
      else if (text.includes('靈修') || text.includes('經') || text.includes('神')) cat = '靈修';
      else if (text.includes('禱告') || text.includes('代禱')) cat = '代禱';
      else if (text.includes('肢體') || text.includes('小組') || text.includes('人')) cat = '同行';

      return {
        id: `t-${preset.id}-${i}-${Date.now()}`,
        text,
        category: cat,
        enabled: true,
        timesDrawn: 0,
      };
    });

    setTopics(newTopics);
    setSelectedTopicIds([]);
  };

  // Member actions
  const handleTogglePresent = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isPresent: !m.isPresent } : m))
    );
  };

  const handleToggleShared = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, hasShared: !m.hasShared } : m))
    );
  };

  const handleAddMember = (name: string, role: string) => {
    const randomBg = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    const randomPreset = AVATAR_PRESETS[Math.floor(Math.random() * AVATAR_PRESETS.length)];
    const newMember: GroupMember = {
      id: 'm-' + Date.now(),
      name,
      role,
      avatarBg: randomBg,
      avatarUrl: randomPreset?.url,
      isPresent: true,
      hasShared: false,
      sharedCount: 0,
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const handleUpdateMember = (id: string, name: string) => {
    setMembers((prev) => {
      const trimmed = name.trim();
      const updated = prev.map((m) => (m.id === id ? { ...m, name: trimmed } : m));
      try {
        localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleUpdateMemberAvatar = (id: string, avatarUrl: string | undefined) => {
    setMembers((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, avatarUrl } : m));
      try {
        localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleDeleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    if (selectedMemberId === id) setSelectedMemberId(null);
  };

  const handleResetSharedStatus = () => {
    setMembers((prev) => prev.map((m) => ({ ...m, hasShared: false })));
    setSelectedMemberId(null);
  };

  // Helper to get eligible members (strictly excluding group leader)
  const getEligibleMembers = () => {
    return members.filter(
      (m) => m.role !== '小組長' && m.role !== '小組組長'
    );
  };

  // Shuffle helper function to pick N unique items from array
  const getRandomSubset = <T,>(arr: T[], count: number): T[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Core Draw Handlers
  // Draw 3 Topics (can be called independently or as Step 2 for chosen member)
  const handleDrawTopics = useCallback(() => {
    const active = topics.filter((t) => t.enabled);
    if (active.length < 3) return;

    setIsShufflingTopics(true);
    setIsModalOpen(true);

    let counter = 0;
    const interval = setInterval(() => {
      sound.playTick();
      const mockPick = getRandomSubset(active, 3);
      setSelectedTopicIds(mockPick.map((t) => t.id));
      counter++;

      if (counter >= 12) {
        clearInterval(interval);
        const finalPicks = getRandomSubset(active, 3);
        const finalIds = finalPicks.map((t) => t.id);
        setSelectedTopicIds(finalIds);

        // increment timesDrawn
        setTopics((prev) =>
          prev.map((t) =>
            finalIds.includes(t.id) ? { ...t, timesDrawn: t.timesDrawn + 1 } : t
          )
        );

        setIsShufflingTopics(false);
        sound.playChime();
      }
    }, 90);
  }, [topics, sound]);

  // Priority Draw Mode: Randomly select sharing member FIRST (excludes group leader and already shared members)
  const handleDrawMemberFirst = useCallback(() => {
    const eligible = members.filter(
      (m) => m.role !== '小組長' && m.role !== '小組組長'
    );
    const unsharedPresent = eligible.filter((m) => m.isPresent && !m.hasShared);

    if (unsharedPresent.length === 0) {
      alert('所有出席肢體皆已抽中分享！\n\n若要開始下一輪抽籤，請點擊「清空已分享 (Reset)」。');
      return;
    }

    const candidatePool = unsharedPresent;

    // Clear previous topics so this member gets a fresh Step 1 spotlight
    setSelectedTopicIds([]);
    setIsShuffling(true);
    setIsModalOpen(true);

    let counter = 0;
    const interval = setInterval(() => {
      sound.playTick();
      const mockPick = candidatePool[Math.floor(Math.random() * candidatePool.length)];
      setSelectedMemberId(mockPick.id);
      counter++;

      if (counter >= 12) {
        clearInterval(interval);
        const finalPick = candidatePool[Math.floor(Math.random() * candidatePool.length)];
        setSelectedMemberId(finalPick.id);

        // 抽中即標記為已分享（進入灰色排除名單，不會再被抽中直到 reset）
        setMembers((prev) =>
          prev.map((m) =>
            m.id === finalPick.id
              ? { ...m, hasShared: true, sharedCount: (m.sharedCount || 0) + 1 }
              : m
          )
        );

        setIsShuffling(false);
        sound.playChime();
      }
    }, 90);
  }, [members, sound]);

  // Swap to next member without wiping current topics (excludes group leader and already shared)
  const handleRerollMemberOnly = useCallback(() => {
    const currentId = selectedMemberId;
    const eligible = members.filter(
      (m) => m.role !== '小組長' && m.role !== '小組組長'
    );
    const remainingUnshared = eligible.filter(
      (m) => m.isPresent && !m.hasShared && m.id !== currentId
    );

    if (remainingUnshared.length === 0) {
      alert('已沒有其他未抽中的出席肢體了！若要重新抽籤，請點擊「清空已分享」重設。');
      return;
    }

    // Revert the currently selected member if they are being switched out without sharing
    if (currentId) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === currentId
            ? { ...m, hasShared: false, sharedCount: Math.max(0, (m.sharedCount || 1) - 1) }
            : m
        )
      );
    }

    setIsShuffling(true);
    let counter = 0;
    const interval = setInterval(() => {
      sound.playTick();
      const mockPick = remainingUnshared[Math.floor(Math.random() * remainingUnshared.length)];
      setSelectedMemberId(mockPick.id);
      counter++;

      if (counter >= 10) {
        clearInterval(interval);
        const finalPick = remainingUnshared[Math.floor(Math.random() * remainingUnshared.length)];
        setSelectedMemberId(finalPick.id);

        // Mark the new pick as hasShared
        setMembers((prev) =>
          prev.map((m) =>
            m.id === finalPick.id
              ? { ...m, hasShared: true, sharedCount: (m.sharedCount || 0) + 1 }
              : m
          )
        );

        setIsShuffling(false);
        sound.playChime();
      }
    }, 90);
  }, [members, selectedMemberId, sound]);

  // Sequential 2-Phase Mode: Draw Member First ➔ Then Draw Topics automatically
  const handleDrawSequential = useCallback(() => {
    const active = topics.filter((t) => t.enabled);
    const eligible = members.filter(
      (m) => m.role !== '小組長' && m.role !== '小組組長'
    );
    const unsharedPresent = eligible.filter((m) => m.isPresent && !m.hasShared);

    if (unsharedPresent.length === 0) {
      alert('所有出席肢體皆已抽中分享！\n\n若要開始下一輪抽籤，請點擊「清空已分享 (Reset)」。');
      return;
    }
    if (active.length < 3) {
      alert('啟用題目不足 3 個，請先在題目庫中啟用更多題目！');
      return;
    }

    const candidatePool = unsharedPresent;

    // Step 1: Spotlight Member Draw
    setSelectedTopicIds([]);
    setIsShuffling(true);
    setIsModalOpen(true);

    let counter = 0;
    const interval = setInterval(() => {
      sound.playTick();
      const mockMember = candidatePool[Math.floor(Math.random() * candidatePool.length)];
      setSelectedMemberId(mockMember.id);
      counter++;

      if (counter >= 12) {
        clearInterval(interval);
        const finalMember = candidatePool[Math.floor(Math.random() * candidatePool.length)];
        setSelectedMemberId(finalMember.id);

        // 抽中即標記為已分享（進入灰色排除名單，不會再被抽中直到 reset）
        setMembers((prev) =>
          prev.map((m) =>
            m.id === finalMember.id
              ? { ...m, hasShared: true, sharedCount: (m.sharedCount || 0) + 1 }
              : m
          )
        );

        setIsShuffling(false);
        sound.playChime();

        // Step 2: Pause 900ms to reveal member, then automatically roll 3 topics!
        setTimeout(() => {
          setIsShufflingTopics(true);
          let topicCounter = 0;
          const topicInterval = setInterval(() => {
            sound.playTick();
            const mockTopics = getRandomSubset(active, 3);
            setSelectedTopicIds(mockTopics.map((t) => t.id));
            topicCounter++;

            if (topicCounter >= 11) {
              clearInterval(topicInterval);
              const finalTopics = getRandomSubset(active, 3);
              const finalTopicIds = finalTopics.map((t) => t.id);
              setSelectedTopicIds(finalTopicIds);

              setTopics((prev) =>
                prev.map((t) =>
                  finalTopicIds.includes(t.id) ? { ...t, timesDrawn: t.timesDrawn + 1 } : t
                )
              );

              setIsShufflingTopics(false);
              sound.playChime();
            }
          }, 90);
        }, 900);
      }
    }, 90);
  }, [topics, members, sound]);

  // Draw Both at once simultaneously
  const handleDrawBoth = useCallback(() => {
    const active = topics.filter((t) => t.enabled);
    const eligible = members.filter(
      (m) => m.role !== '小組長' && m.role !== '小組組長'
    );
    const unsharedPresent = eligible.filter((m) => m.isPresent && !m.hasShared);

    if (unsharedPresent.length === 0) {
      alert('所有出席肢體皆已抽中分享！\n\n若要開始下一輪抽籤，請點擊「清空已分享 (Reset)」。');
      return;
    }
    if (active.length < 3) {
      alert('啟用題目不足 3 個，請先在題目庫中啟用更多題目！');
      return;
    }

    const candidatePool = unsharedPresent;

    setIsShuffling(true);
    setIsModalOpen(true);

    let counter = 0;
    const interval = setInterval(() => {
      sound.playTick();
      const mockTopics = getRandomSubset(active, 3);
      setSelectedTopicIds(mockTopics.map((t) => t.id));
      const mockMember = candidatePool[Math.floor(Math.random() * candidatePool.length)];
      setSelectedMemberId(mockMember.id);
      counter++;

      if (counter >= 14) {
        clearInterval(interval);
        const finalTopics = getRandomSubset(active, 3);
        const finalTopicIds = finalTopics.map((t) => t.id);
        setSelectedTopicIds(finalTopicIds);

        const finalMember = candidatePool[Math.floor(Math.random() * candidatePool.length)];
        setSelectedMemberId(finalMember.id);

        // 抽中即標記為已分享（進入灰色排除名單，不會再被抽中直到 reset）
        setMembers((prev) =>
          prev.map((m) =>
            m.id === finalMember.id
              ? { ...m, hasShared: true, sharedCount: (m.sharedCount || 0) + 1 }
              : m
          )
        );

        // Update drawn count
        setTopics((prev) =>
          prev.map((t) =>
            finalTopicIds.includes(t.id) ? { ...t, timesDrawn: t.timesDrawn + 1 } : t
          )
        );

        setIsShuffling(false);
        sound.playChime();
      }
    }, 90);
  }, [topics, members, sound]);

  // Complete and log sharing
  const handleCompleteSharing = (chosenTopicText?: string, note?: string) => {
    const member = members.find((m) => m.id === selectedMemberId);
    const activeSelectedTopics = topics.filter((t) => selectedTopicIds.includes(t.id));

    if (member) {
      // Ensure member is marked as shared
      setMembers((prev) =>
        prev.map((m) =>
          m.id === member.id ? { ...m, hasShared: true } : m
        )
      );

      // Add to records
      const newRecord: SharingRecord = {
        id: 'rec-' + Date.now(),
        timestamp: Date.now(),
        memberName: member.name,
        memberRole: member.role,
        avatarUrl: member.avatarUrl,
        topics: activeSelectedTopics.map((t) => t.text),
        chosenTopic: chosenTopicText || (activeSelectedTopics[0]?.text ?? ''),
        note,
      };

      setRecords((prev) => [newRecord, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleResetAll = () => {
    if (window.confirm('確定要重設本輪小組分享狀態嗎？（將清空當前選取與已分享標記）')) {
      setSelectedTopicIds([]);
      setSelectedMemberId(null);
      setMembers((prev) => prev.map((m) => ({ ...m, hasShared: false })));
    }
  };

  const activeTopics = topics.filter((t) => t.enabled);
  const eligibleMembers = members.filter(
    (m) => m.role !== '小組長' && m.role !== '小組組長'
  );
  const presentMembers = eligibleMembers.filter((m) => m.isPresent);
  const unsharedCount = presentMembers.filter((m) => !m.hasShared).length;

  const currentSelectedTopics = topics.filter((t) => selectedTopicIds.includes(t.id));
  const currentSelectedMember = members.find((m) => m.id === selectedMemberId) || null;

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={records.length}
        onResetAll={handleResetAll}
        layoutMode={layoutMode}
        onToggleLayout={handleToggleLayout}
      />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 flex-1 flex flex-col gap-5">
        {layoutMode === 'members-top' ? (
          <>
            {/* 1. Top Section: Group Members Panel (小組組員名單在最上) */}
            <section className="w-full">
              <MembersPanel
                members={members}
                selectedMemberId={selectedMemberId}
                onDrawMember={handleDrawMemberFirst}
                onTogglePresent={handleTogglePresent}
                onToggleShared={handleToggleShared}
                onAddMember={handleAddMember}
                onDeleteMember={handleDeleteMember}
                onResetSharedStatus={handleResetSharedStatus}
                isDrawing={isShuffling || isShufflingTopics}
                isTopLayout={true}
                onUpdateMember={handleUpdateMember}
                onUpdateMemberAvatar={handleUpdateMemberAvatar}
              />
            </section>

            {/* 2. Middle Section: Central Draw Action Center */}
            <DrawActionCenter
              onDrawMemberFirst={handleDrawMemberFirst}
              onDrawSequential={handleDrawSequential}
              onDrawBoth={handleDrawBoth}
              onDrawTopics={handleDrawTopics}
              isDrawing={isShuffling || isShufflingTopics}
              activeTopicsCount={activeTopics.length}
              presentMembersCount={presentMembers.length}
              unsharedCount={unsharedCount}
              avoidRepeat={avoidRepeat}
              onToggleAvoidRepeat={() => setAvoidRepeat((prev) => !prev)}
            />

            {/* 3. Bottom Section: 10 Sharing Topics Panel (分享題目庫) */}
            <section className="w-full">
              <TopicsPanel
                topics={topics}
                selectedTopicIds={selectedTopicIds}
                onDrawTopics={handleDrawTopics}
                onToggleTopic={handleToggleTopic}
                onUpdateTopic={handleUpdateTopic}
                onDeleteTopic={handleDeleteTopic}
                onAddTopic={handleAddTopic}
                onApplyPreset={handleApplyPreset}
                isDrawing={isShuffling || isShufflingTopics}
                isTopLayout={true}
              />
            </section>
          </>
        ) : (
          <>
            {/* Central Draw Action Center */}
            <DrawActionCenter
              onDrawMemberFirst={handleDrawMemberFirst}
              onDrawSequential={handleDrawSequential}
              onDrawBoth={handleDrawBoth}
              onDrawTopics={handleDrawTopics}
              isDrawing={isShuffling || isShufflingTopics}
              activeTopicsCount={activeTopics.length}
              presentMembersCount={presentMembers.length}
              unsharedCount={unsharedCount}
              avoidRepeat={avoidRepeat}
              onToggleAvoidRepeat={() => setAvoidRepeat((prev) => !prev)}
            />

            {/* 2-Column Core Layout: Left (10 Topics) & Right (Members) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start">
              {/* Left Column: 10 Sharing Topics (7 cols on desktop) */}
              <div className="lg:col-span-7 h-full">
                <TopicsPanel
                  topics={topics}
                  selectedTopicIds={selectedTopicIds}
                  onDrawTopics={handleDrawTopics}
                  onToggleTopic={handleToggleTopic}
                  onUpdateTopic={handleUpdateTopic}
                  onDeleteTopic={handleDeleteTopic}
                  onAddTopic={handleAddTopic}
                  onApplyPreset={handleApplyPreset}
                  isDrawing={isShuffling || isShufflingTopics}
                  isTopLayout={false}
                />
              </div>

              {/* Right Column: Group Members (5 cols on desktop) */}
              <div className="lg:col-span-5 h-full">
                <MembersPanel
                  members={members}
                  selectedMemberId={selectedMemberId}
                  onDrawMember={handleDrawMemberFirst}
                  onTogglePresent={handleTogglePresent}
                  onToggleShared={handleToggleShared}
                  onAddMember={handleAddMember}
                  onDeleteMember={handleDeleteMember}
                  onResetSharedStatus={handleResetSharedStatus}
                  isDrawing={isShuffling || isShufflingTopics}
                  isTopLayout={false}
                  onUpdateMember={handleUpdateMember}
                  onUpdateMemberAvatar={handleUpdateMemberAvatar}
                />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Interactive Draw Result / Showcase Modal */}
      <DrawShowcaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTopics={currentSelectedTopics}
        selectedMember={currentSelectedMember}
        onRerollTopics={handleDrawTopics}
        onRerollMember={handleRerollMemberOnly}
        onCompleteSharing={handleCompleteSharing}
        isShuffling={isShuffling}
        isShufflingTopics={isShufflingTopics}
        onUpdateMemberAvatar={handleUpdateMemberAvatar}
      />

      {/* Sharing History & Export Drawer */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        records={records}
        onClearHistory={() => setRecords([])}
      />

      {/* Subtle Footer */}
      <footer className="py-4 text-center text-xs text-stone-400 border-t border-stone-200/60 bg-white/50">
        <p>
          「若一個肢體受苦，所有的肢體就一同受苦；若一個肢體得榮耀，所有的肢體就一同快樂。」— 哥林多前書 12:26
        </p>
      </footer>
    </div>
  );
}
