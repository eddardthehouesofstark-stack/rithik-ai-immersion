import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  Flame,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ProductionLine } from '../types';

interface LineMonitorViewProps {
  lines: ProductionLine[];
  onAutoFillLine: (lineId: string) => void;
  onOpenAIOptimizerForLine: (line: ProductionLine) => void;
  openSOSModal: () => void;
  lang: 'en' | 'ta' | 'hi';
}

export const LineMonitorView: React.FC<LineMonitorViewProps> = ({
  lines,
  onAutoFillLine,
  onOpenAIOptimizerForLine,
  openSOSModal,
  lang,
}) => {
  const [filterCriticalOnly, setFilterCriticalOnly] = useState(false);

  const filteredLines = filterCriticalOnly
    ? lines.filter(l => l.efficiencyRate < 75 || l.missingRoles.some(r => r.criticality === 'CRITICAL'))
    : lines;

  const totalMissingWorkers = lines.reduce(
    (acc, line) => acc + line.missingRoles.reduce((s, r) => s + r.missingCount, 0),
    0
  );

  const totalDailyPenaltyRisk = lines.reduce(
    (acc, line) => acc + (line.efficiencyRate < 70 ? line.latePenaltyPerDay : 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Banner: Factory Production Line Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Active Export Lines</div>
            <div className="text-2xl font-extrabold text-white mt-1">{lines.length} Lines Running</div>
            <div className="text-xs text-neutral-400 mt-0.5">Knitwear, Fleece & Polo</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-red-900/40 bg-gradient-to-br from-red-950/20 to-neutral-900 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">Total Labor Shortage</div>
            <div className="text-2xl font-extrabold text-red-300 mt-1">{totalMissingWorkers} Operators Needed</div>
            <div className="text-xs text-red-400/80 mt-0.5">Causing line bottlenecks</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-amber-900/40 bg-gradient-to-br from-amber-950/20 to-neutral-900 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Daily Penalty Exposure</div>
            <div className="text-2xl font-extrabold text-amber-300 mt-1">${totalDailyPenaltyRisk.toLocaleString()} / day</div>
            <div className="text-xs text-neutral-400 mt-0.5">Air-freight / Buyer late fines</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-emerald-900/40 bg-gradient-to-br from-emerald-950/20 to-neutral-900 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">StitchGrid Standby</div>
            <div className="text-2xl font-extrabold text-emerald-300 mt-1">184 Verified</div>
            <div className="text-xs text-emerald-400/80 mt-0.5">Available in 45m radius</div>
          </div>
          <button
            onClick={openSOSModal}
            className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all active:scale-95"
          >
            Deploy
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-900/80 p-3 rounded-2xl border border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Floor Status Filter:
          </span>
          <button
            onClick={() => setFilterCriticalOnly(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              !filterCriticalOnly ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All Lines ({lines.length})
          </button>
          <button
            onClick={() => setFilterCriticalOnly(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              filterCriticalOnly ? 'bg-red-500 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Bottlenecked Lines Only ({lines.filter(l => l.efficiencyRate < 75).length})</span>
          </button>
        </div>

        <div className="text-xs text-neutral-400">
          Industrial Engineering Target: <strong className="text-emerald-400">SAM ≥ 85%</strong>
        </div>
      </div>

      {/* Production Lines Grid */}
      <div className="space-y-4">
        {filteredLines.map((line) => {
          const totalLineMissing = line.missingRoles.reduce((s, r) => s + r.missingCount, 0);
          const isSeverelyStalled = line.efficiencyRate < 65;

          return (
            <div
              key={line.id}
              className={`rounded-2xl border transition-all p-5 sm:p-6 bg-neutral-900/90 ${
                isSeverelyStalled
                  ? 'border-red-500/50 shadow-lg shadow-red-950/20'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-neutral-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-neutral-800 text-amber-400 border border-neutral-700">
                      {line.lineCode}
                    </span>
                    <span className="text-xs font-medium text-neutral-400">
                      Buyer: <strong className="text-neutral-200">{line.buyerName}</strong>
                    </span>
                    {isSeverelyStalled && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 animate-pulse">
                        STALLED BOTTLENECK
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {line.garmentType}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Fabric: {line.fabricType} | Order Size: {line.orderTotalQty.toLocaleString()} pcs
                  </p>
                </div>

                {/* Deadline & Penalty */}
                <div className="text-right space-y-1 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                  <div className="flex items-center gap-1.5 justify-end text-xs text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Shipment Deadline:</span>
                    <strong className="text-white font-mono">{line.deadlineHoursRemaining}h remaining</strong>
                  </div>
                  <div className="text-xs text-neutral-400">
                    Late Delivery Penalty: <strong className="text-red-400 font-mono">${line.latePenaltyPerDay}/day</strong>
                  </div>
                </div>
              </div>

              {/* Progress & Efficiency Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 border-b border-neutral-800">
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase font-semibold">Line Efficiency (SAM)</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`text-2xl font-black ${
                      line.efficiencyRate >= 80 ? 'text-emerald-400' : line.efficiencyRate >= 65 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {line.efficiencyRate}%
                    </div>
                    <span className="text-xs text-neutral-500 font-medium">
                      (Target: 85%)
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-neutral-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        line.efficiencyRate >= 80 ? 'bg-emerald-500' : line.efficiencyRate >= 65 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${line.efficiencyRate}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-neutral-400 uppercase font-semibold">Hourly Output Pace</div>
                  <div className="text-xl font-bold text-white mt-1">
                    {line.currentOutputPerHour} <span className="text-xs text-neutral-400 font-normal">/ {line.targetOutputPerHour} pcs/hr</span>
                  </div>
                  <div className="text-xs text-red-400 mt-1">
                    Deficit: -{line.targetOutputPerHour - line.currentOutputPerHour} pcs/hr
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-neutral-400 uppercase font-semibold">Manning Level</div>
                  <div className="text-xl font-bold text-white mt-1">
                    {line.activeWorkers} <span className="text-xs text-neutral-400 font-normal">/ {line.requiredWorkers} Operators</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    {line.requiredWorkers - line.activeWorkers} Absent / Short
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-neutral-400 uppercase font-semibold">Completed Batch</div>
                  <div className="text-xl font-bold text-white mt-1">
                    {line.producedQty.toLocaleString()} <span className="text-xs text-neutral-400 font-normal">/ {line.orderTotalQty.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    {Math.round((line.producedQty / line.orderTotalQty) * 100)}% Fulfilled
                  </div>
                </div>
              </div>

              {/* Bottleneck Identification & Shortage Callout */}
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Identified Line Choke-Point:
                    </span>
                    <span className="text-xs font-semibold text-amber-300">
                      {line.bottleneckOperation}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    Machine: {line.bottleneckMachine}
                  </span>
                </div>

                {/* Missing Roles Badges */}
                <div className="flex flex-wrap gap-2">
                  {line.missingRoles.map((roleReq, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs"
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        roleReq.criticality === 'CRITICAL' ? 'bg-red-500 animate-ping' : 'bg-amber-400'
                      }`} />
                      <span className="font-semibold text-neutral-200">{roleReq.roleName}</span>
                      <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-bold font-mono">
                        Need {roleReq.missingCount}
                      </span>
                      <span className="text-neutral-500 text-[11px] hidden sm:inline">({roleReq.machine})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800/80">
                <div className="text-xs text-neutral-400">
                  Estimated Dispatch Cost to fix line: <strong className="text-amber-400">~₹{(totalLineMissing * 650).toLocaleString()}</strong> vs <strong className="text-red-400">${line.latePenaltyPerDay} delay fine</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAIOptimizerForLine(line)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>AI SAM Line Balancer</span>
                  </button>

                  <button
                    onClick={() => onAutoFillLine(line.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-500/20"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Instant 1-Click Auto-Fill ({totalLineMissing} Workers)</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
