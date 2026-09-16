import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Truck, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Globe2, 
  Sparkles,
  Scissors,
  Activity,
  ChevronRight
} from 'lucide-react';
import { AuthUser, UserType } from '../types';

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
  lang: 'en' | 'ta' | 'hi';
  setLang: (lang: 'en' | 'ta' | 'hi') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, lang, setLang }) => {
  const [selectedRole, setSelectedRole] = useState<UserType>('FACTORY_MANAGER');
  const [identifier, setIdentifier] = useState('manager@tiruppurexports.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const t = {
    en: {
      headline: 'StitchGrid: Garment Workforce & Peak Crunch Dispatch',
      subheadline: 'Zero-downtime labor marketplace for garment manufacturing. Instantly book certified sewing operators, tailors, and contractor squads during peak export crunches.',
      loginTitle: 'Sign In to Factory Dashboard',
      loginSubtitle: 'Select your operational role to access the terminal',
      roles: {
        factory: 'Factory Production Manager',
        worker: 'Skilled Apparel Worker',
        maistry: 'Labor Contractor (Maistry)',
      },
      rolesDesc: {
        factory: 'Floor Incharge, IE Managers & Factory Owners',
        worker: 'Sewing Operators, Tailors, Checkers & Finishers',
        maistry: 'Squad Leaders managing 10–25 worker crews',
      },
      demoAccounts: '1-Click Instant Demo Access',
      enterTerminal: 'Sign In & Launch Floor Terminal',
      guestAccess: 'Explore as Guest Floor Supervisor →',
      stats: [
        { label: 'Verified Standby Operators', val: '184' },
        { label: 'Avg Dispatch Arrival', val: '22 mins' },
        { label: 'Active Clusters', val: 'Tiruppur, Surat, NCR' },
        { label: 'SAM Balancing Target', val: '≥ 85%' },
      ],
    },
    ta: {
      headline: 'StitchGrid: Garment Workforce & Peak Crunch Dispatch',
      subheadline: 'ஆடை ஏற்றுமதி நிறுவனங்களுக்கான உடனடி திறன் தொழிலாளர் இணைப்பு தளம். பீக் சீசன் நெரிசலின் போது தையல் மெஷின் ஆபரேட்டர்கள் & கான்ட்ராக்ட் குழுக்களை உடனே அமர்த்துங்கள்.',
      loginTitle: 'தொழிற்சாலை தளத்தில் உள்நுழைக',
      loginSubtitle: 'உங்கள் பொறுப்பைத் தேர்வு செய்து உள்நுழையவும்',
      roles: {
        factory: 'தொழிற்சாலை மேலாளர் / உரிமையாளர்',
        worker: 'திறன் தையல் / ஆடை தொழிலாளி',
        maistry: 'லேபர் கான்ட்ராக்டர் / மேஸ்திரி',
      },
      rolesDesc: {
        factory: 'தயாரிப்பு வரிசை மேலாண்மை & அவசர ஆட்கள் தேவை',
        worker: 'தையல், கட்டிங், செக்கிங் & அயர்னிங் வேலைகள்',
        maistry: '10–25 ஆட்கள் கொண்ட குழுவின் பொறுப்பாளர்',
      },
      demoAccounts: '1-கிளிக் நேரடி டெமோ அணுகல்',
      enterTerminal: 'உள்நுழைக (Launch Terminal)',
      guestAccess: 'நேரடியாக தளத்தைப் பார்க்க →',
      stats: [
        { label: 'தயாராக உள்ள தொழிலாளர்கள்', val: '184' },
        { label: 'சராசரி வருகை நேரம்', val: '22 நிமிடம்' },
        { label: 'செயல்பாட்டு மண்டலங்கள்', val: 'திருப்பூர், சூரத், NCR' },
        { label: 'SAM செயல்திறன் இலக்கு', val: '≥ 85%' },
      ],
    },
    hi: {
      headline: 'StitchGrid: Garment Workforce & Peak Crunch Dispatch',
      subheadline: 'गारमेंट मैन्युफैक्चरिंग के लिए ऑन-डिमांड कुशल कारीगर नेटवर्क। पीक प्रोडक्शन सीजन में तुरंत सिलाई ऑपरेटर, टेलर और ठेकेदार टीम बुक करें।',
      loginTitle: 'फैक्ट्री टर्मिनल में साइन इन करें',
      loginSubtitle: 'अपनी भूमिका चुनें और डैशबोर्ड शुरू करें',
      roles: {
        factory: 'फैक्ट्री प्रोडक्शन मैनेजर',
        worker: 'कुशल सिलाई / परिधान कारीगर',
        maistry: 'लेबर ठेकेदार (मिस्त्री)',
      },
      rolesDesc: {
        factory: 'प्रोडक्शन लाइन और आपातकालीन ऑपरेटर मांग',
        worker: 'सिलाई, कटिंग, चेकिंग और आयरनिंग ऑपरेटर',
        maistry: '10–25 कारीगरों की टीम का नेतृत्व',
      },
      demoAccounts: '1-क्लिक त्वरित डेमो एक्सेस',
      enterTerminal: 'टर्मिनल में प्रवेश करें',
      guestAccess: 'अतिथि पर्यवेक्षक के रूप में देखें →',
      stats: [
        { label: 'सत्यापित ऑपरेटर तैयार', val: '184' },
        { label: 'औसत आगमन समय', val: '22 मिनट' },
        { label: 'सक्रिय क्लस्टर', val: 'तिरुपूर, सूरत, NCR' },
        { label: 'SAM दक्षता लक्ष्य', val: '≥ 85%' },
      ],
    },
  }[lang];

  const handleRoleSelect = (role: UserType) => {
    setSelectedRole(role);
    if (role === 'FACTORY_MANAGER') {
      setIdentifier('m.sundaram@tiruppurexports.com');
    } else if (role === 'SKILLED_WORKER') {
      setIdentifier('+91 98421 88210 (K. Selvan)');
    } else {
      setIdentifier('+91 98430 45120 (R. Marimuthu Maistry)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    proceedLogin(selectedRole);
  };

  const proceedLogin = (role: UserType) => {
    let user: AuthUser;
    if (role === 'FACTORY_MANAGER') {
      user = {
        id: 'usr-mgr-1',
        name: 'M. Sundaram (IE & Production Head)',
        emailOrPhone: 'm.sundaram@tiruppurexports.com',
        userType: 'FACTORY_MANAGER',
        organizationOrTrade: 'Tiruppur Knitwear Export Unit 3',
        cluster: 'Netaji Apparel Park - Zone A',
      };
    } else if (role === 'SKILLED_WORKER') {
      user = {
        id: 'usr-worker-1',
        name: 'K. Selvan',
        emailOrPhone: '+91 98421 88210',
        userType: 'SKILLED_WORKER',
        organizationOrTrade: '4-Thread Overlock & Flatlock Specialist',
        cluster: 'Angeripalayam Garment Hub',
      };
    } else {
      user = {
        id: 'usr-maistry-1',
        name: 'R. Marimuthu (Maistry Leader)',
        emailOrPhone: '+91 98430 45120',
        userType: 'LABOR_MAISTRY',
        organizationOrTrade: 'Marimuthu Apparel Contractor Squad (16 Ops)',
        cluster: 'Avinashi Industrial Corridor',
      };
    }
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>

      {/* Top Banner Bar */}
      <header className="border-b border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-lg tracking-tighter shadow-md shadow-amber-500/20">
            SG
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight">
                Stitch<span className="text-amber-400">Grid</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-amber-400 border border-neutral-700">
                PROD v2.4
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 hidden sm:block">
              Garment Manufacturing Workforce & Peak Crunch Dispatch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-neutral-800 rounded-lg p-0.5 border border-neutral-700">
            <Globe2 className="w-3.5 h-3.5 text-neutral-400 ml-1.5" />
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                lang === 'en' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ta')}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                lang === 'ta' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                lang === 'hi' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>

          <button
            onClick={() => proceedLogin('FACTORY_MANAGER')}
            className="hidden sm:flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold px-2.5 py-1 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
          >
            <span>Quick Entry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Front Hero & Login Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-10 z-10">
        
        {/* Left Column: Brand Headline & Value Proposition */}
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Tiruppur • Surat • Bengaluru • NCR • Dhaka Garment Hubs</span>
          </div>

          {/* Requested Exact Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            StitchGrid: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Garment Workforce</span> & Peak Crunch Dispatch
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
            {t.subheadline}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {t.stats.map((stat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <div className="text-lg sm:text-xl font-black text-amber-400 font-mono">{stat.val}</div>
                <div className="text-[11px] text-neutral-400 mt-0.5 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Key Floor Capability Pills */}
          <div className="space-y-2 pt-2 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>1-Click SOS Auto-Fill:</strong> Instantly replace absent overlock & flatlock operators</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>45-Min Tempo Transit:</strong> Pre-contracted transportation to factory entrance gates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>AI SAM Production Balancer:</strong> Industrial Engineering line balancing and bottleneck removal</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Login Box */}
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative backdrop-blur-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {t.loginTitle}
            </h2>
            <p className="text-xs text-neutral-400">
              {t.loginSubtitle}
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
            <button
              type="button"
              onClick={() => handleRoleSelect('FACTORY_MANAGER')}
              className={`flex flex-col items-center py-2 px-1 rounded-lg text-center transition-all ${
                selectedRole === 'FACTORY_MANAGER'
                  ? 'bg-neutral-800 text-amber-400 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Building2 className="w-4 h-4 mb-1" />
              <span className="text-[10px] whitespace-nowrap">Factory</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('SKILLED_WORKER')}
              className={`flex flex-col items-center py-2 px-1 rounded-lg text-center transition-all ${
                selectedRole === 'SKILLED_WORKER'
                  ? 'bg-neutral-800 text-amber-400 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Users className="w-4 h-4 mb-1" />
              <span className="text-[10px] whitespace-nowrap">Operator</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('LABOR_MAISTRY')}
              className={`flex flex-col items-center py-2 px-1 rounded-lg text-center transition-all ${
                selectedRole === 'LABOR_MAISTRY'
                  ? 'bg-neutral-800 text-amber-400 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Truck className="w-4 h-4 mb-1" />
              <span className="text-[10px] whitespace-nowrap">Contractor</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs space-y-1">
            <div className="font-bold text-amber-300">
              {selectedRole === 'FACTORY_MANAGER' && t.roles.factory}
              {selectedRole === 'SKILLED_WORKER' && t.roles.worker}
              {selectedRole === 'LABOR_MAISTRY' && t.roles.maistry}
            </div>
            <div className="text-[11px] text-neutral-400">
              {selectedRole === 'FACTORY_MANAGER' && t.rolesDesc.factory}
              {selectedRole === 'SKILLED_WORKER' && t.rolesDesc.worker}
              {selectedRole === 'LABOR_MAISTRY' && t.rolesDesc.maistry}
            </div>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-300 font-semibold mb-1">
                {selectedRole === 'FACTORY_MANAGER' ? 'Factory Email / User ID' : 'Mobile Number (WhatsApp OTP)'}
              </label>
              <div className="relative">
                {selectedRole === 'FACTORY_MANAGER' ? (
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                ) : (
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                )}
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-semibold mb-1">Security PIN / Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-amber-400/80 hover:text-amber-300 cursor-pointer">Emergency OTP Login</span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <span>{t.enterTerminal}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Demo Accounts */}
          <div className="pt-2 border-t border-neutral-800 space-y-2">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-center">
              {t.demoAccounts}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => proceedLogin('FACTORY_MANAGER')}
                className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10px] font-semibold text-neutral-300 hover:text-white transition-all text-center"
              >
                🏭 Tiruppur Unit Head
              </button>
              <button
                type="button"
                onClick={() => proceedLogin('SKILLED_WORKER')}
                className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10px] font-semibold text-neutral-300 hover:text-white transition-all text-center"
              >
                🧵 Overlock Operator
              </button>
              <button
                type="button"
                onClick={() => proceedLogin('LABOR_MAISTRY')}
                className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10px] font-semibold text-neutral-300 hover:text-white transition-all text-center"
              >
                🚚 Labor Squad Maistry
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => proceedLogin('FACTORY_MANAGER')}
              className="text-xs text-neutral-400 hover:text-amber-400 transition-colors underline underline-offset-4"
            >
              {t.guestAccess}
            </button>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-4 px-4 text-center text-xs text-neutral-400 z-10">
        <p>StitchGrid Apparel Operations Platform • Trusted by 120+ Garment Export Factories Across India & South Asia</p>
      </footer>
    </div>
  );
};
