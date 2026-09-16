import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LineMonitorView } from './components/LineMonitorView';
import { WorkerDirectoryView } from './components/WorkerDirectoryView';
import { ContractorCrewsView } from './components/ContractorCrewsView';
import { AILineOptimizerView } from './components/AILineOptimizerView';
import { CostCalculatorView } from './components/CostCalculatorView';
import { SOSCrunchModal } from './components/SOSCrunchModal';
import { WorkerRegistrationModal } from './components/WorkerRegistrationModal';
import { ActiveDispatchesBar } from './components/ActiveDispatchesBar';
import { LoginPage } from './components/LoginPage';
import { INITIAL_WORKERS, INITIAL_PRODUCTION_LINES, INITIAL_CREWS } from './data/mockData';
import { ProductionLine, WorkerProfile, ContractorCrew, DispatchBooking, AuthUser } from './types';
import { CheckCircle2, Zap, Truck, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('lines');
  const [lang, setLang] = useState<'en' | 'ta' | 'hi'>('en');
  const [lines, setLines] = useState<ProductionLine[]>(INITIAL_PRODUCTION_LINES);
  const [workers, setWorkers] = useState<WorkerProfile[]>(INITIAL_WORKERS);
  const [crews, setCrews] = useState<ContractorCrew[]>(INITIAL_CREWS);
  const [activeDispatches, setActiveDispatches] = useState<DispatchBooking[]>([
    {
      id: 'disp-init-1',
      lineId: 'LINE 03 - KNITWEAR EXPORT',
      factoryName: 'Tiruppur Unit 3',
      workerCount: 4,
      roles: ['SEWING_OPERATOR', 'IRONING_WORKER'],
      shiftType: 'IMMEDIATE_DAY',
      status: 'DISPATCHED',
      etaMinutes: 22,
      totalEstimatedCost: 2800,
      timestamp: '12 mins ago',
    },
  ]);

  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isWorkerRegisterModalOpen, setIsWorkerRegisterModalOpen] = useState(false);
  const [aiSelectedLine, setAiSelectedLine] = useState<ProductionLine | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // 1-Click Auto-Fill a line's labor shortage
  const handleAutoFillLine = (lineId: string) => {
    const targetLine = lines.find(l => l.id === lineId);
    if (!targetLine) return;

    const totalMissing = targetLine.missingRoles.reduce((s, r) => s + r.missingCount, 0);

    // Update the line's state: full efficiency, active workers restored, bottlenecks cleared
    setLines(prevLines =>
      prevLines.map(line => {
        if (line.id === lineId) {
          return {
            ...line,
            activeWorkers: line.requiredWorkers,
            efficiencyRate: 93,
            currentOutputPerHour: line.targetOutputPerHour,
            missingRoles: [],
            bottleneckOperation: 'Balanced (Line Restored by StitchGrid Dispatch)',
          };
        }
        return line;
      })
    );

    // Create a live dispatch booking
    const newDispatch: DispatchBooking = {
      id: `disp-${Date.now().toString().slice(-5)}`,
      lineId: targetLine.lineCode,
      factoryName: 'Export Unit 1',
      workerCount: totalMissing,
      roles: targetLine.missingRoles.map(r => r.role),
      shiftType: 'IMMEDIATE_DAY',
      status: 'DISPATCHED',
      etaMinutes: 25,
      totalEstimatedCost: totalMissing * 680,
      timestamp: 'Just now',
    };

    setActiveDispatches(prev => [newDispatch, ...prev]);
    showToast(`⚡ Dispatched ${totalMissing} certified operators to ${targetLine.lineCode}! Line SAM efficiency restored to 93%.`);
  };

  // Deploy AI Recommended Team
  const handleDeployRecommendedTeam = (team: any[], lineId?: string) => {
    const totalCount = team.reduce((acc, t) => acc + t.count, 0);
    const targetLineId = lineId || lines[0].id;
    const targetLine = lines.find(l => l.id === targetLineId);

    setLines(prevLines =>
      prevLines.map(line => {
        if (line.id === targetLineId) {
          return {
            ...line,
            activeWorkers: line.requiredWorkers,
            efficiencyRate: 91,
            currentOutputPerHour: line.targetOutputPerHour,
            missingRoles: [],
            bottleneckOperation: 'Balanced with AI IE Roster',
          };
        }
        return line;
      })
    );

    const newDispatch: DispatchBooking = {
      id: `ai-disp-${Date.now().toString().slice(-4)}`,
      lineId: targetLine?.lineCode || 'LINE 03',
      factoryName: 'Export Unit 1',
      workerCount: totalCount,
      roles: team.map(t => t.role),
      shiftType: 'IMMEDIATE_DAY',
      status: 'DISPATCHED',
      etaMinutes: 30,
      totalEstimatedCost: team.reduce((sum, t) => sum + (t.count * t.estimatedDailyWage), 0),
      timestamp: 'Just now',
    };

    setActiveDispatches(prev => [newDispatch, ...prev]);
    setCurrentTab('lines');
    showToast(`🚀 AI Recommended Squad of ${totalCount} operators dispatched to floor! Line balanced.`);
  };

  // Book an individual worker
  const handleBookWorker = (worker: WorkerProfile) => {
    const defaultLine = lines[0];
    const newDispatch: DispatchBooking = {
      id: `disp-single-${Date.now().toString().slice(-4)}`,
      lineId: defaultLine.lineCode,
      factoryName: 'Tiruppur Unit 3',
      workerCount: 1,
      roles: [worker.role],
      shiftType: 'IMMEDIATE_DAY',
      status: 'DISPATCHED',
      etaMinutes: worker.transitTimeMins,
      totalEstimatedCost: worker.dailyWage,
      timestamp: 'Just now',
    };

    // Mark worker as booked
    setWorkers(prev =>
      prev.map(w => (w.id === worker.id ? { ...w, availability: 'BOOKED' } : w))
    );

    setActiveDispatches(prev => [newDispatch, ...prev]);
    showToast(`✅ ${worker.name} (${worker.roleDisplay}) booked for dispatch! ETA ~${worker.transitTimeMins} mins.`);
  };

  // Book a contractor squad
  const handleBookCrew = (crew: ContractorCrew) => {
    const defaultLine = lines[0];
    const newDispatch: DispatchBooking = {
      id: `crew-disp-${Date.now().toString().slice(-4)}`,
      lineId: defaultLine.lineCode,
      factoryName: 'Tiruppur Unit 3',
      workerCount: crew.totalWorkers,
      roles: ['SEWING_OPERATOR', 'IRONING_WORKER'],
      shiftType: 'IMMEDIATE_DAY',
      status: 'DISPATCHED',
      etaMinutes: 35,
      totalEstimatedCost: crew.dailyRatePerTeam,
      timestamp: 'Just now',
    };

    setCrews(prev =>
      prev.map(c => (c.id === crew.id ? { ...c, status: 'DISPATCHING' } : c))
    );

    setActiveDispatches(prev => [newDispatch, ...prev]);
    showToast(`🚚 ${crew.crewName} (${crew.totalWorkers} operators) dispatched via Tempo transport!`);
  };

  const handleRegisterWorker = (newWorker: WorkerProfile) => {
    setWorkers(prev => [newWorker, ...prev]);
    showToast(`🎉 Welcome ${newWorker.name}! Your skilled profile is now active on StitchGrid.`);
  };

  const handleMarkArrived = (dispatchId: string) => {
    setActiveDispatches(prev =>
      prev.map(d => (d.id === dispatchId ? { ...d, status: 'ARRIVED', etaMinutes: 0 } : d))
    );
    showToast(`🎉 Workers checked in at factory gate and assigned to machines.`);
  };

  // If user is not logged in, show the requested Front / Login page
  if (!currentUser) {
    return (
      <LoginPage
        onLogin={(user) => {
          setCurrentUser(user);
          showToast(`✅ Welcome, ${user.name}! Floor Terminal Active.`);
        }}
        lang={lang}
        setLang={setLang}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Primary Sticky Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        openSOSModal={() => setIsSOSModalOpen(true)}
        openWorkerRegisterModal={() => setIsWorkerRegisterModalOpen(true)}
        activeDispatchesCount={activeDispatches.filter(d => d.status !== 'ARRIVED').length}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Signed out from factory terminal.');
        }}
      />

      {/* Active In-Transit Dispatches Banner */}
      <ActiveDispatchesBar
        dispatches={activeDispatches}
        onMarkArrived={handleMarkArrived}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'lines' && (
          <LineMonitorView
            lines={lines}
            onAutoFillLine={handleAutoFillLine}
            onOpenAIOptimizerForLine={(line) => {
              setAiSelectedLine(line);
              setCurrentTab('aiOptimizer');
            }}
            openSOSModal={() => setIsSOSModalOpen(true)}
            lang={lang}
          />
        )}

        {currentTab === 'workers' && (
          <WorkerDirectoryView
            workers={workers}
            onBookWorker={handleBookWorker}
            lang={lang}
            onBack={() => setCurrentTab('lines')}
          />
        )}

        {currentTab === 'crews' && (
          <ContractorCrewsView
            crews={crews}
            onBookCrew={handleBookCrew}
            lang={lang}
            onBack={() => setCurrentTab('lines')}
          />
        )}

        {currentTab === 'aiOptimizer' && (
          <AILineOptimizerView
            initialLine={aiSelectedLine}
            onDeployRecommendedTeam={handleDeployRecommendedTeam}
            lang={lang}
            onBack={() => setCurrentTab('lines')}
          />
        )}

        {currentTab === 'calculator' && (
          <CostCalculatorView
            onBack={() => setCurrentTab('lines')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-6 px-4 sm:px-6 lg:px-8 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">StitchGrid</span>
            <span>— Garment Manufacturing Skilled Workforce & Peak Crunch Dispatch Network</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Tiruppur • Surat • Bengaluru • NCR • Dhaka</span>
            <span>Zero-Downtime Apparel Production</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SOSCrunchModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        productionLines={lines}
        onDispatchCreated={(newBooking) => {
          setActiveDispatches(prev => [newBooking, ...prev]);
          showToast(`🚨 SOS Dispatch broadcasted! ${newBooking.workerCount} operators confirmed.`);
        }}
      />

      <WorkerRegistrationModal
        isOpen={isWorkerRegisterModalOpen}
        onClose={() => setIsWorkerRegisterModalOpen(false)}
        onRegisterWorker={handleRegisterWorker}
        lang={lang}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-neutral-900 border border-amber-500/40 text-white shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold">{toastMessage}</div>
        </div>
      )}
    </div>
  );
}
