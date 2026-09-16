import React from 'react';
import { 
  Zap, 
  Activity, 
  Users, 
  ShieldAlert, 
  Cpu, 
  Calculator, 
  PhoneCall, 
  Truck,
  Globe2,
  ArrowLeft,
  LogOut,
  User
} from 'lucide-react';
import { AuthUser } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'en' | 'ta' | 'hi';
  setLang: (lang: 'en' | 'ta' | 'hi') => void;
  openSOSModal: () => void;
  openWorkerRegisterModal: () => void;
  activeDispatchesCount: number;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  openSOSModal,
  openWorkerRegisterModal,
  activeDispatchesCount,
  currentUser,
  onLogout,
}) => {
  const translations = {
    en: {
      tagline: 'Garment Workforce & Peak Crunch Dispatch',
      clusterStatus: 'Tiruppur, Surat & NCR Apparel Clusters: 184 Operators Ready',
      sosButton: 'SOS Peak Crunch Dispatch',
      registerWorker: '+ Register Worker / Maistry',
      tabs: {
        lines: 'Factory Production Lines',
        workers: 'Skilled Workers Directory',
        crews: 'Contractor Crews (Maistries)',
        aiOptimizer: 'AI Line Balancer',
        calculator: 'Shortage Cost Calculator',
      },
    },
    ta: {
      tagline: 'ஆடை உற்பத்தி தொழிலாளர் மற்றும் அவசர டிஸ்பாட்ச்',
      clusterStatus: 'திருப்பூர் ஆடை கிளஸ்டர்: 184 தையல் தொழிலாளர்கள் தயார்',
      sosButton: 'SOS அவசர லைன் டிஸ்பாட்ச்',
      registerWorker: '+ தொழிலாளர் / மேஸ்திரி பதிவு',
      tabs: {
        lines: 'உற்பத்தி லைன்கள்',
        workers: 'திறன் தொழிலாளர்கள்',
        crews: 'காண்ட்ராக்ட் குழுக்கள்',
        aiOptimizer: 'AI லைன் பேலன்சிங்',
        calculator: 'நஷ்ட கணக்கீடு',
      },
    },
    hi: {
      tagline: 'गारमेंट वर्कफोर्स और पीक क्रंच डिस्पैच',
      clusterStatus: 'टेक्सटाइल हब: 184 कुशल कारीगर उपलब्ध',
      sosButton: 'SOS इमरजेंसी डिस्पैच',
      registerWorker: '+ कारीगर / ठेकेदार जोड़ें',
      tabs: {
        lines: 'प्रोडक्शन लाइन्स',
        workers: 'कुशल कारीगर डायरेक्टरी',
        crews: 'कांट्रैक्टर क्रू',
        aiOptimizer: 'AI लाइन बैलेंसर',
        calculator: 'नुकसान कैलकुलेटर',
      },
    },
  };

  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      {/* Top micro-bar with cluster live feed */}
      <div className="bg-neutral-900 border-b border-neutral-800/80 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-neutral-300 font-medium">{t.clusterStatus}</span>
          <span className="hidden md:inline-block text-neutral-600">|</span>
          <span className="hidden md:inline text-neutral-400">
            Avg. Dispatch Response Time: <strong className="text-amber-400">22 mins</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {activeDispatchesCount > 0 && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-medium">
              <Truck className="w-3.5 h-3.5 animate-pulse" />
              <span>{activeDispatchesCount} Dispatches Active</span>
            </div>
          )}

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-neutral-800 rounded-md p-0.5 border border-neutral-700">
            <Globe2 className="w-3.5 h-3.5 text-neutral-400 ml-1.5" />
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                lang === 'en' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ta')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                lang === 'ta' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Tamil"
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                lang === 'hi' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Hindi"
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('lines')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/20 font-black text-xl tracking-tighter">
            SG
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">Stitch<span className="text-amber-400">Grid</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-neutral-800 text-amber-400 border border-neutral-700">
                PROD v2.4
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {currentUser && (
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left leading-tight">
                <div className="text-white font-medium text-[11px] truncate max-w-[120px]">{currentUser.name.split(' ')[0]}</div>
                <div className="text-[9px] text-amber-400 font-semibold">{currentUser.userType === 'FACTORY_MANAGER' ? 'Factory GM' : currentUser.userType === 'SKILLED_WORKER' ? 'Operator' : 'Maistry'}</div>
              </div>
            </div>
          )}

          <button
            onClick={openWorkerRegisterModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.registerWorker}</span>
          </button>

          <button
            onClick={openSOSModal}
            className="relative group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-neutral-950 bg-gradient-to-r from-red-500 via-amber-400 to-red-500 bg-[length:200%_auto] hover:bg-right transition-all shadow-lg shadow-red-500/25 active:scale-95"
          >
            <ShieldAlert className="w-4 h-4 text-neutral-950 animate-bounce" />
            <span>{t.sosButton}</span>
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              title="Sign Out / Switch Role"
              className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-rose-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-rose-500/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar gap-1 border-t border-neutral-800/60 pt-1 pb-2">
        {currentTab !== 'lines' && (
          <button
            onClick={() => setCurrentTab('lines')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 transition-all whitespace-nowrap mr-1 shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Lines</span>
          </button>
        )}

        <button
          onClick={() => setCurrentTab('lines')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            currentTab === 'lines'
              ? 'bg-neutral-800 text-amber-400 border border-neutral-700 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{t.tabs.lines}</span>
        </button>

        <button
          onClick={() => setCurrentTab('workers')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            currentTab === 'workers'
              ? 'bg-neutral-800 text-amber-400 border border-neutral-700 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.tabs.workers}</span>
        </button>

        <button
          onClick={() => setCurrentTab('crews')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            currentTab === 'crews'
              ? 'bg-neutral-800 text-amber-400 border border-neutral-700 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>{t.tabs.crews}</span>
        </button>

        <button
          onClick={() => setCurrentTab('aiOptimizer')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            currentTab === 'aiOptimizer'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
          }`}
        >
          <Cpu className="w-4 h-4 text-amber-400" />
          <span>{t.tabs.aiOptimizer}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-neutral-950 font-bold">AI</span>
        </button>

        <button
          onClick={() => setCurrentTab('calculator')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            currentTab === 'calculator'
              ? 'bg-neutral-800 text-amber-400 border border-neutral-700 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>{t.tabs.calculator}</span>
        </button>
      </div>
    </header>
  );
};
