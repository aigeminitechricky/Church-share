import { SharingTopic, GroupMember, TopicPreset } from '../types';
import { AVATAR_PRESETS } from './avatarPresets';

export const DEFAULT_TOPICS: SharingTopic[] = [
  {
    id: 't-1',
    text: '本週經歷最感恩的一到三件事，或神特別賞賜的恩典',
    category: '感恩',
    enabled: true,
    timesDrawn: 0,
  },
  {
    id: 't-2',
    text: '最近在工作、學業或家庭中的挑戰，你如何學習交託與倚靠神？',
    category: '生活',
    enabled: true,
    timesDrawn: 0,
  },
  {
    id: 't-3',
    text: '近期讀經、靈修或主日信息中，哪一句話最打動或提醒你？',
    category: '靈修',
    enabled: true,
    timesDrawn: 0,
  },
  {
    id: 't-4',
    text: '這段時間有哪位小組肢體、朋友或家人帶給你溫暖與支持？',
    category: '同行',
    enabled: true,
    timesDrawn: 0,
  },
  {
    id: 't-5',
    text: '過去一段時間，神如何在你的禱告中成就或給予出人意外的平安？',
    category: '代禱',
    enabled: true,
    timesDrawn: 0,
  },
  {
    id: 't-6',
    text: '一件你近期渴望在個人靈命、屬靈習慣或品格上追求突破的事',
    category: '靈修',
    enabled: true,
    timesDrawn: 0,
  },
  {
    id: 't-7',
    text: '在日常生活或職場中，嘗試實踐「愛人如己」或服事他人的一個小故事',
    category: '生活',
    enabled: true,
    timesDrawn: 0,
  },
  {
    id: 't-8',
    text: '目前內心最需要小組弟兄姊妹同心代禱的迫切需要是什麼？',
    category: '代禱',
    enabled: true,
    timesDrawn: 0,
  },
  {
    id: 't-9',
    text: '最近有什麼事情讓你特別開懷大笑，或感到放鬆喜樂的美好時刻？',
    category: '感恩',
    enabled: true,
    timesDrawn: 0,
  },
  {
    id: 't-10',
    text: '對在座小組的其中一位肢體，說一句真誠由衷的感謝、欣賞或祝福',
    category: '同行',
    enabled: true,
    timesDrawn: 0,
  },
];

export const TOPIC_PRESETS: TopicPreset[] = [
  {
    id: 'preset-classic',
    name: '經典團契分享 (10題)',
    description: '涵蓋感恩、挑戰、讀經與代禱的均衡經典題目',
    topics: [
      '本週經歷最感恩的一到三件事，或神特別賞賜的恩典',
      '最近在工作、學業或家庭中的挑戰，你如何學習交託與倚靠神？',
      '近期讀經、靈修或主日信息中，哪一句話最打動或提醒你？',
      '這段時間有哪位小組肢體、朋友或家人帶給你溫暖與支持？',
      '過去一段時間，神如何在你的禱告中成就或給予出人意外的平安？',
      '一件你近期渴望在個人靈命、屬靈習慣或品格上追求突破的事',
      '在日常生活或職場中，嘗試實踐「愛人如己」或服事他人的一個小故事',
      '目前內心最需要小組弟兄姊妹同心代禱的迫切需要是什麼？',
      '最近有什麼事情讓你特別開懷大笑，或感到放鬆喜樂的美好時刻？',
      '對在座小組的其中一位肢體，說一句真誠由衷的感謝、欣賞或祝福',
    ],
  },
  {
    id: 'preset-icebreaker',
    name: '輕鬆破冰生活版 (10題)',
    description: '適合新朋友加入、輕鬆氛圍、拉近彼此距離',
    topics: [
      '如果用一種天氣或植物形容你這星期的心情，會是什麼？為什麼？',
      '最近吃過最療癒的一頓美食或看過的一部好劇/好書是什麼？',
      '如果明天有一整天完全自由且預算充足的時間，你最想做什麼？',
      '最近學到的一項新事物或發現的生活小確幸是什麼？',
      '分享一件小時候做過最有趣或令人發笑的糗事',
      '在小組裡你最佩服某位弟兄姊妹的什麼特質或恩賜？',
      '本週遇見讓你感到最驚喜或意想不到的一件事',
      '當你感到壓力和疲憊時，平時最喜歡怎樣給自己充充電？',
      '分享手機相簿裡最近拍的一張讓你微笑的照片背景故事',
      '如果可以向神求一個微小但溫馨的心願，你會想求什麼？',
    ],
  },
  {
    id: 'preset-deep',
    name: '心靈同行深度版 (10題)',
    description: '適合信任度高、渴望深層敞開交流的小組時光',
    topics: [
      '在目前的生命季節裡，神最常藉由什麼環境在修剪與塑造你？',
      '坦白分享一處近期令你感到內心掙扎、軟弱或不安的地方',
      '回顧信主以來，神在你生命中做過最奇妙、最深刻的一次帶領',
      '當你感到與神的關係疏離時，通常是什麼原因？你如何回到神面前？',
      '在饒恕人、接納人或放下成見的功課上，神最近教導了你什麼？',
      '你生命中最深渴望神醫治、安慰或釋放的領域是什麼？',
      '有哪些屬靈前輩或弟兄姊妹的榜樣，曾深深激勵你的信心？',
      '面對未來的方向與不確定性，你如何學習等候神的時間？',
      '在小組團契中，你最渴望得到怎樣的扶持或彼此守望？',
      '此時此刻向神做一個最由衷的心靈傾訴，你最想說什麼？',
    ],
  },
];

export const DEFAULT_MEMBERS: GroupMember[] = [
  { id: 'm-1', name: '1 號組員', role: '組員', avatarBg: 'bg-blue-500', avatarUrl: AVATAR_PRESETS[0]?.url, isPresent: true, hasShared: false, sharedCount: 0 },
  { id: 'm-2', name: '2 號組員', role: '組員', avatarBg: 'bg-indigo-500', avatarUrl: AVATAR_PRESETS[1]?.url, isPresent: true, hasShared: false, sharedCount: 0 },
  { id: 'm-3', name: '3 號組員', role: '組員', avatarBg: 'bg-emerald-500', avatarUrl: AVATAR_PRESETS[2]?.url, isPresent: true, hasShared: false, sharedCount: 0 },
  { id: 'm-4', name: '4 號組員', role: '組員', avatarBg: 'bg-amber-500', avatarUrl: AVATAR_PRESETS[3]?.url, isPresent: true, hasShared: false, sharedCount: 0 },
  { id: 'm-5', name: '5 號組員', role: '組員', avatarBg: 'bg-rose-500', avatarUrl: AVATAR_PRESETS[4]?.url, isPresent: true, hasShared: false, sharedCount: 0 },
  { id: 'm-6', name: '6 號組員', role: '組員', avatarBg: 'bg-purple-500', avatarUrl: AVATAR_PRESETS[5]?.url, isPresent: true, hasShared: false, sharedCount: 0 },
  { id: 'm-7', name: '7 號組員', role: '組員', avatarBg: 'bg-teal-500', avatarUrl: AVATAR_PRESETS[6]?.url, isPresent: true, hasShared: false, sharedCount: 0 },
  { id: 'm-8', name: '8 號組員', role: '組員', avatarBg: 'bg-sky-500', avatarUrl: AVATAR_PRESETS[7]?.url, isPresent: true, hasShared: false, sharedCount: 0 },
  { id: 'm-9', name: '9 號組員', role: '新朋友', avatarBg: 'bg-orange-500', avatarUrl: AVATAR_PRESETS[10]?.url, isPresent: true, hasShared: false, sharedCount: 0 },
  { id: 'm-10', name: '10 號組員', role: '組員', avatarBg: 'bg-cyan-500', avatarUrl: AVATAR_PRESETS[9]?.url, isPresent: true, hasShared: false, sharedCount: 0 },
];

export const SCRIPTURES = [
  { verse: '「又要彼此相顧，激發愛心，勉勵行善。你們不可停止聚會。」', reference: '希伯來書 10:24-25' },
  { verse: '「兩個人總比一個人好，因為二人勞碌同得美好的果效。」', reference: '傳道書 4:9' },
  { verse: '「凡事謙虛、溫柔、忍耐，用愛心互相寬容，用和平彼此聯絡，竭力保守聖靈所賜合而為一的心。」', reference: '以弗所書 4:2-3' },
  { verse: '「你們要彼此相愛，像我愛你們一樣；這就是我的命令。」', reference: '約翰福音 15:12' },
  { verse: '「互相坦誠代求，使你們可以得醫治。義人祈禱所發的力量是大有功效的。」', reference: '雅各書 5:16' },
  { verse: '「弟兄結伴同住，是何等的善，何等的美！」', reference: '詩篇 133:1' },
];

export const AVATAR_COLORS = [
  'bg-amber-500',
  'bg-rose-500',
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-sky-500',
  'bg-teal-500',
  'bg-violet-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-cyan-500',
  'bg-blue-500',
  'bg-yellow-600',
];
