import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  Phone, 
  Volume2, 
  VolumeX, 
  Send, 
  Layers, 
  Zap, 
  Scissors, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Package, 
  Users,
  Award,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { WorkerProfile, WorkerRole } from '../types';
import { ROLE_LABELS } from '../data/mockData';

interface WorkerDirectoryViewProps {
  workers: WorkerProfile[];
  onBookWorker: (worker: WorkerProfile) => void;
  lang: 'en' | 'ta' | 'hi';
  onBack?: () => void;
}

export const WorkerDirectoryView: React.FC<WorkerDirectoryViewProps> = ({
  workers,
  onBookWorker,
  lang,
  onBack,
}) => {
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('ALL');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [selectedWorkerDetail, setSelectedWorkerDetail] = useState<WorkerProfile | null>(null);

  const filteredWorkers = workers.filter((worker) => {
    // Role filter
    if (selectedRole !== 'ALL' && worker.role !== selectedRole) {
      return false;
    }
    // Availability filter
    if (availabilityFilter === 'IMMEDIATE' && worker.availability !== 'IMMEDIATE') {
      return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = worker.name.toLowerCase().includes(q);
      const matchRole = worker.roleDisplay.toLowerCase().includes(q) || worker.roleDisplayTamil.toLowerCase().includes(q);
      const matchMachines = worker.machines.some(m => m.toLowerCase().includes(q));
      const matchLocation = worker.locationCluster.toLowerCase().includes(q);
      if (!matchName && !matchRole && !matchMachines && !matchLocation) {
        return false;
      }
    }
    return true;
  });

  const handleToggleAudio = (workerId: string) => {
    if (playingAudioId === workerId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(workerId);
      // Auto stop after 5 seconds to simulate playback
      setTimeout(() => {
        setPlayingAudioId((curr) => (curr === workerId ? null : curr));
      }, 5000);
    }
  };

  const getRoleIcon = (roleKey: string) => {
    switch (roleKey) {
      case 'SEWING_OPERATOR': return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'TAILOR_MASTER': return <Scissors className="w-3.5 h-3.5 text-sky-400" />;
      case 'CUTTING_WORKER': return <Scissors className="w-3.5 h-3.5 text-emerald-400" />;
      case 'EMBROIDERY_WORKER': return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case 'IRONING_WORKER': return <Flame className="w-3.5 h-3.5 text-orange-400" />;
      case 'QUALITY_INSPECTOR': return <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />;
      case 'PACKING_WORKER': return <Package className="w-3.5 h-3.5 text-blue-400" />;
      case 'HELPER_TRIMMER': return <Users className="w-3.5 h-3.5 text-lime-400" />;
      default: return <Layers className="w-3.5 h-3.5 text-neutral-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Back Action */}
      {onBack && (
        <div>
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 hover:border-amber-500/50 transition-all active:scale-95 text-xs font-bold shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Production Lines</span>
          </button>
        </div>
      )}

      {/* Search and Filters Header */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by worker name, machine (e.g. Pegasus, Juki, Eastman), cluster..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Availability pills */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-neutral-400 font-semibold">Availability:</span>
            <button
              onClick={() => setAvailabilityFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                availabilityFilter === 'ALL' ? 'bg-neutral-800 text-white border border-neutral-700' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setAvailabilityFilter('IMMEDIATE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                availabilityFilter === 'IMMEDIATE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available Now ({workers.filter(w => w.availability === 'IMMEDIATE').length})</span>
            </button>
          </div>
        </div>

        {/* Trade Category Filter Chips */}
        <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar pt-1">
          <button
            onClick={() => setSelectedRole('ALL')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              selectedRole === 'ALL'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Trades ({workers.length})</span>
          </button>

          {Object.entries(ROLE_LABELS).filter(([k]) => k !== 'ALL').map(([roleKey, meta]) => {
            const count = workers.filter(w => w.role === roleKey).length;
            const isSelected = selectedRole === roleKey;
            return (
              <button
                key={roleKey}
                onClick={() => setSelectedRole(roleKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                {getRoleIcon(roleKey)}
                <span>{lang === 'ta' ? meta.ta : meta.en} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkers.map((worker) => {
          const isPlayingAudio = playingAudioId === worker.id;

          return (
            <div
              key={worker.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/90 hover:border-neutral-700 transition-all p-5 flex flex-col justify-between space-y-4 group"
            >
              {/* Worker Header */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={worker.avatarUrl}
                        alt={worker.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-neutral-700"
                      />
                      {worker.availability === 'IMMEDIATE' && (
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-neutral-900" title="Available Immediately" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                          {worker.name}
                        </h4>
                        <span className="flex items-center text-[11px] font-semibold text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                          {worker.rating}
                        </span>
                      </div>

                      <div className="text-xs font-medium text-neutral-300 mt-0.5">
                        {worker.roleDisplay}
                      </div>

                      <div className="text-[11px] text-amber-400/90 font-medium">
                        {worker.roleDisplayTamil}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20 whitespace-nowrap">
                    ₹{worker.dailyWage}/day
                  </span>
                </div>

                {/* Location and ETA */}
                <div className="flex items-center gap-3 text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-800/80">
                  <div className="flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                    <span className="truncate">{worker.locationCluster}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 text-emerald-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{worker.transitTimeMins}m ETA</span>
                  </div>
                </div>

                {/* Machine Skills Tags */}
                <div className="mt-3 space-y-1.5">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                    Certified Machine Models:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {worker.machines.map((machine, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-950 text-neutral-300 border border-neutral-800"
                      >
                        {machine}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Productivity Metrics: Piece rate & SAM */}
                <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase font-medium">Output Speed</span>
                    <span className="font-extrabold text-white text-xs font-mono">
                      {worker.pieceRatePerHr} pcs/hr
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase font-medium">SAM Efficiency</span>
                    <span className="font-extrabold text-emerald-400 text-xs font-mono">
                      {worker.samEfficiency}% Compliant
                    </span>
                  </div>
                </div>

                {/* Audio Bio Voice Preview */}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => handleToggleAudio(worker.id)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all ${
                      isPlayingAudio
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isPlayingAudio ? (
                        <Volume2 className="w-4 h-4 animate-pulse" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-amber-400" />
                      )}
                      <span>
                        {isPlayingAudio ? 'Listening to Worker Voice Note...' : 'Listen to Skill Voice Intro'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono">0:12</span>
                  </button>

                  {isPlayingAudio && (
                    <div className="mt-1.5 p-2 rounded-lg bg-neutral-950 border border-amber-500/30 text-[11px] text-neutral-300 italic animate-in fade-in">
                      "{worker.bioVoiceNoteText}"
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-neutral-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedWorkerDetail(worker)}
                  className="flex-1 py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
                >
                  Skill Passport
                </button>
                <button
                  type="button"
                  onClick={() => onBookWorker(worker)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 text-xs font-bold transition-all shadow-md shadow-amber-500/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Worker Skill Passport Modal */}
      {selectedWorkerDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-lg p-6 space-y-5 text-neutral-100 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedWorkerDetail.avatarUrl}
                  alt={selectedWorkerDetail.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border border-neutral-700"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedWorkerDetail.name}</h3>
                  <div className="text-xs text-amber-400 font-medium">{selectedWorkerDetail.roleDisplay}</div>
                  <div className="text-xs text-neutral-400">{selectedWorkerDetail.locationCluster}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedWorkerDetail(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Verified Apparel Skill Certifications
              </div>
              <div className="grid grid-cols-1 gap-2">
                {selectedWorkerDetail.verifiedBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs"
                  >
                    <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold text-neutral-200">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-center">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">Experience</span>
                <div className="text-sm font-bold text-white mt-0.5">{selectedWorkerDetail.experienceYears} Years</div>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">Completed Shifts</span>
                <div className="text-sm font-bold text-white mt-0.5">{selectedWorkerDetail.completedShifts} Shifts</div>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">Night Shift</span>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">
                  {selectedWorkerDetail.canDoNightShift ? 'Available' : 'Day Only'}
                </div>
              </div>
            </div>

            <div className="text-xs text-neutral-300">
              <strong>Direct Dispatch Contact:</strong> {selectedWorkerDetail.phone}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedWorkerDetail(null)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onBookWorker(selectedWorkerDetail);
                  setSelectedWorkerDetail(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow-md"
              >
                Dispatch to Factory Line
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
