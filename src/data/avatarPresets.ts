// Curated fellowship & faith avatar presets
export interface AvatarPreset {
  id: string;
  name: string;
  category: '肢體人物' | '信仰象徵';
  url: string;
}

const svgToUrl = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

// Character avatars with friendly faces & warm palette
const avatarYouthBrother = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bg1)"/>
  <!-- Hair back -->
  <path d="M26,45 C26,22 74,22 74,45 C74,30 65,18 50,18 C35,18 26,30 26,45 Z" fill="#1e293b"/>
  <!-- Face -->
  <ellipse cx="50" cy="52" rx="22" ry="24" fill="#fed7aa"/>
  <!-- Ears -->
  <ellipse cx="28" cy="52" rx="4" ry="6" fill="#fdba74"/>
  <ellipse cx="72" cy="52" rx="4" ry="6" fill="#fdba74"/>
  <!-- Hair front -->
  <path d="M28,40 C34,26 66,24 72,40 C66,32 55,30 45,34 C38,36 32,36 28,40 Z" fill="#1e293b"/>
  <!-- Eyes -->
  <circle cx="42" cy="50" r="2.5" fill="#1e293b"/>
  <circle cx="58" cy="50" r="2.5" fill="#1e293b"/>
  <!-- Eyeballs shine -->
  <circle cx="43" cy="49" r="0.8" fill="#ffffff"/>
  <circle cx="59" cy="49" r="0.8" fill="#ffffff"/>
  <!-- Smile -->
  <path d="M42,61 Q50,68 58,61" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <!-- Cheeks -->
  <circle cx="37" cy="56" r="3" fill="#f43f5e" opacity="0.3"/>
  <circle cx="63" cy="56" r="3" fill="#f43f5e" opacity="0.3"/>
  <!-- Clothes -->
  <path d="M25,88 Q50,80 75,88 L78,100 L22,100 Z" fill="#ffffff"/>
  <path d="M36,83 Q50,75 64,83 L66,100 L34,100 Z" fill="#60a5fa"/>
</svg>
`);

const avatarJoySister = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#be185d"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bg2)"/>
  <!-- Long Hair background -->
  <path d="M22,46 C22,22 78,22 78,46 C80,68 76,82 72,90 C68,76 68,60 68,50 C32,50 32,76 28,90 C24,82 20,68 22,46 Z" fill="#451a03"/>
  <!-- Face -->
  <ellipse cx="50" cy="50" rx="20" ry="22" fill="#fed7aa"/>
  <!-- Hair bangs -->
  <path d="M28,42 C35,28 65,28 72,42 C65,34 56,33 50,37 C44,33 35,34 28,42 Z" fill="#451a03"/>
  <!-- Eyes with happy curl -->
  <path d="M38,48 Q42,44 46,48" stroke="#451a03" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M54,48 Q58,44 62,48" stroke="#451a03" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- Blush -->
  <ellipse cx="37" cy="54" rx="4" ry="2.5" fill="#f43f5e" opacity="0.4"/>
  <ellipse cx="63" cy="54" rx="4" ry="2.5" fill="#f43f5e" opacity="0.4"/>
  <!-- Big joyful smile -->
  <path d="M42,58 Q50,68 58,58 Z" fill="#e11d48"/>
  <!-- Hair clip (warm flower) -->
  <circle cx="68" cy="35" r="4.5" fill="#fef08a"/>
  <circle cx="68" cy="35" r="2" fill="#f97316"/>
  <!-- Clothes -->
  <path d="M26,86 Q50,78 74,86 L78,100 L22,100 Z" fill="#fbcfe8"/>
</svg>
`);

const avatarGlassesBrother = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#065f46"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bg3)"/>
  <!-- Hair -->
  <path d="M28,42 C26,22 74,22 72,42 C72,28 62,18 50,18 C38,18 28,28 28,42 Z" fill="#1f2937"/>
  <!-- Face -->
  <ellipse cx="50" cy="52" rx="21" ry="23" fill="#ffedd5"/>
  <!-- Ears -->
  <ellipse cx="28" cy="52" rx="3.5" ry="5.5" fill="#fed7aa"/>
  <ellipse cx="72" cy="52" rx="3.5" ry="5.5" fill="#fed7aa"/>
  <!-- Eyes -->
  <circle cx="41" cy="51" r="2.5" fill="#1f2937"/>
  <circle cx="59" cy="51" r="2.5" fill="#1f2937"/>
  <!-- Glasses -->
  <rect x="33" y="44" width="16" height="13" rx="4" fill="none" stroke="#334155" stroke-width="2.2"/>
  <rect x="51" y="44" width="16" height="13" rx="4" fill="none" stroke="#334155" stroke-width="2.2"/>
  <line x1="49" y1="50" x2="51" y2="50" stroke="#334155" stroke-width="2.2"/>
  <!-- Gentle smile -->
  <path d="M44,63 Q50,68 56,63" stroke="#c2410c" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Clothes: neat collar -->
  <path d="M26,88 Q50,80 74,88 L78,100 L22,100 Z" fill="#e2e8f0"/>
  <polygon points="50,84 45,95 55,95" fill="#047857"/>
</svg>
`);

const avatarGentleSister = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bg4)"/>
  <!-- Hair back -->
  <circle cx="50" cy="46" r="28" fill="#312e81"/>
  <!-- Face -->
  <ellipse cx="50" cy="51" rx="20" ry="22" fill="#fed7aa"/>
  <!-- Hair Bob style -->
  <path d="M26,45 C28,26 72,26 74,45 C74,62 70,68 68,68 C68,54 62,34 50,34 C38,34 32,54 32,68 C30,68 26,62 26,45 Z" fill="#312e81"/>
  <!-- Eyes -->
  <circle cx="42" cy="50" r="2.2" fill="#1e1b4b"/>
  <circle cx="58" cy="50" r="2.2" fill="#1e1b4b"/>
  <!-- Blush -->
  <circle cx="36" cy="55" r="3" fill="#f43f5e" opacity="0.35"/>
  <circle cx="64" cy="55" r="3" fill="#f43f5e" opacity="0.35"/>
  <!-- Warm sweet smile -->
  <path d="M43,60 Q50,66 57,60" stroke="#be123c" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Clothes -->
  <path d="M26,86 Q50,80 74,86 L78,100 L22,100 Z" fill="#ede9fe"/>
</svg>
`);

const avatarWarmBrother = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bg5)"/>
  <!-- Curly hair -->
  <circle cx="36" cy="30" r="10" fill="#3e2723"/>
  <circle cx="50" cy="26" r="10" fill="#3e2723"/>
  <circle cx="64" cy="30" r="10" fill="#3e2723"/>
  <circle cx="30" cy="38" r="9" fill="#3e2723"/>
  <circle cx="70" cy="38" r="9" fill="#3e2723"/>
  <!-- Face -->
  <ellipse cx="50" cy="52" rx="22" ry="23" fill="#fed7aa"/>
  <!-- Eyes with smile -->
  <path d="M40,50 Q43,47 46,50" stroke="#3e2723" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M54,50 Q57,47 60,50" stroke="#3e2723" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- Cheeks -->
  <circle cx="37" cy="56" r="3.5" fill="#f43f5e" opacity="0.3"/>
  <circle cx="63" cy="56" r="3.5" fill="#f43f5e" opacity="0.3"/>
  <!-- Broad happy smile -->
  <path d="M41,60 Q50,70 59,60 Z" fill="#be123c"/>
  <!-- Clothes -->
  <path d="M26,88 Q50,80 74,88 L78,100 L22,100 Z" fill="#fef3c7"/>
</svg>
`);

const avatarPraiseSister = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bg6)"/>
  <!-- High ponytail -->
  <ellipse cx="68" cy="24" rx="8" ry="14" fill="#292524" transform="rotate(30 68 24)"/>
  <!-- Face -->
  <ellipse cx="50" cy="52" rx="20" ry="22" fill="#fed7aa"/>
  <!-- Hair -->
  <path d="M28,44 C30,26 70,26 72,44 C66,35 56,32 50,36 C44,32 34,35 28,44 Z" fill="#292524"/>
  <!-- Eyes -->
  <circle cx="42" cy="51" r="2.2" fill="#292524"/>
  <circle cx="58" cy="51" r="2.2" fill="#292524"/>
  <!-- Sweet Smile -->
  <path d="M43,61 Q50,67 57,61" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <!-- Clothes -->
  <path d="M26,86 Q50,80 74,86 L78,100 L22,100 Z" fill="#cffafe"/>
</svg>
`);

// Faith & Fellowship Symbols
const avatarGraceCross = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bgCross" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#c2410c"/>
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#fde047" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#fde047" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bgCross)"/>
  <!-- Golden Sun Glow -->
  <circle cx="50" cy="45" r="32" fill="url(#sunGlow)"/>
  <!-- Cross Shadow -->
  <rect x="44" y="22" width="14" height="58" rx="3" fill="#78350f" opacity="0.4"/>
  <rect x="25" y="37" width="52" height="14" rx="3" fill="#78350f" opacity="0.4"/>
  <!-- White & Gold Holy Cross -->
  <rect x="43" y="20" width="14" height="58" rx="3" fill="#ffffff"/>
  <rect x="24" y="35" width="52" height="14" rx="3" fill="#ffffff"/>
  <!-- Inner gold inlay -->
  <rect x="47" y="24" width="6" height="50" rx="1.5" fill="#fef08a"/>
  <rect x="28" y="39" width="44" height="6" rx="1.5" fill="#fef08a"/>
  <!-- Light sparkle -->
  <circle cx="50" cy="42" r="3.5" fill="#fef08a"/>
  <polygon points="50,33 52,42 61,42 53,46 56,54 50,49 44,54 47,46 39,42 48,42" fill="#ffffff" opacity="0.9"/>
</svg>
`);

const avatarPeaceDove = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bgDove" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bgDove)"/>
  <!-- Clouds -->
  <circle cx="28" cy="74" r="14" fill="#ffffff" opacity="0.25"/>
  <circle cx="48" cy="78" r="16" fill="#ffffff" opacity="0.25"/>
  <circle cx="70" cy="75" r="13" fill="#ffffff" opacity="0.25"/>
  <!-- Holy Spirit Dove -->
  <g fill="#ffffff">
    <!-- Body -->
    <path d="M38,55 C42,48 55,46 64,52 C68,54 75,56 78,54 C72,62 58,66 46,65 C40,65 35,60 38,55 Z"/>
    <!-- Head -->
    <circle cx="72" cy="46" r="8"/>
    <!-- Beak with olive leaf -->
    <polygon points="79,47 87,49 79,51" fill="#f59e0b"/>
    <!-- Olive Leaf -->
    <ellipse cx="87" cy="46" rx="4" ry="2" fill="#22c55e" transform="rotate(-20 87 46)"/>
    <!-- Wings -->
    <path d="M48,50 C44,36 34,25 24,24 C30,36 40,46 45,51 Z"/>
    <path d="M52,50 C55,34 64,22 75,20 C68,32 58,44 54,51 Z"/>
    <!-- Tail -->
    <path d="M38,58 L20,68 C24,64 26,58 32,56 Z"/>
  </g>
  <!-- Eye -->
  <circle cx="74" cy="45" r="1.5" fill="#0369a1"/>
</svg>
`);

const avatarBibleWord = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bgBible" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#4338ca"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bgBible)"/>
  <!-- Open Bible Pages -->
  <path d="M50,42 C40,36 28,37 20,40 L20,70 C28,67 40,66 50,72 C60,66 72,67 80,70 L80,40 C72,37 60,36 50,42 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <!-- Book Cover base -->
  <path d="M18,42 L18,72 C27,69 40,68 50,74 C60,68 73,69 82,72 L82,42" fill="none" stroke="#e0e7ff" stroke-width="3"/>
  <!-- Lines of Scripture -->
  <line x1="26" y1="47" x2="44" y2="47" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <line x1="26" y1="53" x2="44" y2="53" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <line x1="26" y1="59" x2="38" y2="59" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <line x1="56" y1="47" x2="74" y2="47" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <line x1="56" y1="53" x2="74" y2="53" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <line x1="56" y1="59" x2="68" y2="59" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <!-- Red Bookmark Ribbon -->
  <path d="M50,42 L50,76 L47,72 L50,76 L53,72 Z" fill="#ef4444"/>
  <!-- Golden Cross on Left Page -->
  <path d="M33,32 L37,32 M35,29 L35,36" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
</svg>
`);

const avatarGentleLamb = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bgLamb" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bgLamb)"/>
  <!-- Lamb Wool Clumps -->
  <circle cx="36" cy="62" r="14" fill="#ffffff"/>
  <circle cx="64" cy="62" r="14" fill="#ffffff"/>
  <circle cx="50" cy="65" r="15" fill="#ffffff"/>
  <circle cx="50" cy="52" r="16" fill="#ffffff"/>
  <circle cx="38" cy="44" r="12" fill="#ffffff"/>
  <circle cx="62" cy="44" r="12" fill="#ffffff"/>
  <!-- Lamb Face -->
  <ellipse cx="50" cy="54" rx="14" ry="13" fill="#fde68a"/>
  <!-- Ears -->
  <ellipse cx="34" cy="50" rx="7" ry="4" fill="#fde68a" transform="rotate(-25 34 50)"/>
  <ellipse cx="66" cy="50" rx="7" ry="4" fill="#fde68a" transform="rotate(25 66 50)"/>
  <!-- Wool on forehead -->
  <circle cx="46" cy="42" r="5" fill="#ffffff"/>
  <circle cx="54" cy="42" r="5" fill="#ffffff"/>
  <circle cx="50" cy="40" r="5.5" fill="#ffffff"/>
  <!-- Eyes -->
  <circle cx="44" cy="53" r="2" fill="#1f2937"/>
  <circle cx="56" cy="53" r="2" fill="#1f2937"/>
  <!-- Nose & Smile -->
  <polygon points="50,58 48,56 52,56" fill="#f43f5e"/>
  <path d="M47,61 Q50,64 53,61" stroke="#f43f5e" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <!-- Cheeks -->
  <circle cx="41" cy="57" r="2.5" fill="#f43f5e" opacity="0.4"/>
  <circle cx="59" cy="57" r="2.5" fill="#f43f5e" opacity="0.4"/>
</svg>
`);

const avatarHeartFellowship = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bgHeart" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bgHeart)"/>
  <!-- Radiant Heart -->
  <path d="M50,76 C20,55 18,34 32,26 C41,20 47,26 50,32 C53,26 59,20 68,26 C82,34 80,55 50,76 Z" fill="#ffffff"/>
  <!-- Inner Cross in Heart -->
  <rect x="47" y="38" width="6" height="22" rx="2" fill="#e11d48"/>
  <rect x="40" y="44" width="20" height="6" rx="2" fill="#e11d48"/>
  <!-- Sparkles -->
  <circle cx="28" cy="30" r="2" fill="#fef08a"/>
  <circle cx="72" cy="30" r="2" fill="#fef08a"/>
</svg>
`);

const avatarPrayerCandle = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bgCandle" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="flameGlow" cx="50%" cy="35%" r="40%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#f97316" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bgCandle)"/>
  <!-- Candle Warm Glow -->
  <circle cx="50" cy="36" r="30" fill="url(#flameGlow)"/>
  <!-- Candle Body -->
  <rect x="41" y="48" width="18" height="34" rx="4" fill="#f8fafc"/>
  <ellipse cx="50" cy="48" rx="9" ry="2.5" fill="#f1f5f9"/>
  <!-- Wick -->
  <line x1="50" y1="48" x2="50" y2="40" stroke="#475569" stroke-width="2.2" stroke-linecap="round"/>
  <!-- Flame Outer -->
  <path d="M50,22 C44,30 43,38 50,42 C57,38 56,30 50,22 Z" fill="#f59e0b"/>
  <!-- Flame Inner Core -->
  <path d="M50,27 C47,33 46,38 50,41 C54,38 53,33 50,27 Z" fill="#fef08a"/>
</svg>
`);

const avatarPraiseNotes = svgToUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bgNotes" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#bgNotes)"/>
  <!-- Music Staff curves -->
  <path d="M15,65 Q50,45 85,60" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2" fill="none"/>
  <path d="M15,72 Q50,52 85,67" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2" fill="none"/>
  <!-- Big Double Note -->
  <ellipse cx="36" cy="62" rx="7" ry="5.5" fill="#ffffff" transform="rotate(-20 36 62)"/>
  <ellipse cx="62" cy="52" rx="7" ry="5.5" fill="#ffffff" transform="rotate(-20 62 52)"/>
  <rect x="40" y="30" width="4" height="32" fill="#ffffff"/>
  <rect x="66" y="20" width="4" height="32" fill="#ffffff"/>
  <polygon points="40,30 70,20 70,26 40,36" fill="#ffffff"/>
  <!-- Joy Sparkles -->
  <polygon points="26,30 28,34 32,36 28,38 26,42 24,38 20,36 24,34" fill="#fef08a"/>
  <polygon points="78,42 79,45 82,46 79,47 78,50 77,47 74,46 77,45" fill="#fef08a"/>
</svg>
`);

export const AVATAR_PRESETS: AvatarPreset[] = [
  { id: 'av-char-1', name: '陽光弟兄', category: '肢體人物', url: avatarYouthBrother },
  { id: 'av-char-2', name: '喜樂姊妹', category: '肢體人物', url: avatarJoySister },
  { id: 'av-char-3', name: '斯文弟兄', category: '肢體人物', url: avatarGlassesBrother },
  { id: 'av-char-4', name: '溫柔姊妹', category: '肢體人物', url: avatarGentleSister },
  { id: 'av-char-5', name: '熱心弟兄', category: '肢體人物', url: avatarWarmBrother },
  { id: 'av-char-6', name: '讚美姊妹', category: '肢體人物', url: avatarPraiseSister },
  { id: 'av-sym-1', name: '恩典十架', category: '信仰象徵', url: avatarGraceCross },
  { id: 'av-sym-2', name: '和平白鴿', category: '信仰象徵', url: avatarPeaceDove },
  { id: 'av-sym-3', name: '聖經話語', category: '信仰象徵', url: avatarBibleWord },
  { id: 'av-sym-4', name: '喜樂小羊', category: '信仰象徵', url: avatarGentleLamb },
  { id: 'av-sym-5', name: '愛心守望', category: '信仰象徵', url: avatarHeartFellowship },
  { id: 'av-sym-6', name: '禱告燭光', category: '信仰象徵', url: avatarPrayerCandle },
  { id: 'av-sym-7', name: '敬拜音符', category: '信仰象徵', url: avatarPraiseNotes },
];
