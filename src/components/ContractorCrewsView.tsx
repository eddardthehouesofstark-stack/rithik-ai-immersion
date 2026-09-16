import React, { useState } from 'react';
import { 
  Truck, 
  Users, 
  Phone, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Send,
  MapPin,
  Clock,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { ContractorCrew, WorkerRole } from '../types';

interface ContractorCrewsViewProps {
  crews: ContractorCrew[];
  onBookCrew: (crew: ContractorCrew) => void;
  lang: 'en' | 'ta' | 'hi';
  onBack?: () => void;
}

export const ContractorCrewsView: React.FC<ContractorCrewsViewProps> = ({
  crews,
  onBookCrew,
  lang,
  onBack,
}) => {
  const [selectedCrew, setSelectedCrew] = useState<ContractorCrew | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const handleDispatch = (crew: ContractorCrew) => {
    onBookCrew(crew);
    setConfirmedBookingId(crew.id);
    setTimeout(() => {
      setConfirmedBookingId(null);
    }, 4000);
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

      {/* Informational Banner */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Apparel Contractor Squads & Labor Maistries
          </h2>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-neutral-800 text-amber-400 border border-neutral-700">
            BULK SQUAD DISPATCH
          </span>
        </div>
        <p className="text-xs text-neutral-400 max-w-3xl leading-relaxed">
          Need 10 to 25 skilled workers in a single shift? Book pre-assembled contractor squads managed by experienced floor Maistries. Equipped with company-managed Tempo van transport for immediate arrival at your factory gates.
        </p>
      </div>

      {/* Crews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {crews.map((crew) => {
          const isJustBooked = confirmedBookingId === crew.id;

          return (
            <div
              key={crew.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 flex flex-col justify-between space-y-5 hover:border-neutral-700 transition-all"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">{crew.crewName}</h3>
                    </div>
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                      Lead: {crew.leaderName}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      <span>{crew.cluster}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{crew.rating}</span>
                  </div>
                </div>

                {/* Squad Size & Rate */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold">Total Squad Size</span>
                    <div className="text-base font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                      <Users className="w-4 h-4 text-amber-400" />
                      <span>{crew.totalWorkers} Operators</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold">Daily Squad Rate</span>
                    <div className="text-base font-extrabold text-amber-400 mt-0.5">
                      ₹{crew.dailyRatePerTeam.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Squad Composition Breakdown */}
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                    Operator Skill Breakdown:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {crew.breakdown.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-200 border border-neutral-700/80 font-medium"
                      >
                        {item.role === 'SEWING_OPERATOR' && 'Sewing: '}
                        {item.role === 'IRONING_WORKER' && 'Ironing: '}
                        {item.role === 'TAILOR_MASTER' && 'Tailors: '}
                        {item.role === 'CUTTING_WORKER' && 'Cutting: '}
                        {item.role === 'QUALITY_INSPECTOR' && 'Quality: '}
                        {item.role === 'PACKING_WORKER' && 'Packing: '}
                        {item.role === 'HELPER_TRIMMER' && 'Helpers: '}
                        <strong className="text-amber-400 font-mono">x{item.count}</strong>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Logistics */}
                <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{crew.transportReady ? 'Tempo Van Ready' : 'Transport by Factory'}</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">
                    {crew.pastDeliveries} Peak Shifts Completed
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-neutral-800">
                {isJustBooked ? (
                  <div className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Squad Dispatched! ETA 35 Mins</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDispatch(crew)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Squad ({crew.totalWorkers} Operators)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
