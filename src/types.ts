export interface SharingTopic {
  id: string;
  text: string;
  category?: '感恩' | '靈修' | '代禱' | '同行' | '生活';
  enabled: boolean;
  timesDrawn: number;
}

export interface GroupMember {
  id: string;
  name: string;
  role?: string;
  avatarBg: string;
  avatarUrl?: string;
  isPresent: boolean;
  hasShared: boolean;
  sharedCount: number;
}

export interface SharingRecord {
  id: string;
  timestamp: number;
  memberName: string;
  memberRole?: string;
  avatarUrl?: string;
  topics: string[];
  chosenTopic?: string;
  durationSeconds?: number;
  note?: string;
}

export interface TopicPreset {
  id: string;
  name: string;
  description: string;
  topics: string[];
}
