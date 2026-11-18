import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  X, 
  ArrowRight, 
  Star,
  Play,
  Volume2,
  Edit2,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  Music,
  Plus,
  ChevronDown,
  ChevronUp,
  MoreHorizontal
} from 'lucide-react';

const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const SOCIAL_VIDEO = 'https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/socialproof/egrisocialproof.mp4';
const SOCIAL_POSTER = 'https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/socialproof/egrisocialproof_poster.jpg';

// Vercel image optimizer (prod only): serves right-sized webp instead of the full Blob originals.
const responsive = (url: string, widths: number[], sizes: string) =>
  import.meta.env.PROD
    ? {
        srcSet: widths.map((w) => `/_vercel/image?url=${encodeURIComponent(url)}&w=${w}&q=75 ${w}w`).join(', '),
        sizes,
      }
    : {};

interface SocialClient {
  name: string;
  avatar: React.ReactNode;
}

const SOCIAL_CLIENTS: SocialClient[] = [
  {
    name: 'Varga Irén',
    avatar: (
      <svg viewBox="0 0 40 40" className="w-full h-full bg-[#3B2820]">
        <circle cx="20" cy="18" r="9" fill="#E8BFA0" />
        <path d="M11 17 C10 10 30 10 29 17 C31 22 30 26 27 28 C26 23 25 19 20 18 C15 19 14 23 13 28 C10 26 9 22 11 17 Z" fill="#1C1412" />
        <path d="M12 36 C13 27 27 27 28 36 Z" fill="#8B2635" />
        <circle cx="17.5" cy="18" r="1.2" fill="#222" />
        <circle cx="22.5" cy="18" r="1.2" fill="#222" />
        <path d="M18.5 22 Q20 23.5 21.5 22" stroke="#B83A4B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Győzike',
    avatar: (
      <svg viewBox="0 0 40 40" className="w-full h-full bg-[#1F1C18]">
        <circle cx="20" cy="19" r="9.5" fill="#DDB28C" />
        <path d="M12 16 C12 11 28 11 28 16 Z" fill="#181512" />
        {/* Sunglasses */}
        <rect x="14" y="16" width="5.5" height="4" rx="1" fill="#111" />
        <rect x="20.5" y="16" width="5.5" height="4" rx="1" fill="#111" />
        <line x1="19.5" y1="18" x2="20.5" y2="18" stroke="#EAA824" strokeWidth="1" />
        {/* Animal print collar */}
        <path d="M11 36 C13 28 27 28 29 36 Z" fill="#E5A823" />
        <path d="M14 31 L17 36 M20 29 L21 36 M24 30 L26 36" stroke="#111" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'Zsebibaba',
    avatar: (
      <svg viewBox="0 0 40 40" className="w-full h-full bg-[#2A1D27]">
        {/* Blonde ponytail */}
        <circle cx="26" cy="12" r="5" fill="#F4CF74" />
        <circle cx="20" cy="19" r="8.5" fill="#F5CBA7" />
        <path d="M13 18 C14 11 26 11 27 18 Z" fill="#F4CF74" />
        <circle cx="17" cy="19" r="1.2" fill="#2A1B28" />
        <circle cx="23" cy="19" r="1.2" fill="#2A1B28" />
        <path d="M18.5 22.5 Q20 23.8 21.5 22.5" stroke="#E84393" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M12 36 C13 28 27 28 28 36 Z" fill="#FD79A8" />
      </svg>
    ),
  },
  {
    name: 'Norina Diamond',
    avatar: (
      <svg viewBox="0 0 40 40" className="w-full h-full bg-[#1A1A22]">
        <circle cx="20" cy="19" r="9" fill="#F2D0B6" />
        {/* Platinum chic bob */}
        <path d="M11 17 C11 9 29 9 29 17 C30 23 28 26 27 28 C26 21 24 18 20 18 C16 18 14 21 13 28 C12 26 10 23 11 17 Z" fill="#ECECF0" />
        <circle cx="17" cy="18.5" r="1.2" fill="#111" />
        <circle cx="23" cy="18.5" r="1.2" fill="#111" />
        <path d="M18.5 22.5 Q20 24 21.5 22.5" stroke="#D63031" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Diamond dress collar */}
        <path d="M11 36 C13 27 27 27 29 36 Z" fill="#2C3A47" />
        <polygon points="20,29 22,31 20,33 18,31" fill="#74B9FF" />
      </svg>
    ),
  },
  {
    name: 'Johnny Gold',
    avatar: (
      <svg viewBox="0 0 40 40" className="w-full h-full bg-[#2A241A]">
        {/* Tanned sculpted silhouette */}
        <circle cx="20" cy="19" r="9.5" fill="#C99468" />
        <path d="M13 14 C15 9 25 9 27 14 Z" fill="#3D2B1F" />
        {/* Gold sunglasses */}
        <rect x="14" y="16" width="5.5" height="4" rx="1" fill="#EAA824" />
        <rect x="20.5" y="16" width="5.5" height="4" rx="1" fill="#EAA824" />
        <line x1="19.5" y1="18" x2="20.5" y2="18" stroke="#111" strokeWidth="1" />
        {/* Tank with gold chain */}
        <path d="M10 36 C12 26 28 26 30 36 Z" fill="#1E272E" />
        <path d="M16 28 Q20 33 24 28" stroke="#EAA824" strokeWidth="1.6" fill="none" />
      </svg>
    ),
  },
  {
    name: 'Fekete Pákó',
    avatar: (
      <svg viewBox="0 0 40 40" className="w-full h-full bg-[#181E1C]">
        {/* Warm skin tone & bright smile */}
        <circle cx="20" cy="19" r="9.5" fill="#66442C" />
        <path d="M13 15 C13 11 27 11 27 15 Z" fill="#1E140E" />
        <circle cx="16.5" cy="18" r="1.3" fill="#FFF" />
        <circle cx="16.5" cy="18" r="0.7" fill="#000" />
        <circle cx="23.5" cy="18" r="1.3" fill="#FFF" />
        <circle cx="23.5" cy="18" r="0.7" fill="#000" />
        {/* Broad smile */}
        <path d="M16 22 Q20 27 24 22 Z" fill="#FFF" />
        {/* Tropical red/yellow collar */}
        <path d="M11 36 C13 27 27 27 29 36 Z" fill="#D63031" />
        <polygon points="20,28 22,34 18,34" fill="#EAA824" />
      </svg>
    ),
  },
];

interface TikTokTestimonial {
  id: string;
  name: string;
  username: string;
  role: string;
  quote: string;
  fullQuote: string;
  thumbnail: string;
  thumbnailClass?: string;
  accentGradient: string;
  duration: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  audioTrack: string;
}

const TIKTOK_TESTIMONIALS: TikTokTestimonial[] = [
  {
    id: 'norina',
    name: 'Norina Diamond',
    username: '@norinadiamond',
    role: 'Énekesnő & TikTok Alkotó',
    quote: 'The way to get started is to quit talking and begin.',
    fullQuote: 'Az EgriProd nélkül még mindig csak az asztalfióknak írnám a szövegeket. Egy profi stúdiócsapat, akik azonnal ráéreztek a stílusomra, és a dalunk 3 nap alatt a TikTok zenei toplistájára ugrott!',
    thumbnail: SOCIAL_POSTER,
    thumbnailClass: 'scale-[1.3] object-[center_20%] hue-rotate-15',
    accentGradient: 'from-purple-950/90 via-black/40 to-black/70',
    duration: '0:58',
    views: '980K megtekintés',
    likes: '485K',
    comments: '8.9K',
    shares: '24K',
    audioTrack: 'EgriProd - Norina Diamond Glam Beat',
  },
  {
    id: 'gyozike',
    name: 'Győzike',
    username: '@gyozike_original',
    role: 'Showman & Előadó',
    quote: "Opportunities don't happen. You create them.",
    fullQuote: 'Egyetlen délután alatt összeraktuk az egész nótát Tiborral. Nem volt üres duma, csak kemény munka és prémium mastering. A TikTok algoritmus megőrült érte, azonnal kilőtt az űrbe!',
    thumbnail: SOCIAL_POSTER,
    thumbnailClass: 'scale-[1.25] object-[center_25%]',
    accentGradient: 'from-amber-950/90 via-black/40 to-black/70',
    duration: '1:14',
    views: '1.4M megtekintés',
    likes: '890K',
    comments: '14.2K',
    shares: '38K',
    audioTrack: 'EgriProd - Showman Anthem (Original Sound)',
  },
  {
    id: 'egri_center',
    name: 'Egri Tibor & Alkotók',
    username: '@egri_prod_official',
    role: 'Zenei Producer & Hitmaker',
    quote: 'Embracing the burn, redefining my limits',
    fullQuote: 'Nulláról a For You Page csúcsára. Az EgriProd lényege a gyorsaság, a radio-ready mastering és az, hogy 0% jogdíjat nyúlunk le a sikeredből. A dal 100%-ban a tied marad.',
    thumbnail: SOCIAL_POSTER,
    thumbnailClass: 'scale-[1.15] object-[center_35%]',
    accentGradient: 'from-neutral-950/95 via-black/40 to-black/70',
    duration: '1:28',
    views: '2.3M megtekintés',
    likes: '635K',
    comments: '12K',
    shares: 'Share',
    audioTrack: 'EgriProd - FYP Beat #1 Trending (Original Sound)',
  },
  {
    id: 'varga_iren',
    name: 'Varga Irén',
    username: '@vargairen_real',
    role: 'Internetes Szenzáció',
    quote: 'It takes courage to grow up and become who you really are',
    fullQuote: 'Imádom a dalt, amit nekem készítettek! Több mint egymillióan énekelték a hookomat, mindenhol ez szól, amerre járok. Köszi Tibi és az EgriProd!',
    thumbnail: SOCIAL_POSTER,
    thumbnailClass: 'scale-[1.35] object-[center_35%]',
    accentGradient: 'from-rose-950/90 via-black/40 to-black/70',
    duration: '1:02',
    views: '1.8M megtekintés',
    likes: '1.4M',
    comments: '29K',
    shares: 'Share',
    audioTrack: 'EgriProd - Varga Irén Viral Remix (Official)',
  },
  {
    id: 'johnny_gold',
    name: 'Johnny Gold',
    username: '@johnnygold_pro',
    role: 'Fitness & Zenei Ikon',
    quote: 'Success is not in what you have, but who you are.',
    fullQuote: 'A fitnesztermekben és a klubokban is ez a zene pörög. Tiszta, masszív hangzás, nem gagyi házi demó, hanem igazi profi amerikai szintű produkció.',
    thumbnail: SOCIAL_POSTER,
    thumbnailClass: 'scale-[1.28] object-[center_45%] brightness-110',
    accentGradient: 'from-yellow-950/90 via-black/40 to-black/70',
    duration: '0:48',
    views: '760K megtekintés',
    likes: '512K',
    comments: '9.8K',
    shares: 'Share',
    audioTrack: 'EgriProd - Golden Pump Energy Beat',
  },
];

interface PricingTier {
  id: string;
  name: string;
  image: string;
  price: string;
  goal: string;
  badge?: string | null;
  isPopular?: boolean;
  ctaText: string;
  features: {
    label: string;
    value: string;
    muted?: boolean;
  }[];
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-1',
    name: 'Saját Dal + Lyrics Videó',
    image: 'https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/pricing1.webp',
    price: '180.000 Ft – 220.000 Ft',
    goal: 'Megírjuk a szöveget, elkészítjük a zenét, és felvesszük a dalodat – akár otthonról is, utazás nélkül. Kapsz hozzá egy profi dalszöveges videót és borítóképet, hogy rögtön felrakhasd a YouTube-ra. Minden 7 munkanap alatt elkészül, és a dal 100%-ban a tiéd marad.',
    badge: null,
    isPopular: false,
    ctaText: 'Kérem a Belépő Csomagot',
    features: [
      { label: 'Zenei alap & Mix/Master', value: 'Exkluzív custom beat + rádiós utómunka' },
      { label: 'Dalszöveg', value: 'Hozott szöveg „Sláger Audittal” és ritmikai javítással' },
      { label: 'Vokál felvétel', value: 'Személyes budapesti stúdiófelvétel' },
      { label: 'Klip / Vizuál', value: 'Nem tartalmazza (Order Bump-ként kérhető)', muted: true },
      { label: 'Megjelenési Hype', value: 'DIY Útmutató (7 részes videós tartalomgyártási tananyag)' },
      { label: 'Finomhangolás', value: '2 módosítási kör a véglegesítés előtt' },
    ],
  },
  {
    id: 'tier-2',
    name: 'Dal + Stúdióklip + Promo',
    image: 'https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/pricing2.webp',
    price: '320.000 Ft – 380.000 Ft',
    goal: 'Megkapod a teljes kész dalodat, és mellé forgatunk egy profi videóklipet a stúdióban. Készítünk veled egy podcast-beszélgetést is, és ebből a kettőből összevágunk neked 20 rövid videót TikTokra, Instagramra, Facebookra és YouTube-ra. Így 7 munkanap alatt nemcsak egy saját dalod lesz, hanem 20 kész videód is, amivel azonnal reklámozhatod a zenédet.',
    badge: 'LEGNÉPSZERŰBB',
    isPopular: true,
    ctaText: 'Csinálj nekem is Tiktok slágert!',
    features: [
      { label: 'Zenei alap & Mix/Master', value: 'Exkluzív custom beat + rádiós utómunka' },
      { label: 'Dalszöveg', value: '100% DFY Ghostwriting (a teljes szöveget mi írjuk neked)' },
      { label: 'Vokál felvétel', value: 'Személyes stúdiófelvétel VAGY VIP Távoli felvételi eljárás' },
      { label: 'Klip / Vizuál', value: 'TikTok Stúdió-Klip / Visualizer (vágva, feliratozva)' },
      { label: 'Megjelenési Hype', value: 'Útmutató + 1 órás Stúdió Podcast videóssal (20+ vágható Reels)' },
      { label: 'Finomhangolás', value: '3 módosítási kör a tökéletes hangzásért' },
    ],
  },
  {
    id: 'tier-3',
    name: 'Dal + Külsős Klip + Promo',
    image: 'https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/pricing3.webp',
    price: '550.000 Ft – 750.000 Ft',
    goal: 'Ebben a csomagban benne van a kész dalod, a podcast-felvétel és a 20 rövid közösségi médiás videó is. A legnagyobb extra, hogy a videóklipet egy külső helyszínen forgatjuk le, amit mi szervezünk le helyetted. Neked csak el kell jönnöd a megadott címre, és 7 munkanap múlva a tiéd a kész klip és a 100%-ban saját jogú dalod.',
    badge: 'VIP',
    isPopular: false,
    ctaText: 'Jelentkezem a VIP Áttörésre',
    features: [
      { label: 'Zenei alap & Mix/Master', value: 'Prémium custom beat + rádiós utómunka' },
      { label: 'Dalszöveg', value: '100% DFY Ghostwriting (személyre szabott, virális fókusz)' },
      { label: 'Vokál felvétel', value: 'Személyes stúdió VAGY VIP Távoli felvételi eljárás' },
      { label: 'Klip / Vizuál', value: 'Hivatalos 4K Zenei Videóklip professzionális forgatással' },
      { label: 'Megjelenési Hype', value: 'Útmutató + Podcast + 7 db kulcsrakész Reelses promóvideó' },
      { label: 'Finomhangolás', value: '4 módosítási kör VIP prioritású utómunkával' },
    ],
  },
];

interface ComparisonRow {
  feature: string;
  tier1: string;
  tier2: string;
  tier3: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Összefoglalás',
    tier1: 'Megírjuk a szöveget, elkészítjük a zenét, és felvesszük a dalodat – akár otthonról is, utazás nélkül. Kapsz hozzá egy profi dalszöveges videót és borítóképet, hogy rögtön felrakhasd a YouTube-ra. Minden 7 munkanap alatt elkészül, és a dal 100%-ban a tiéd marad.',
    tier2: 'Megkapod a teljes kész dalodat, és mellé forgatunk egy profi videóklipet a stúdióban. Készítünk veled egy podcast-beszélgetést is, és ebből a kettőből összevágunk neked 20 rövid videót TikTokra, Instagramra, Facebookra és YouTube-ra. Így 7 munkanap alatt nemcsak egy saját dalod lesz, hanem 20 kész videód is, amivel azonnal reklámozhatod a zenédet.',
    tier3: 'Ebben a csomagban benne van a kész dalod, a podcast-felvétel és a 20 rövid közösségi médiás videó is. A legnagyobb extra, hogy a videóklipet egy külső helyszínen forgatjuk le, amit mi szervezünk le helyetted. Neked csak el kell jönnöd a megadott címre, és 7 munkanap múlva a tiéd a kész klip és a 100%-ban saját jogú dalod.',
  },
  {
    feature: 'Tulajdonjog & Jogdíjak',
    tier1: '✅ **100% a tiéd** – A dal minden joga és minden bevétele (Spotify, YouTube, fellépések) nálad marad.',
    tier2: '✅ **100% a tiéd** – A dal minden joga és minden bevétele (Spotify, YouTube, fellépések) nálad marad.',
    tier3: '✅ **100% a tiéd** – A dal minden joga és minden bevétele (Spotify, YouTube, fellépések) nálad marad.',
  },
  {
    feature: 'Mennyi idő alatt készül el?',
    tier1: '**7 munkanap** alatt kész a teljes dalod és a dalszöveges videód.',
    tier2: '**7 munkanap** alatt kész a dalod, a klip, a podcast és a 20 rövid videó is.',
    tier3: '**7 munkanap** alatt kész a dalod, a külsős klip, a podcast és a 20 rövid videó is.',
  },
  {
    feature: 'Tiszta hangzás (Profi mix)',
    tier1: '✅',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: 'Top hangerő (Profi master)',
    tier1: '✅',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: 'Meglévő szöveg átnézése',
    tier1: '✅',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: 'Teljes dalszöveg megírása',
    tier1: '✅',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: 'Videó a dalodhoz (Klip)',
    tier1: '**Dalszöveges (lyrics) videó** – Mozgó szöveges videót készítünk a dalodhoz.',
    tier2: '**Profi stúdióklip** – Igazi videóklipet forgatunk rólad a stúdióban.',
    tier3: '**Profi klip külső helyszínen** – Különleges külső helyszínen forgatjuk le a klipedet.',
  },
  {
    feature: 'Ingyenes javítási körök',
    tier1: '**1 javítás** minden lépésnél (szöveg, alapzene, dalszöveges videó), ha változtatnál valamin.',
    tier2: '**2 javítás** minden lépésnél (szöveg, alapzene, stúdióklip), hogy pontosan olyan legyen, amilyet szeretnél.',
    tier3: '**3 javítás** minden lépésnél (szöveg, alapzene, külsős klip), hogy minden részlet tökéletes legyen.',
  },
  {
    feature: 'Felvétel otthonról, utazás nélkül',
    tier1: '✅',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: '3 millió Ft feletti stúdiófelszerelés',
    tier1: '✅',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: 'YouTube cím és leírás megírása',
    tier1: '✅',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: 'Felvétel csendes, profi stúdióban',
    tier1: '✅',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: 'Borítókép a videódhoz (Thumbnail)',
    tier1: '✅ **1 verzió** figyelemfelkeltő borítókép a YouTube-videódhoz.',
    tier2: '✅ **2 verzió** figyelemfelkeltő borítókép a YouTube-videódhoz.',
    tier3: '✅ **3 verzió** figyelemfelkeltő borítókép a YouTube-videódhoz.',
  },
  {
    feature: 'Podcast-beszélgetés és profi felvétel',
    tier1: '❌',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: '20 db rövid videó (Reels / TikTok)',
    tier1: '❌',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: 'Profi operatőr és utómunka',
    tier1: '❌',
    tier2: '✅',
    tier3: '✅',
  },
  {
    feature: 'Külsős helyszín leszervezése',
    tier1: '❌',
    tier2: '❌',
    tier3: '✅',
  },
];

function renderComparisonCell(value: string) {
  if (value === '✅') {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400">
        <Check size={14} strokeWidth={2.5} />
      </span>
    );
  }
  if (value === '❌') {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800/80 text-neutral-500">
        <X size={13} strokeWidth={2.5} />
      </span>
    );
  }

  const hasCheckPrefix = value.startsWith('✅ ');
  const cleanText = hasCheckPrefix ? value.slice(2).trim() : value;
  const parts = cleanText.split(/(\*\*.*?\*\*)/g);

  return (
    <div className={hasCheckPrefix ? 'flex items-start gap-2' : ''}>
      {hasCheckPrefix && (
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 shrink-0 mt-0.5">
          <Check size={11} strokeWidth={2.5} />
        </span>
      )}
      <span className="leading-relaxed">
        {parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={idx} className="font-semibold text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <React.Fragment key={idx}>{part}</React.Fragment>;
        })}
      </span>
    </div>
  );
}

const ADI_VIDEOS = [
  '1olG4omyNe8',
  'x0yGd5nryvE',
  'NdRslSu93mc',
  'iCoqoL8zgZQ',
  'zC2aK8cesy8'
];

interface BonusCard {
  id: string;
  number: string;
  title: string;
  description: string;
  price: string;
}

const BONUS_CARDS: BonusCard[] = [
  {
    id: 'bonus-1',
    number: '01',
    title: 'Profi énekhang akkor is, ha nem tudsz énekelni',
    description: 'Ha nem megy az éneklés, nem gond! Egy igazi profi énekes felénekli helyetted a dalt, mi pedig egy okos programmal pont olyanra alakítjuk, mintha te énekelnél tökéletesen és tisztán.',
    price: '120.000 Ft',
  },
  {
    id: 'bonus-2',
    number: '02',
    title: 'Milliós stúdiógépek használata ingyen',
    description: 'A felvételnél a legdrágább, profi stúdiós mikrofonokat és gépeket használhatod, és ezért egyetlen forintot sem kell pluszban fizetned vagy letétbe adnod.',
    price: '80.000 Ft',
  },
  {
    id: 'bonus-3',
    number: '03',
    title: 'A dalod 100%-ban a tiéd marad',
    description: 'Nem vesszük el a jogaidat. Bármennyi pénzt is keresel vele a YouTube-on, a Spotify-on vagy a fellépéseken, az mind a te zsebedben marad.',
    price: 'Felbecsülhetetlen',
  },
  {
    id: 'bonus-4',
    number: '04',
    title: 'YouTube kattintásmágnes csomag',
    description: 'Olyan címet, leírást és borítóképet (thumbnailt) készítünk a videódnak, amire az emberek sokkal szívesebben és többen rákattintanak majd a YouTube-on.',
    price: '45.000 Ft',
  },
  {
    id: 'bonus-5',
    number: '05',
    title: 'Felvétel a saját szobádból, utazás nélkül',
    description: 'Nem kell elutaznod hozzánk a stúdióba. Megmutatjuk és segítünk, hogyan vedd fel a hangodat kényelmesen, otthonról úgy, hogy az a végén mégis tökéletesen szóljon.',
    price: '40.000 Ft',
  },
];

interface GuaranteeCard {
  id: string;
  title: string;
  description: string;
  image: string;
  bgClass: string;
  accentGlow: string;
}

const GUARANTEE_CARDS: GuaranteeCard[] = [
  {
    id: 'guarantee-1',
    title: 'Akkor is profi dalod lesz, ha nem tudsz énekelni',
    description:
      'Ha nem megy az éneklés, egy igazi énekes felénekli helyetted a dalt, mi pedig a te hangodra alakítjuk át. Ha valami nem tetszik, a csomagodban lévő javítási körökben ingyen módosítjuk, utána pedig felárért bármennyi plusz javítást kérhetsz. Ha a végeredmény mégsem lesz profi minőségű, visszaadjuk a pénzed.',
    image: 'https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/garancia1.webp',
    bgClass: 'bg-[#DB2777]',
    accentGlow: 'rgba(219, 39, 119, 0.25)',
  },
  {
    id: 'guarantee-2',
    title: 'Stúdióidőpont 14 napon belül',
    description:
      'Több mint 10 éves tapasztalattal és milliós stúdiógépekkel várunk, így akkor is biztonságban érzed magad, ha még sosem álltál mikrofon előtt. Ha az indulástól számított 14 napon belül nem adunk neked stúdióidőpontot, levonunk 150.000 Ft-ot a következő stúdiómunkád árából.',
    image: 'https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/garancia2.webp',
    bgClass: 'bg-[#0F766E]',
    accentGlow: 'rgba(15, 118, 110, 0.25)',
  },
  {
    id: 'guarantee-3',
    title: 'Kész videóklip szervezés nélkül',
    description:
      'Neked semmit sem kell szervezned vagy telefonálnod: csak megkapod a címet és az időpontot, és eljössz a forgatásra. Ha a fizetés után 14 napon belül nem szervezzük le a helyszínt vagy a stúdiót, visszaadjuk a forgatás árát, és még 20.000 Ft kedvezményt is kapsz a következő forgatásodból.',
    image: 'https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/garancia3.webp',
    bgClass: 'bg-[#6D28D9]',
    accentGlow: 'rgba(109, 40, 217, 0.35)',
  },
  {
    id: 'guarantee-4',
    title: 'Soha nem nevetünk ki és nem nézünk le',
    description:
      'Tudjuk, hogy mindenki elkezdi valahol, és még a legnagyobb sztárok is hibáznak a stúdióban. Nálunk nincs cikizés vagy kioktatás, ha még kezdő vagy, vagy bizonytalan a hangod. Ha bármikor úgy érzed, hogy lenéztünk vagy megszégyenítettünk, kérdés nélkül visszaadjuk a teljes pénzed.',
    image: 'https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/garancia4.webp',
    bgClass: 'bg-[#1D4ED8]',
    accentGlow: 'rgba(29, 78, 216, 0.25)',
  },
  {
    id: 'guarantee-5',
    title: 'Segítünk, hogy minél többen lássák a dalodat',
    description:
      'Nem hagyunk magadra a kész zenével, hogy neked kelljen kitalálnod, hogyan reklámozd. Ha videóklipes csomagot választasz, 7 munkanapon belül átadunk neked 20 készre vágott rövid videót a klipedből és a podcastből. Ezeket rögtön kirakhatod TikTokra, Instagramra, Facebookra és YouTube-ra is, bármilyen korlátozás nélkül.',
    image: 'https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/garancia5.webp',
    bgClass: 'bg-[#C2410C]',
    accentGlow: 'rgba(194, 65, 12, 0.25)',
  },
];

function TransparentSticker({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [resolvedSrc, setResolvedSrc] = useState<string>(src);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      if (cancelled) return;
      try {
        const maxDim = 640;
        const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        // If the image already has genuine corner transparency, keep it as-is
        const corners = [
          3,
          ((w - 1) * 4) + 3,
          ((h - 1) * w * 4) + 3,
          (((h - 1) * w + (w - 1)) * 4) + 3,
        ];
        if (corners.some((idx) => data[idx] < 245)) {
          return;
        }

        const total = w * h;
        const visited = new Uint8Array(total);
        const cleared = new Uint8Array(total);
        const queue = new Int32Array(total);
        let head = 0;
        let tail = 0;

        const isExteriorBg = (pIdx: number) => {
          const i = pIdx * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const max = r > g ? (r > b ? r : b) : g > b ? g : b;
          const min = r < g ? (r < b ? r : b) : g < b ? g : b;
          const sat = max - min;
          const lum = (r + g + b) / 3;
          return sat <= 24 && lum >= 168;
        };

        const pushIfBg = (pIdx: number) => {
          if (visited[pIdx]) return;
          if (isExteriorBg(pIdx)) {
            visited[pIdx] = 1;
            queue[tail++] = pIdx;
          }
        };

        for (let x = 0; x < w; x++) {
          pushIfBg(x);
          pushIfBg((h - 1) * w + x);
        }
        for (let y = 1; y < h - 1; y++) {
          pushIfBg(y * w);
          pushIfBg(y * w + (w - 1));
        }

        while (head < tail) {
          const pIdx = queue[head++];
          cleared[pIdx] = 1;
          data[pIdx * 4 + 3] = 0;

          const x = pIdx % w;
          const y = (pIdx - x) / w;
          if (x > 0) pushIfBg(pIdx - 1);
          if (x < w - 1) pushIfBg(pIdx + 1);
          if (y > 0) pushIfBg(pIdx - w);
          if (y < h - 1) pushIfBg(pIdx + w);
        }

        // Feather 1px neutral anti-aliased fringe outside the dark sticker border
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const pIdx = y * w + x;
            if (cleared[pIdx]) continue;
            if (
              cleared[pIdx - 1] ||
              cleared[pIdx + 1] ||
              cleared[pIdx - w] ||
              cleared[pIdx + w]
            ) {
              const i = pIdx * 4;
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const max = Math.max(r, g, b);
              const min = Math.min(r, g, b);
              const lum = (r + g + b) / 3;
              if (max - min <= 26 && lum >= 120) {
                data[i + 3] = Math.round(data[i + 3] * Math.max(0, (168 - lum) / 48));
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const resultUrl = canvas.toDataURL('image/png');
        if (!cancelled) {
          setResolvedSrc(resultUrl);
        }
      } catch {
        // Keep original src on error
      }
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <img loading="lazy" decoding="async"
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
    />
  );
}

export default function App() {
  // Image upload state - defaults to provided image
  const [uploadedImage, setUploadedImage] = useState<string | null>('https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/hero.webp');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editable artist details - defaults to EGRI TIBOR
  const [artistName, setArtistName] = useState('EGRI TIBOR');
  const [roleLine1, setRoleLine1] = useState('MUSIC PRODUCER');
  const [roleLine2, setRoleLine2] = useState('DJ / SONGWRITER');
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  // Carousel & Video modal state
  const [activePhoneIndex, setActivePhoneIndex] = useState<number>(2); // Center phone active by default
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [activeAdiVideoId, setActiveAdiVideoId] = useState('1olG4omyNe8');
  const [activeGuaranteeIndex, setActiveGuaranteeIndex] = useState<number>(2); // Center card active by default

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const bonusRowRef = useRef<HTMLDivElement>(null);
  const [isDraggingBonuses, setIsDraggingBonuses] = useState(false);
  const bonusDragStartX = useRef(0);
  const bonusScrollStartLeft = useRef(0);

  const handleBonusMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bonusRowRef.current) return;
    setIsDraggingBonuses(true);
    bonusDragStartX.current = e.pageX - bonusRowRef.current.offsetLeft;
    bonusScrollStartLeft.current = bonusRowRef.current.scrollLeft;
  };

  const handleBonusMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingBonuses || !bonusRowRef.current) return;
    e.preventDefault();
    const x = e.pageX - bonusRowRef.current.offsetLeft;
    const walk = (x - bonusDragStartX.current) * 1.4;
    bonusRowRef.current.scrollLeft = bonusScrollStartLeft.current - walk;
  };

  const stopBonusDrag = () => {
    setIsDraggingBonuses(false);
  };

  const scrollBonuses = (direction: 'left' | 'right') => {
    if (!bonusRowRef.current) return;
    const offset = direction === 'left' ? -380 : 380;
    bonusRowRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const prevPhone = () => {
    setActivePhoneIndex((prev) => (prev > 0 ? prev - 1 : TIKTOK_TESTIMONIALS.length - 1));
  };

  const nextPhone = () => {
    setActivePhoneIndex((prev) => (prev < TIKTOK_TESTIMONIALS.length - 1 ? prev + 1 : 0));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setUploadedImage(event.target.result);
        showToast('Photo uploaded successfully');
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Sample photo loader
  const loadReferenceSample = () => {
    setUploadedImage('https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/hero.webp');
    showToast('Default image loaded');
  };

  return (
    <main className="min-h-screen w-full bg-[#F4EFE6] font-sans-clean select-none">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#161616] text-[#F4EFE6] px-4 py-2 rounded-full text-xs font-medium shadow-xl border border-neutral-700 animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* Full-Width Hero Container */}
      <div className="w-full min-h-screen flex flex-col lg:flex-row relative">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: Artist Spotlight & Custom Image Upload Area   */}
        {/* ============================================================ */}
        <section 
          className="relative lg:w-[45%] xl:w-[42%] w-full min-h-[520px] lg:min-h-screen bg-[#121214] flex flex-col justify-between overflow-hidden"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Uploaded Image or Empty Dropzone */}
          {uploadedImage ? (
            <div className="absolute inset-0 w-full h-full">
              {/* Preserves 100% of user's original image colors, editing, and tones */}
              <img fetchpriority="high" decoding="async"
                src={uploadedImage}
                alt="Featured Artist"
                className="w-full h-full object-cover"
              />
              {/* Subtle localized scrims only at edges for text legibility, keeping photo colors untouched */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

              {/* Image Controls Floating Toolbar */}
              <div className="absolute top-16 left-6 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 opacity-0 hover:opacity-100 transition-opacity shadow-lg">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] text-white hover:text-[#EAA824] px-1.5 py-0.5 rounded transition-colors font-medium"
                  title="Change image"
                >
                  Change Photo
                </button>
                <span className="text-white/30 text-xs">|</span>
                <button
                  onClick={() => {
                    setUploadedImage(null);
                    showToast('Photo removed');
                  }}
                  className="text-[11px] text-red-300 hover:text-red-200 px-1 py-0.5 rounded transition-colors flex items-center gap-1"
                  title="Remove image"
                >
                  <X size={12} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ) : (
            /* Empty State Container for User Upload */
            <div className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 text-center transition-colors ${
              isDragging ? 'bg-[#1a1a20] border-2 border-dashed border-[#EAA824]' : 'bg-[#151517]'
            }`}>
              {/* Subtle ambient lighting */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(234,168,36,0.08),transparent_60%)]" />

              <div className="relative z-10 max-w-[280px] flex flex-col items-center">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[#EAA824] cursor-pointer hover:border-[#EAA824] hover:scale-105 transition-all shadow-xl group mb-4"
                >
                  <Upload size={24} className="group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <h3 className="text-white text-base font-semibold tracking-tight mb-1">
                  Upload Artist Photo
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                  Drag and drop your image here, or browse files from your computer.
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-1.5 bg-[#EAA824] text-black font-semibold text-xs rounded-full hover:bg-[#ffba2e] transition-colors shadow"
                  >
                    Select Image
                  </button>
                  <button
                    onClick={loadReferenceSample}
                    className="px-3 py-1.5 bg-neutral-800 text-neutral-300 font-medium text-xs rounded-full hover:bg-neutral-700 hover:text-white transition-colors border border-neutral-700"
                    title="Load sample reference photo"
                  >
                    Load Sample
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* ============================================================ */}
          {/* Top Header Layer: Logo                                        */}
          {/* ============================================================ */}
          <div className="relative z-10 p-6 sm:p-8 flex items-start">
            {/* Brand Logo: EGRI PROD */}
            <div className="cursor-pointer group">
              <span className="block text-[#EAA824] font-black text-2xl tracking-[-0.04em] leading-[0.85] font-sans">
                EGRI<br />PROD
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* Bottom Layer: Rotated Yellow Badge & Role Subtitle            */}
          {/* ============================================================ */}
          <div className="relative z-10 p-7 sm:p-9 mt-auto">
            {/* Rotated Yellow Badge */}
            <div className="relative inline-block mb-3.5 group">
              <div className="transform -rotate-[3.2deg] origin-bottom-left transition-transform duration-200 group-hover:-rotate-[1.5deg]">
                <div className="bg-[#EAA824] text-[#121212] px-4 sm:px-5 py-1.5 sm:py-2 shadow-[0_8px_20px_rgba(0,0,0,0.4)] flex items-center gap-2">
                  {isEditingInfo ? (
                    <input
                      type="text"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                      className="bg-transparent text-[#121212] font-editorial font-bold text-2xl sm:text-[32px] tracking-tight focus:outline-none border-b border-black/40 min-w-[140px]"
                      autoFocus
                    />
                  ) : (
                    <span className="font-editorial font-bold text-2xl sm:text-[32px] tracking-tight text-[#121212] whitespace-nowrap">
                      {artistName}
                    </span>
                  )}

                  <button
                    onClick={() => setIsEditingInfo(!isEditingInfo)}
                    className="opacity-0 group-hover:opacity-80 hover:!opacity-100 transition-opacity text-black ml-1"
                    title={isEditingInfo ? "Save name" : "Edit name"}
                  >
                    {isEditingInfo ? <Check size={16} /> : <Edit2 size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Uppercase Letterspaced Role Metadata */}
            <div className="space-y-0.5 text-neutral-300 drop-shadow-md">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-200">
                {roleLine1}
              </p>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-300/90">
                {roleLine2}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Editorial Content & Typography                 */}
        {/* ============================================================ */}
        <section className="lg:w-[55%] xl:w-[58%] w-full bg-[#F4EFE6] px-6 py-8 sm:px-10 lg:px-12 xl:px-16 flex flex-col justify-center items-center text-[#161616] min-h-[580px] lg:min-h-screen">
          
          <div className="w-full max-w-[620px] flex flex-col justify-center my-auto py-4 sm:py-6">
            {/* Main Editorial Headline */}
            <h1 className="font-editorial font-bold text-[30px] leading-[1.22] text-[#141414] tracking-[-0.02em] mb-3">
              Robbantsd fel a Tiktokot saját slágereddel és nézd végig, ahogy a riválisaidat megeszi a sárga irigység<span className="inline-block w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#EAA824] ml-2 align-baseline translate-y-[-2px]" />
            </h1>

            {/* Subtitle / Collective Description */}
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#3e3b36] font-normal mb-6">
              Az EgriProd all-in-one csapata egy hét alatt profi előadót farag belőled, miközben egyetlen forint jogdíjat sem nyúlunk le tőled. Megírjuk a szöveged, alárakjuk a legdurvább beatet, és úgy kivasaljuk a hangod, hogy leolvad a Spotify.
            </p>

            {/* Social Proof: Ők nem 💩oztak */}
            <div className="border-t border-[#DFD8CC] pt-4 mb-6">
              <p className="text-[12px] sm:text-[13px] font-bold tracking-[0.06em] text-[#8C8578] uppercase mb-3 flex items-center gap-1.5">
                <span>Ők nem 💩oztak: velünk dolgoztak és ajánlanak minket</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-10">
                <div className="divide-y divide-[#E6E0D4]">
                  {SOCIAL_CLIENTS.slice(0, 3).map((client, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full border border-[#D5CFC3] overflow-hidden shadow-xs shrink-0 flex items-center justify-center">
                          {client.avatar}
                        </div>
                        <span className="font-bold text-[#1A1A1A] text-[13px] tracking-tight truncate">
                          {client.name}
                        </span>
                      </div>

                      {/* 5 Stars */}
                      <div className="flex items-center gap-0.5 text-[#EAA824] shrink-0 ml-2" title="5 csillag">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="#EAA824" stroke="#EAA824" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="divide-y divide-[#E6E0D4]">
                  {SOCIAL_CLIENTS.slice(3, 6).map((client, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full border border-[#D5CFC3] overflow-hidden shadow-xs shrink-0 flex items-center justify-center">
                          {client.avatar}
                        </div>
                        <span className="font-bold text-[#1A1A1A] text-[13px] tracking-tight truncate">
                          {client.name}
                        </span>
                      </div>

                      {/* 5 Stars */}
                      <div className="flex items-center gap-0.5 text-[#EAA824] shrink-0 ml-2" title="5 csillag">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="#EAA824" stroke="#EAA824" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Row: CTA button */}
            <div className="pt-1">
              <button
                onClick={() => showToast('Induljon a slágerkészítés!')}
                className="group px-7 py-3.5 rounded-full bg-[#181818] text-[#F4EFE6] text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2.5 hover:bg-black transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Csinálj nekem is Tiktok slágert!</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* ============================================================ */}
      {/* VIDEO TESTIMONIALS SECTION: TIKTOK 3D PHONE MOCKUP CAROUSEL   */}
      {/* ============================================================ */}
      <section className="relative w-full bg-[#0D0F14] pt-16 sm:pt-24 pb-24 overflow-hidden border-t border-[#232630]">
        
        {/* Subtle ambient gradient backdrops matching reference */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Bottom floor band matching the reference image layout */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 bg-[#F4EFE6] border-t border-[#E5DEC9] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#EAA824] block mb-2.5">
              Valódi TikTok Sikersztorik
            </span>
            <h2 className="font-editorial font-bold text-2xl sm:text-3xl lg:text-[36px] leading-snug text-white tracking-[-0.02em] mb-3">
              Nekik megcsináltuk, neked is sikerülni fog:
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Kattints a telefonokra és nézd meg, hogyan robbantották fel a For You Page-et az EgriProd stúdióban készült slágerek.
            </p>
          </div>

          {/* 3D Phone Mockup Carousel Stage */}
          <div className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] flex items-center justify-center select-none overflow-visible">
            
            {/* Left Chevron Navigation Button */}
            <button
              onClick={prevPhone}
              aria-label="Előző videó"
              className="absolute left-2 sm:left-4 lg:left-6 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-[0_8px_25px_rgba(0,0,0,0.6)] cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Chevron Navigation Button */}
            <button
              onClick={nextPhone}
              aria-label="Következő videó"
              className="absolute right-2 sm:right-4 lg:right-6 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-[0_8px_25px_rgba(0,0,0,0.6)] cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>

            {/* Phone Mockups Track (NO preserve-3d to eliminate polygon intersection/melting) */}
            <div className="relative w-full h-full flex items-center justify-center">
              {TIKTOK_TESTIMONIALS.map((item, idx) => {
                const total = TIKTOK_TESTIMONIALS.length;
                let offset = ((idx - activePhoneIndex) % total + total) % total;
                if (offset > total / 2) offset -= total;

                // Spaced 3D positioning parameters matching the reference image layout
                let xPercent = 0;
                let scale = 1;
                let rotateY = 0;
                let zIndex = 20;
                let opacity = 1;

                if (offset === 0) {
                  // Center Phone: Front-facing, elevated, highest z-index
                  xPercent = 0;
                  scale = 1.05;
                  rotateY = 0;
                  zIndex = 40;
                  opacity = 1;
                } else if (offset === -1) {
                  // Immediate Left: Clean separation, only ~10% edge tucked behind center
                  xPercent = -90;
                  scale = 0.88;
                  rotateY = 16;
                  zIndex = 30;
                  opacity = 0.95;
                } else if (offset === 1) {
                  // Immediate Right: Clean separation, only ~10% edge tucked behind center
                  xPercent = 90;
                  scale = 0.88;
                  rotateY = -16;
                  zIndex = 30;
                  opacity = 0.95;
                } else if (offset === -2) {
                  // Far Left: Widely spaced so all icons and info remain visible
                  xPercent = -178;
                  scale = 0.74;
                  rotateY = 26;
                  zIndex = 20;
                  opacity = 0.85;
                } else if (offset === 2) {
                  // Far Right: Widely spaced so all icons and info remain visible
                  xPercent = 178;
                  scale = 0.74;
                  rotateY = -26;
                  zIndex = 20;
                  opacity = 0.85;
                }

                const isCenter = offset === 0;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!isCenter) {
                        setActivePhoneIndex(idx);
                      } else {
                        setActiveVideo(item.id);
                      }
                    }}
                    style={{
                      transform: `perspective(1200px) translateX(${xPercent}%) scale(${scale}) rotateY(${rotateY}deg)`,
                      zIndex,
                      opacity,
                    }}
                    className={`absolute top-1/2 -translate-y-1/2 w-[230px] sm:w-[255px] md:w-[275px] h-[460px] sm:h-[510px] md:h-[550px] transition-all duration-500 ease-out cursor-pointer ${
                      isCenter ? 'cursor-pointer' : 'hover:brightness-110'
                    }`}
                  >
                    {/* The Phone Hardware Mockup (White Outer Bezel & Curved Corners) */}
                    <div className="relative w-full h-full bg-black rounded-[38px] sm:rounded-[44px] border-[3.5px] sm:border-[4.5px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col p-1 sm:p-1.5">
                      
                      {/* Top Speaker / Camera Slit */}
                      <div className="w-14 sm:w-16 h-1 bg-white/70 rounded-full mx-auto mt-1 mb-1 shrink-0" />

                      {/* Screen Glass Area */}
                      <div className="relative w-full flex-1 rounded-[30px] sm:rounded-[36px] overflow-hidden bg-neutral-950 flex flex-col justify-between">
                        
                        {isCenter && activeVideo === item.id && (
                          <video
                            src={SOCIAL_VIDEO}
                            poster={SOCIAL_POSTER}
                            controls
                            autoPlay
                            playsInline
                            className="absolute inset-0 z-30 w-full h-full object-cover bg-black"
                          />
                        )}

                        {/* Background Video Portrait Image */}
                        <img loading="lazy" decoding="async"
                          src={item.thumbnail}
                          {...responsive(item.thumbnail, [384, 640, 828], '430px')}
                          alt={item.name}
                          className={`absolute inset-0 w-full h-full object-cover ${item.thumbnailClass || ''}`}
                        />

                        {/* Domain-specific creator lighting mood */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${item.accentGradient} pointer-events-none opacity-60`} />

                        {/* Top Gradient Scrim for speaker clarity */}
                        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none" />
                        
                        {/* Bottom Gradient Scrim for text & overlay clarity */}
                        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                        {/* Centered Play Button on Active or Hover */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                          isCenter ? 'opacity-90 hover:opacity-100' : 'opacity-0'
                        }`}>
                          <div className="w-13 h-13 rounded-full bg-black/60 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:bg-[#EAA824] hover:text-black hover:border-transparent transition-all">
                            <Play size={22} fill="currentColor" className="ml-0.5" />
                          </div>
                        </div>

                        {/* Top Status Indicators */}
                        <div className="relative z-10 p-3 flex items-center justify-between text-[11px] text-white/70">
                          <span className="font-mono text-[10px] tracking-wider text-red-400 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            LIVE
                          </span>
                          <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] text-white/90 font-medium border border-white/10">
                            {item.views}
                          </span>
                        </div>

                        {/* Bottom Layer: Right Rail Actions & Left Content Overlay */}
                        <div className="relative z-10 p-3 pt-0 flex items-end justify-between">
                          
                          {/* Bottom Left Info: Username, Subtitle, Bold Caption & Sound */}
                          <div className="flex-1 pr-2 text-white">
                            {/* Handle & Timestamp */}
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="font-bold text-[12px] sm:text-[13px] tracking-tight drop-shadow-md text-white">
                                {item.username}
                              </span>
                              <span className="text-[10px] sm:text-[11px] text-white/70 font-mono">
                                1:28
                              </span>
                            </div>

                            {/* Hashtags Subtitle */}
                            <p className="text-[10px] sm:text-[11px] text-white/80 font-normal line-clamp-1 mb-1.5">
                              lorem ipsum #tiktok #reel
                            </p>

                            {/* Main Caption Quote */}
                            <p className="text-[12px] sm:text-[13px] font-bold leading-[1.3] text-white drop-shadow-md line-clamp-2 mb-2">
                              {item.quote}
                            </p>

                            {/* Audio Track Marquee */}
                            <div className="flex items-center gap-1.5 text-[10px] text-white/90 drop-shadow-sm font-medium">
                              <Music size={11} className="shrink-0 text-[#EAA824] animate-pulse" />
                              <span className="truncate">{item.audioTrack}</span>
                            </div>
                          </div>

                          {/* Right Action Rail (Avatar, Like, Comment, Share, Vinyl) */}
                          <div className="flex flex-col items-center gap-2.5 shrink-0 ml-1">
                            
                            {/* Avatar with red plus follow badge */}
                            <div className="relative flex flex-col items-center">
                              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white overflow-hidden bg-neutral-800 shadow-md">
                                <img loading="lazy" decoding="async"
                                  src={item.thumbnail}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="absolute -bottom-1.5 w-4 h-4 rounded-full bg-[#FE2C55] text-white flex items-center justify-center shadow-xs">
                                <Plus size={11} strokeWidth={3} />
                              </div>
                            </div>

                            {/* Heart Icon & Like Count */}
                            <div className="flex flex-col items-center gap-0.5">
                              <Heart size={20} fill="white" className="text-white drop-shadow-md" />
                              <span className="text-white text-[10px] font-bold tracking-tight drop-shadow-md">
                                {item.likes}
                              </span>
                            </div>

                            {/* Message Icon & Comment Count */}
                            <div className="flex flex-col items-center gap-0.5">
                              <MessageCircle size={20} fill="white" className="text-white drop-shadow-md" />
                              <span className="text-white text-[10px] font-bold tracking-tight drop-shadow-md">
                                {item.comments}
                              </span>
                            </div>

                            {/* Share Icon & Label */}
                            <div className="flex flex-col items-center gap-0.5">
                              <Share2 size={20} fill="white" className="text-white drop-shadow-md" />
                              <span className="text-white text-[10px] font-bold tracking-tight drop-shadow-md">
                                {item.shares}
                              </span>
                            </div>

                            {/* Spinning Vinyl Record */}
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#111] border-[2px] border-neutral-700 p-0.5 flex items-center justify-center shadow-lg animate-[spin_4s_linear_infinite]">
                              <div className="w-3.5 h-3.5 rounded-full bg-[#EAA824] flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Carousel dots / selector indicators */}
          <div className="flex items-center justify-center gap-2 mt-4 relative z-20">
            {TIKTOK_TESTIMONIALS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActivePhoneIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activePhoneIndex === idx ? 'w-8 bg-[#EAA824]' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                }`}
                aria-label={`Ugrás ide: ${item.name}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* THE BRUTAL REALITY / PAIN POINTS SECTION                     */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* THE BRUTAL REALITY / PAIN POINTS SECTION                     */}
      {/* ============================================================ */}
      <section className="w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[#F4EFE6] border-t border-[#DFD8CC] text-[#161616]">
        <div className="max-w-3xl mx-auto">
          
          {/* Section Header */}
          <div className="mb-10 sm:mb-14">
            <h2 className="font-editorial font-bold text-2xl sm:text-3xl lg:text-[36px] leading-[1.25] text-[#141414] tracking-[-0.02em] text-balance">
              Ja, mehetsz más stúdiókba meg csinálhatsz AI zenét, de..
            </h2>
          </div>

          {/* Vertical Stack: Texts below each other without boxes with funny hero-style SVG avatars */}
          <div className="divide-y divide-[#DFD8CC] mb-12 sm:mb-16">
            
            {/* Item 1: Greedy Manager Shark */}
            <div className="flex items-start gap-4 sm:gap-5 py-6 sm:py-7 first:pt-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#D5CFC3] overflow-hidden shadow-xs shrink-0 flex items-center justify-center mt-1">
                <svg viewBox="0 0 40 40" className="w-full h-full bg-[#18261F]">
                  {/* Slicked dark hair */}
                  <path d="M12 14 C12 8 28 8 28 14 Z" fill="#141414" />
                  {/* Face */}
                  <circle cx="20" cy="19" r="9" fill="#E8BE9B" />
                  {/* Smug eyebrows */}
                  <path d="M14.5 15 L18.5 16.5" stroke="#141414" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M21.5 16.5 L25.5 14.5" stroke="#141414" strokeWidth="1.2" strokeLinecap="round" />
                  {/* Dollar sign eyes */}
                  <circle cx="17" cy="18.5" r="2.8" fill="#141414" />
                  <text x="17" y="20.5" fill="#EAA824" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">$</text>
                  <circle cx="23" cy="18.5" r="2.8" fill="#141414" />
                  <text x="23" y="20.5" fill="#EAA824" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">$</text>
                  {/* Smirking mouth with gold tooth */}
                  <path d="M16 23 Q20 26 24 22" stroke="#682D2D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <rect x="20.5" y="22.5" width="2" height="1.6" fill="#EAA824" rx="0.3" />
                  {/* Suit and red tie with gold tie clip */}
                  <path d="M11 36 C13 27 27 27 29 36 Z" fill="#1C2833" />
                  <polygon points="20,28 22,36 18,36" fill="#C0392B" />
                  <line x1="18.5" y1="31" x2="21.5" y2="31" stroke="#EAA824" strokeWidth="1" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] sm:text-[16px] leading-[1.65] text-[#22201D] font-normal">
                  A menedzsmentek beígérik a csillagokat, aztán aláíratnak veled egy szerződést, amivel lenyúlják a dalaid jogait, a fellépési pénzeidet, meg a streaming-bevételeid felét. Rabszolga leszel a saját neved alatt.
                </p>
              </div>
            </div>

            {/* Item 2: Annoyed / Eye-Rolling Studio Beatmaker */}
            <div className="flex items-start gap-4 sm:gap-5 py-6 sm:py-7">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#D5CFC3] overflow-hidden shadow-xs shrink-0 flex items-center justify-center mt-1">
                <svg viewBox="0 0 40 40" className="w-full h-full bg-[#201A28]">
                  {/* Studio headphones headband */}
                  <path d="M10 18 C10 8 30 8 30 18" stroke="#EAA824" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <rect x="8" y="15" width="3.5" height="7" rx="1.5" fill="#111" />
                  <rect x="28.5" y="15" width="3.5" height="7" rx="1.5" fill="#111" />
                  {/* Face */}
                  <circle cx="20" cy="19" r="9" fill="#E0B18B" />
                  {/* Messy unkempt hair */}
                  <path d="M13 14 C15 11 25 11 27 14 Z" fill="#2D1B1B" />
                  {/* Annoyed arched eyebrows */}
                  <path d="M15 15.5 L19 14" stroke="#222" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M21 14 L25 15.5" stroke="#222" strokeWidth="1.2" strokeLinecap="round" />
                  {/* Rolling eyes looking straight up */}
                  <circle cx="16.5" cy="18" r="2.2" fill="#FFF" />
                  <circle cx="16.5" cy="16.8" r="1.1" fill="#111" />
                  <circle cx="23.5" cy="18" r="2.2" fill="#FFF" />
                  <circle cx="23.5" cy="16.8" r="1.1" fill="#111" />
                  {/* Unimpressed mouth */}
                  <line x1="17" y1="23" x2="23" y2="23" stroke="#552222" strokeWidth="1.3" strokeLinecap="round" />
                  {/* Hoodie with drawstrings */}
                  <path d="M11 36 C13 28 27 28 29 36 Z" fill="#4B4B5E" />
                  <line x1="18.5" y1="28" x2="18.5" y2="33" stroke="#FFF" strokeWidth="0.8" />
                  <line x1="21.5" y1="28" x2="21.5" y2="33" stroke="#FFF" strokeWidth="0.8" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] sm:text-[16px] leading-[1.65] text-[#22201D] font-normal">
                  A sufnituningos házi beatmakereknek hetekig könyörögsz egy beatért, a szöveg össze-vissza rímel, a stúdióban meg feszengsz, mert a hangmérnök lenézően forgatja a szemét, ha nem találsz el egy hangot.
                </p>
              </div>
            </div>

            {/* Item 3: Sweating Panicked Creator with Rotten Tomato / Comment Humiliation */}
            <div className="flex items-start gap-4 sm:gap-5 py-6 sm:py-7 last:pb-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#D5CFC3] overflow-hidden shadow-xs shrink-0 flex items-center justify-center mt-1">
                <svg viewBox="0 0 40 40" className="w-full h-full bg-[#2B1B1E]">
                  {/* Panicked face */}
                  <circle cx="20" cy="19" r="9.5" fill="#F4BA94" />
                  {/* Shocked upright spiky hair */}
                  <path d="M12 15 L14 10 L17 13 L20 9 L23 13 L26 10 L28 15 Z" fill="#181414" />
                  {/* Distressed high eyebrows */}
                  <path d="M14 14.5 Q17 12 19 14" stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M21 14 Q23 12 26 14.5" stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  {/* Wide panicked staring eyes */}
                  <circle cx="16" cy="17.5" r="2.6" fill="#FFF" />
                  <circle cx="16" cy="17.5" r="1.1" fill="#111" />
                  <circle cx="24" cy="17.5" r="2.6" fill="#FFF" />
                  <circle cx="24" cy="17.5" r="1.1" fill="#111" />
                  {/* Agonized open mouth */}
                  <path d="M17 22 Q20 27 23 22 Z" fill="#4A1515" />
                  {/* Blue cold sweat drop dripping from temple */}
                  <path d="M27.5 13 C26.5 14.5 26.5 16.5 27.5 17.5 C28.5 16.5 28.5 14.5 27.5 13 Z" fill="#3498DB" />
                  {/* Collar */}
                  <path d="M11 36 C13 27 27 27 29 36 Z" fill="#D63031" />
                  <path d="M15 36 L17 28 M20 36 L20 28 M25 36 L23 28" stroke="#FFF" strokeWidth="1.2" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] sm:text-[16px] leading-[1.65] text-[#22201D] font-normal">
                  Aztán jön a nyilvános leégés: kijön a dal, és ahelyett, hogy felrobbanná anetet, 2000 gúnyos komment születik alatta, mert a túltolt effekttől még a saját anyád sem érti a szöveged.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TEAM SECTION: Kik vagytok amúgy?                             */}
      {/* ============================================================ */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#F4EFE6] border-t border-[#DFD8CC] text-[#161616]">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <h2 className="font-editorial font-bold text-2xl sm:text-3xl lg:text-[36px] leading-[1.25] text-[#141414] tracking-[-0.02em] text-balance">
              Kik vagytok amúgy és miben vagytok mások?
            </h2>
          </div>

          {/* Team List (Vertical Stack with Image-Text side-by-side) */}
          <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32">
            
            {/* Tibi */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 group">
              <div className="w-full md:w-1/3 lg:w-[300px] shrink-0">
                <div className="w-full transition-all duration-500">
                  <img loading="lazy" decoding="async" 
                    src="https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/producer.webp"
                    {...responsive("https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/producer.webp", [384, 640, 1080], "(min-width: 768px) 640px, 100vw")} 
                    alt="Tibi" 
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-editorial font-bold text-2xl sm:text-3xl text-[#141414] mb-4 flex items-center gap-2.5">
                  <span>Tibi: Most mi van akkor?</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAA824]" />
                </h3>
                <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] text-[#3e3b36] font-normal mb-6">
                  A csávó konkrétan hamarabb baszkurálta az FL Studiót and ugatott a mikrofonba, mint hogy megtanult volna rendesen járni. Amióta az eszét tudja, alapokat veret, énekel, meg járja a színpadokat. Betegesen imádja ezt a szart. Az első ótvar hangfájlodtól a kész maszterig fogni fogja a kezedet, nem engedi el, amíg a legbénább gányolásodból is olyan pusztító banger nem lesz, amitől a TikTokon összefossák magukat az emberek. Ha vele dolgozol, nem kérdés, hogy sikeres lesz a cuccod.
                </p>

                {/* Tibi's Punchy Labels */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { text: 'LAZA SESSION', bg: 'bg-emerald-100', textCol: 'text-emerald-700' },
                    { text: 'ZÉRÓ STÚDIÓS CSICSKÍTÁS', bg: 'bg-red-100', textCol: 'text-red-700' },
                    { text: 'NINCS SZEMFORGATÁS', bg: 'bg-amber-100', textCol: 'text-amber-700' },
                    { text: 'NULLA KÖNYÖRGÉS', bg: 'bg-blue-100', textCol: 'text-blue-700' },
                    { text: 'FIX IDŐPONTOK ÉS HATÁRIDŐK', bg: 'bg-purple-100', textCol: 'text-purple-700' },
                    { text: 'VILÁGBAJNOK SZÖVEGEK', bg: 'bg-pink-100', textCol: 'text-pink-700' }
                  ].map((label, lIdx) => (
                    <span 
                      key={lIdx} 
                      className={`${label.bg} ${label.textCol} text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}
                    >
                      {label.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Norbi */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 lg:gap-16 group">
              <div className="w-full md:w-1/3 lg:w-[300px] shrink-0">
                <div className="w-full transition-all duration-500">
                  <img loading="lazy" decoding="async" 
                    src="https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/entrepeneur.webp"
                    {...responsive("https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/entrepeneur.webp", [384, 640, 1080], "(min-width: 768px) 640px, 100vw")} 
                    alt="Norbi" 
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-editorial font-bold text-2xl sm:text-3xl text-[#141414] mb-4 flex items-center gap-2.5">
                  <span>Norbi: Haggyad már magad..</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAA824]" />
                </h3>
                <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] text-[#3e3b36] font-normal mb-6">
                  Amíg te 18 évesen azon vergődtél, hogy kitől tarhálj cigit a suli mögött, ez a csávó már céget épített. Konkrétan egy két lábon járó terminátor: a semmiből basz össze neked weboldalt, szoftvert, webappot vagy akármilyen AI toolt, miközben olyan marketingérzéke van, hogy beszarsz. Pontosan tudja, a videó melyik másodpercében melyik agysejted adja meg magát, hogy népszerű legyen a szarod. Nem százas a gyerek, de pont az ilyen elmebetegek fogják felrakni a zenédet a térképre.
                </p>

                {/* Norbi's Punchy Labels */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { text: 'NEM SZERZŐDTETÜNK LE MAGUNKHOZ', bg: 'bg-emerald-100', textCol: 'text-emerald-700' },
                    { text: '100% TIED A JOG', bg: 'bg-red-100', textCol: 'text-red-700' },
                    { text: '0% KIADÓI LEHÚZÁS', bg: 'bg-amber-100', textCol: 'text-amber-700' },
                    { text: 'A STREAMING ÉS FELLÉPÉSI PÉNZ A TIÉD MARAD', bg: 'bg-blue-100', textCol: 'text-blue-700' },
                    { text: 'TELJES ANYAGI FÜGGETLENSÉG TŐLÜNK', bg: 'bg-purple-100', textCol: 'text-purple-700' },
                    { text: 'NINCS RABSZOLGASZERZŐDÉS', bg: 'bg-pink-100', textCol: 'text-pink-700' }
                  ].map((label, lIdx) => (
                    <span 
                      key={lIdx} 
                      className={`${label.bg} ${label.textCol} text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}
                    >
                      {label.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ádi */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 group">
              <div className="w-full md:w-1/3 lg:w-[300px] shrink-0">
                <div className="w-full transition-all duration-500">
                  <img loading="lazy" decoding="async" 
                    src="https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/cameraman.webp"
                    {...responsive("https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/cameraman.webp", [384, 640, 1080], "(min-width: 768px) 640px, 100vw")} 
                    alt="Ádi" 
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-editorial font-bold text-2xl sm:text-3xl text-[#141414] mb-4 flex items-center gap-2.5">
                  <span>Ádi: Már megint ez a sz@arakodás megy..</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAA824]" />
                </h3>
                <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] text-[#3e3b36] font-normal mb-6">
                  Ez a csávó konkrétan fekete mágiát űz a kamerával. Vágod, kibérlünk egy olyan leprás, foszladozó, elhagyatott raktárt, amitől még a Démonok között stábja is sikítva fosná össze magát. Berángatunk a sarokból egy bányarém tramplit, akitől a vakolat is leolvad a falról, rázárjuk az ajtót Ádira, és a csávó másnap reggel átad egy olyan kész videóklipet, amiben konkrétan Palvin Barbi twerkel a Hilton hotel aulájában. A legolcsóbb nyomorból is olyan luxus képi világot basz össze, hogy az algoritmus maga fog térden állva könyörögni a megtekintésekért. Nagyon beteg a faszi, ha a klippedért ő felel, a látvány miatt tuti nem fogsz égni.
                </p>

                {/* Ádi's Punchy Labels */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { text: 'A LÁTVÁNY MIATT TUTI NEM ÉGSZ LE', bg: 'bg-emerald-100', textCol: 'text-emerald-700' },
                    { text: 'NULLA CIKI MÉM', bg: 'bg-red-100', textCol: 'text-red-700' },
                    { text: 'GARANTÁLT LUXUSVIZUÁL', bg: 'bg-amber-100', textCol: 'text-amber-700' },
                    { text: 'ÉRTHETŐ ÉNEK ZÉRÓ KÍNOS ROBOTHANG', bg: 'bg-blue-100', textCol: 'text-blue-700' },
                    { text: 'GÚNYOS KOMMENTEK HELYETT FELPÖRGŐ ALGORITMUS', bg: 'bg-purple-100', textCol: 'text-purple-700' },
                    { text: 'MILLIÓS NÉZETTSÉGŰ KÉPI VILÁG', bg: 'bg-pink-100', textCol: 'text-pink-700' }
                  ].map((label, lIdx) => (
                    <span 
                      key={lIdx} 
                      className={`${label.bg} ${label.textCol} text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}
                    >
                      {label.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BEFORE/AFTER AUDIO SHOWCASE SECTION                          */}
      {/* ============================================================ */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#0E0F14] text-white border-t border-neutral-800 relative overflow-hidden">
        {/* Subtle atmospheric ambient glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#EAA824]/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Content Side (60%) */}
            <div className="lg:w-[60%] w-full">
              {/* Section Header */}
              <div className="max-w-3xl mb-10 lg:mb-14">
                <h2 className="font-editorial font-bold text-2xl sm:text-3xl lg:text-[36px] leading-[1.25] text-white tracking-[-0.02em] mb-4 text-balance">
                  Nincs hangod? Nem baj, nekünk van fülünk.
                </h2>
                <p className="text-neutral-400 text-[14px] sm:text-[16px] leading-[1.65] max-w-2xl font-normal">
                  Parázol, hogy beégsz a mikrofon előtt, vagy kiröhögnek a követőid? Hallgasd meg, mit csináltunk egy hamis feléneklésből:
                </p>
              </div>

              {/* Comparison Players - Music WebApp Style (Liquid Glass) - Vertical Stack */}
              <div className="flex flex-col gap-4">
                
                {/* Norbi Track (Before) */}
                <div className="group flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex items-center gap-4 overflow-hidden">
                    {/* Play Button (Shown by default) */}
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#EAA824] transition-colors">
                      <Play size={14} fill="currentColor" className="ml-0.5 text-white group-hover:text-black" />
                    </div>
                    
                    {/* Album Cover (Sticker) */}
                    <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 bg-neutral-800 border border-white/5">
                      <img loading="lazy" decoding="async" 
                        src="https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/entrepeneur.webp"
                    {...responsive("https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/entrepeneur.webp", [384, 640, 1080], "(min-width: 768px) 640px, 100vw")} 
                        alt="Norbi Cover" 
                        className="w-full h-full object-cover scale-110" 
                      />
                    </div>
                    
                    {/* Title & Metadata */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-white truncate leading-tight group-hover:text-[#EAA824] transition-colors">
                        Norbi kornyikálása
                      </span>
                      <span className="text-[11px] text-neutral-500 font-medium">
                        amitől a szomszéd kutyája is vonítani kezdett. Csak saját felelősségre:
                      </span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-6 shrink-0 pr-2">
                    <div className="flex items-center gap-3">
                      <Heart size={14} className="text-neutral-500 hover:text-red-500 transition-colors" />
                      <MoreHorizontal size={14} className="text-neutral-500" />
                    </div>
                  </div>
                </div>

                {/* Tibi Track (After) */}
                <div className="group flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-2xl border border-[#EAA824]/20 hover:bg-white/15 transition-all cursor-pointer relative overflow-hidden shadow-[0_0_40px_rgba(234,168,36,0.05)]">
                  {/* Subtle glow effect for the "Good" track */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#EAA824]/5 to-transparent pointer-events-none" />
                  
                  <div className="flex items-center gap-4 overflow-hidden relative z-10">
                    {/* Play Button (Shown by default) */}
                    <div className="w-8 h-8 rounded-full bg-[#EAA824]/20 flex items-center justify-center shrink-0 group-hover:bg-[#EAA824] transition-colors">
                      <Play size={14} fill="currentColor" className="ml-0.5 text-[#EAA824] group-hover:text-black" />
                    </div>
                    
                    {/* Album Cover (Sticker) */}
                    <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 bg-[#EAA824]/10 border border-[#EAA824]/20">
                      <img loading="lazy" decoding="async" 
                        src="https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/producer.webp"
                    {...responsive("https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/producer.webp", [384, 640, 1080], "(min-width: 768px) 640px, 100vw")} 
                        alt="Tibi Cover" 
                        className="w-full h-full object-cover scale-110" 
                      />
                    </div>
                    
                    {/* Title & Metadata */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-white truncate leading-tight group-hover:text-[#EAA824] transition-colors">
                        Amit Tibi csinált belőle
                      </span>
                      <span className="text-[11px] text-[#EAA824]/80 font-bold">
                        Ezt már meghallgathatod anélkül, hogy vérezni kezdene a füled.
                      </span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-6 shrink-0 pr-2 relative z-10">
                    <div className="flex items-center gap-3">
                      <Heart size={14} fill="#EAA824" className="text-[#EAA824] hover:scale-110 transition-transform" />
                      <MoreHorizontal size={14} className="text-neutral-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side (40%) */}
            <div className="lg:w-[40%] w-full flex items-center justify-center">
              <div className="relative group mx-auto flex justify-center">
                {/* Subtle backglow for the image */}
                <div className="absolute inset-0 bg-[#EAA824]/10 blur-[60px] rounded-full group-hover:bg-[#EAA824]/20 transition-all duration-700" />
                <img loading="lazy" decoding="async" 
                  src="https://3hsqhvhvojbpy1pz.public.blob.vercel-storage.com/main/sing.webp" 
                  alt="Audio transformation visual"
                  className="relative z-10 w-full max-w-[480px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* VIDEO PRODUCTION SHOWCASE SECTION                            */}
      {/* ============================================================ */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#F4EFE6] border-t border-[#DFD8CC] text-[#161616]">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 mb-12 sm:mb-16">
            {/* Content Side (60%) */}
            <div className="lg:w-[60%] w-full">
              {/* Section Header */}
              <div className="max-w-3xl">
                <h2 className="font-editorial font-bold text-2xl sm:text-3xl lg:text-[36px] leading-[1.25] text-[#141414] tracking-[-0.02em] mb-4 text-balance">
                  Sosem szerveztél még profi klipforgatást? Nem baj, nem is a te dolgod..
                </h2>
                <div className="space-y-4">
                  <p className="text-[#3e3b36] text-[14px] sm:text-[16px] leading-[1.65] max-w-2xl font-normal">
                    Te is láttál már olyan klipet, amit egy beremegett telefonnal vettek fel a lépcsőházban, és a kommentekszekció szétszedte? Na, nálunk ilyen nem fordulhat elő.
                  </p>
                  <p className="text-[#3e3b36] text-[14px] sm:text-[16px] leading-[1.65] max-w-2xl font-normal">
                    Nem egy olcsó mém leszel, hanem az algoritmus kedvence. Nézz bele Ádi munkáiba:
                  </p>
                </div>
              </div>
            </div>

            {/* Large Video Side (40%) */}
            <div className="lg:w-[40%] w-full">
              <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black group relative">
                <iframe loading="lazy"
                  key={activeAdiVideoId}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeAdiVideoId}?autoplay=0`}
                  title="Main video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                {/* Subtle glass overlay when not playing */}
                <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-[22px]" />
              </div>
            </div>
          </div>

          {/* 4 Video Previews Grid (Bottom) - Dynamic Swap Logic */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {ADI_VIDEOS.filter(id => id !== activeAdiVideoId).map((videoId, idx) => (
              <button 
                key={videoId} 
                onClick={() => setActiveAdiVideoId(videoId)}
                className="aspect-video w-full rounded-xl overflow-hidden shadow-md border-2 border-[#DFD8CC] hover:border-[#EAA824]/50 transition-all duration-300 relative group cursor-pointer"
              >
                <img loading="lazy" decoding="async" 
                  src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
                  alt={`Video thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-black shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play size={14} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PRICING & SLÁGERCSOMAGOK SECTION                             */}
      {/* ============================================================ */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#0E0F14] text-white border-t border-neutral-800 relative overflow-hidden">
        {/* Subtle atmospheric ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#EAA824]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#EAA824] block mb-3">
              Így csináljuk mi az EgriProdnál...
            </span>
            <h2 className="font-editorial font-bold text-3xl sm:text-4xl lg:text-[44px] leading-tight text-white tracking-[-0.02em] mb-4 text-balance">
              Válaszd ki a neked tetsző csomagot
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              0% lenyúlt jogdíj. 100% a te tulajdonod. Nincsenek rejtett költségek és apróbetűs trükkök.
            </p>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-8 items-stretch mb-12 pt-2">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-[28px] p-4 sm:p-5 pt-6 sm:pt-7 flex flex-col transition-all duration-300 relative ${
                  tier.isPopular
                    ? 'bg-[#161822] border-2 border-[#EAA824] shadow-[0_20px_50px_rgba(234,168,36,0.15)] lg:-translate-y-2'
                    : 'bg-[#13141A] border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Top-Border Pills: Package Title (+ optional Popular/VIP Badge) */}
                <div className="absolute -top-3.5 left-5 right-5 z-20 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-white text-[#121212] border border-neutral-200 text-[11px] font-bold uppercase tracking-wider shadow-md">
                    {tier.name}
                  </span>
                  {tier.badge && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAA824] text-[#121212] text-[10px] font-black uppercase tracking-wider shadow-md">
                      {tier.badge}
                    </span>
                  )}
                </div>

                {/* Top Visual Header Card with Image & Price */}
                <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden p-4 sm:p-5 flex flex-col justify-end mb-5 border border-white/10 bg-[#F4EFE6]">
                  <img loading="lazy" decoding="async"
                    src={tier.image}
                    alt={tier.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Bottom Row: Price inside Image Banner */}
                  <div className="relative z-10">
                    <div className="font-editorial font-bold text-xl sm:text-2xl text-white tracking-tight drop-shadow-sm">
                      {tier.price}
                    </div>
                  </div>
                </div>

                {/* Card Body: Description and CTA Button */}
                <div className="px-1.5 pb-1 flex flex-col flex-1">
                  {/* Description below image box */}
                  <p className="text-[13px] sm:text-sm text-neutral-300 leading-relaxed mb-6 flex-1">
                    {tier.goal}
                  </p>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button
                      onClick={() => showToast(`Kiválasztva: ${tier.name}`)}
                      className={`w-full py-3.5 px-5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                        tier.isPopular
                          ? 'bg-[#EAA824] text-black hover:bg-[#ffba2e] font-bold'
                          : 'bg-neutral-800/90 hover:bg-neutral-700 text-white border border-neutral-700'
                      }`}
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Toggle Button for Detailed Comparison Table */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowComparisonTable(!showComparisonTable)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <span>{showComparisonTable ? 'Részletes összehasonlító táblázat elrejtése' : 'Teljes csomag-összehasonlító táblázat megtekintése'}</span>
              {showComparisonTable ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Detailed Row-by-Row Comparison Matrix */}
          {showComparisonTable && (
            <div className="bg-[#14151B] rounded-3xl border border-neutral-800 p-4 sm:p-8 overflow-x-auto shadow-2xl animate-in fade-in duration-300">
              <table className="w-full min-w-[700px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-neutral-400 w-[22%]">
                      Tárgy
                    </th>
                    <th className="py-4 px-4 text-xs font-bold text-white w-[26%]">
                      Saját Dal + Lyrics Videó
                    </th>
                    <th className="py-4 px-4 text-xs font-bold text-white w-[26%] bg-[#EAA824]/5 rounded-t-xl">
                      Dal + Stúdióklip + 20 Reels
                    </th>
                    <th className="py-4 px-4 text-xs font-bold text-white w-[26%]">
                      Dal + Külsős Klip + 20 Reels
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-xs sm:text-[13px]">
                  {COMPARISON_ROWS.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-neutral-900/30 transition-colors align-top">
                      <td className="py-4 px-4 font-semibold text-neutral-200">
                        {row.feature}
                      </td>
                      <td className="py-4 px-4 text-neutral-300">
                        {renderComparisonCell(row.tier1)}
                      </td>
                      <td className="py-4 px-4 bg-[#EAA824]/5 text-neutral-200">
                        {renderComparisonCell(row.tier2)}
                      </td>
                      <td className="py-4 px-4 text-neutral-300">
                        {renderComparisonCell(row.tier3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </section>

      {/* ============================================================ */}
      {/* BONUSES SECTION (Horizontal Bonus Cards)                     */}
      {/* ============================================================ */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#F4EFE6] border-t border-[#DFD8CC] text-[#161616] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header + Horizontal Scroll Controls */}
          <div className="flex items-end justify-between gap-6 mb-10 sm:mb-14">
            <h2 className="font-editorial font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#141414] tracking-[-0.02em]">
              Bónuszok
            </h2>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollBonuses('left')}
                aria-label="Előző bónusz"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#141414] text-[#141414] hover:text-white border border-[#D5CFC3] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollBonuses('right')}
                aria-label="Következő bónusz"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#141414] text-[#141414] hover:text-white border border-[#D5CFC3] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Horizontal Row of Voucher-Style Bonus Cards (No visible scrollbar, drag-to-scroll enabled) */}
          <div
            ref={bonusRowRef}
            onMouseDown={handleBonusMouseDown}
            onMouseMove={handleBonusMouseMove}
            onMouseUp={stopBonusDrag}
            onMouseLeave={stopBonusDrag}
            className={`no-scrollbar flex flex-row gap-5 sm:gap-6 overflow-x-auto pb-4 select-none ${
              isDraggingBonuses
                ? 'cursor-grabbing'
                : 'cursor-grab snap-x snap-mandatory scroll-smooth'
            }`}
          >
            {BONUS_CARDS.map((bonus) => (
              <div
                key={bonus.id}
                className="w-[325px] sm:w-[375px] shrink-0 snap-start rounded-2xl relative overflow-hidden bg-[#0D0F14] border border-white/10 shadow-[0_20px_45px_rgba(14,15,20,0.2)] flex flex-col justify-between min-h-[260px] group hover:-translate-y-1 transition-all duration-300"
              >
                {/* Diagonal two-tone matte card backdrop matching reference */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(122deg, #0B0D12 0%, #0B0D12 46%, #171B24 46.4%, #10131A 100%)',
                  }}
                />

                {/* Bold Tilted Gold Emblem on Left Edge */}
                <svg
                  viewBox="0 0 140 240"
                  className="absolute -left-2 top-0 bottom-0 h-full w-[30%] pointer-events-none select-none"
                  preserveAspectRatio="none"
                >
                  <g transform="rotate(-10 70 120)">
                    <path
                      d="M 12 -10 L 42 -10 L 92 250 L 62 250 Z"
                      fill="#EAA824"
                    />
                    <path
                      d="M 10 92 L 96 76 L 101 102 L 15 118 Z"
                      fill="#EAA824"
                    />
                    <path
                      d="M 18 142 L 104 126 L 109 152 L 23 168 Z"
                      fill="#EAA824"
                    />
                  </g>
                </svg>

                {/* Card Content */}
                <div className="relative z-10 pl-[31%] pr-5 sm:pr-6 py-5 sm:py-6 flex flex-col justify-between flex-1">
                  {/* Top Row: Brand Mark & Bonus Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black tracking-[0.18em] text-[#EAA824] uppercase">
                      EGRI PROD
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-neutral-400 uppercase">
                      BÓNUSZ {bonus.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="my-auto py-1">
                    <h3 className="font-editorial font-bold text-[15px] sm:text-[17px] text-white leading-snug mb-2">
                      {bonus.title}
                    </h3>
                    <p className="text-[12px] leading-relaxed text-neutral-300">
                      {bonus.description}
                    </p>
                  </div>

                  {/* Price / Value */}
                  <div className="pt-4 mt-2 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#EAA824] block mb-0.5">
                      Értéke
                    </span>
                    <div className="font-editorial font-bold text-2xl sm:text-[26px] text-white tracking-tight">
                      {bonus.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* GUARANTEES SECTION (5 Fanned Cards)                          */}
      {/* ============================================================ */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-10 lg:px-16 bg-[#0E0F14] text-white border-t border-neutral-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="font-editorial font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-white tracking-[-0.02em] text-balance">
              Garanciák
            </h2>
          </div>

          {/* 5 Fanned Overlapping Cards Deck */}
          <div className="relative flex items-center justify-center h-[545px] sm:h-[585px] w-full max-w-[1160px] mx-auto select-none">
            {GUARANTEE_CARDS.map((card, idx) => {
              const offset = idx - activeGuaranteeIndex;
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;

              const rotateDeg = offset * 5.5;
              const translateY = absOffset * absOffset * 11;
              const scale = Math.max(0.82, 1 - absOffset * 0.065);
              const zIndex = 30 - absOffset * 10;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActiveGuaranteeIndex(idx)}
                  aria-label={card.title}
                  style={{
                    zIndex,
                    transform: `translateX(calc(${offset} * var(--guarantee-step, 175px))) translateY(${translateY}px) rotate(${rotateDeg}deg) scale(${scale})`,
                    boxShadow: isCenter
                      ? `0 30px 70px rgba(0, 0, 0, 0.65), 0 0 50px ${card.accentGlow}`
                      : '0 20px 45px rgba(0, 0, 0, 0.5)',
                  }}
                  className={`[--guarantee-step:64px] sm:[--guarantee-step:125px] lg:[--guarantee-step:185px] absolute w-[275px] sm:w-[310px] lg:w-[325px] h-[495px] sm:h-[535px] rounded-[28px] pt-5 px-5 sm:pt-6 sm:px-6 pb-0 flex flex-col justify-between text-left transition-all duration-300 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAA824] border border-white/15 overflow-hidden ${card.bgClass} ${
                    isCenter ? 'brightness-100' : 'brightness-90 hover:brightness-95'
                  }`}
                >
                  {/* Top Content: Title + Description */}
                  <div className="relative z-10">
                    <h3 className="font-editorial font-bold text-[17px] sm:text-[20px] leading-[1.2] text-white tracking-tight mb-2.5 text-balance">
                      {card.title}
                    </h3>
                    <p className="text-[11.5px] sm:text-[12.5px] leading-[1.45] text-white/95 font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Character Illustration */}
                  <div className="relative z-10 flex-1 w-full flex items-end justify-center overflow-hidden pt-2">
                    <TransparentSticker
                      src={card.image}
                      alt={card.title}
                      className="w-full max-w-[235px] sm:max-w-[265px] max-h-[235px] sm:max-h-[260px] object-contain object-bottom drop-shadow-[0_12px_22px_rgba(0,0,0,0.35)] pointer-events-none"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls for Fanned Cards */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() =>
                setActiveGuaranteeIndex((prev) =>
                  prev > 0 ? prev - 1 : GUARANTEE_CARDS.length - 1
                )
              }
              aria-label="Előző garancia"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#EAA824] text-white hover:text-[#121212] border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveGuaranteeIndex((prev) =>
                  prev < GUARANTEE_CARDS.length - 1 ? prev + 1 : 0
                )
              }
              aria-label="Következő garancia"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#EAA824] text-white hover:text-[#121212] border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
