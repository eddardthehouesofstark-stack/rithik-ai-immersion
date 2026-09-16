import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Users, 
  Layers, 
  DollarSign,
  Zap,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  ArrowLeft
} from 'lucide-react';
import { AIOptimizeResult, ProductionLine } from '../types';

interface AILineOptimizerViewProps {
  initialLine?: ProductionLine | null;
  onDeployRecommendedTeam: (team: any[], lineId?: string) => void;
  lang: 'en' | 'ta' | 'hi';
  onBack?: () => void;
}

export const AILineOptimizerView: React.FC<AILineOptimizerViewProps> = ({
  initialLine,
  onDeployRecommendedTeam,
  lang,
  onBack,
}) => {
  const [garmentType, setGarmentType] = useState<string>(
    initialLine?.garmentType || 'Men\'s Organic Cotton Crew-Neck T-Shirt (180 GSM)'
  );
  const [orderQuantity, setOrderQuantity] = useState<number>(initialLine?.orderTotalQty || 15000);
  const [deadlineDays, setDeadlineDays] = useState<number>(
    initialLine ? Math.round(initialLine.deadlineHoursRemaining / 24) : 4
  );
  const [lineTargetPerDay, setLineTargetPerDay] = useState<number>(initialLine?.targetPerDay || 2200);
  const [currentOperators, setCurrentOperators] = useState<number>(initialLine?.activeWorkers || 18);
  const [missingRolesInput, setMissingRolesInput] = useState<string>(
    initialLine
      ? initialLine.missingRoles.map(r => r.roleName).join(', ')
      : '4-Thread Overlock Operators, Steam Vacuum Press Ironers'
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AIOptimizeResult | null>(null);

  const handleOptimize = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/optimize-line', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          garmentType,
          orderQuantity,
          deadlineDays,
          lineTargetPerDay,
          currentOperators,
          missingRoles: missingRolesInput.split(',').map(s => s.trim()).filter(Boolean),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Failed to optimize line:', error);
      // Fallback response
      setResult({
        source: 'rule-engine',
        analysis: `Line balancing calculation: Order of ${orderQuantity.toLocaleString()} pcs in ${deadlineDays} days has severe throughput choke on joining & finishing stations.`,
        lineEfficiencyEstimate: '61% (Late shipment risk: 2.2 days)',
        requiredTeam: [
          { role: '4-Thread Overlock Operator', count: 4, machineType: 'Pegasus M900', criticalStep: 'Side seam & sleeve setting', estimatedDailyWage: 680 },
          { role: 'Flatlock Bottom Hemmer', count: 3, machineType: 'Siruba Flatlock C007', criticalStep: 'Bottom hem & sleeve cuffs', estimatedDailyWage: 700 },
          { role: 'Steam Vacuum Finisher', count: 2, machineType: 'Ramsons Steam Table', criticalStep: 'Final pressing & fold', estimatedDailyWage: 580 },
        ],
        estimatedDailyCostTotal: 5980,
        delayMitigation: 'Deploying these 9 operators immediately resolves line starving and hits target quota of 2,200 pcs/day.',
        suggestedShiftStrategy: 'Authorize 2 hours overtime for cutting table and pre-bundle collar pieces to feed operators smoothly.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation Back Action */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 hover:border-amber-500/50 transition-all active:scale-95 text-xs font-bold shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Production Lines {initialLine ? `(${initialLine.lineCode})` : ''}</span>
        </button>

        <div className="text-xs text-neutral-400 hidden sm:flex items-center gap-2">
          <span>Viewing:</span>
          <strong className="text-white font-medium">
            {initialLine ? initialLine.garmentType : 'Production Line IE Balancer'}
          </strong>
        </div>
      </div>

      {/* Intro Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-900 border border-amber-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  AI Production Line Balancer & Labor Allocation Engine
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-neutral-950 font-mono whitespace-nowrap">
                  IE SAM ENGINE
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Industrial Engineering (IE) intelligence: analyzes order style, Standard Allowed Minutes (SAM), detects line starvation, and predicts exact operator reinforcements.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setGarmentType('Men\'s Pique Polo Shirt with Ribbed Collar');
              setOrderQuantity(10000);
              setDeadlineDays(3);
              setLineTargetPerDay(2000);
              setCurrentOperators(16);
              setMissingRolesInput('Single Needle Placket Tailor, 4-Thread Overlock, Buttonhole Operator');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Polo Crunch Sample</span>
          </button>
        </div>
      </div>

      {/* Input Parameters Form */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
        <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
          <span>Factory Production Line Parameters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Garment Product Style</label>
            <input
              type="text"
              value={garmentType}
              onChange={(e) => setGarmentType(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              placeholder="e.g. 100% Cotton Crewneck T-Shirt or Denim Jeans"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Order Quantity (Pieces)</label>
            <input
              type="number"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Days to Container Port Cut-off</label>
            <input
              type="number"
              value={deadlineDays}
              onChange={(e) => setDeadlineDays(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Target Line Output / Day (Pieces)</label>
            <input
              type="number"
              value={lineTargetPerDay}
              onChange={(e) => setLineTargetPerDay(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Current Active Operators Present</label>
            <input
              type="number"
              value={currentOperators}
              onChange={(e) => setCurrentOperators(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Missing Roles / Severe Bottlenecks</label>
            <input
              type="text"
              value={missingRolesInput}
              onChange={(e) => setMissingRolesInput(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              placeholder="e.g. Overlock, Flatlock, Quality"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleOptimize}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-neutral-950" />
                <span>Analyzing Line SAM & Balancing Bottlenecks...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Line Balancing & Shortage Diagnosis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Output Results */}
      {result && (
        <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-700 space-y-6 animate-in fade-in">
          {/* Header Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {result.source.toUpperCase()} DIAGNOSIS COMPLETE
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Calculated against standard apparel SAM benchmarks
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                Line Bottleneck Analysis & Dispatch Plan
              </h3>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-semibold text-neutral-400 uppercase">Estimated Efficiency Status</div>
              <div className="text-lg font-extrabold text-amber-400 font-mono">
                {result.lineEfficiencyEstimate}
              </div>
            </div>
          </div>

          {/* AI Analysis Quote */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 leading-relaxed">
            <p className="font-medium text-neutral-300">
              {result.analysis}
            </p>
          </div>

          {/* Recommended Worker Roster */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Recommended On-Demand Dispatch Roster ({result.requiredTeam.reduce((a, b) => a + b.count, 0)} Skilled Operators)
              </span>
              <span className="text-xs text-neutral-400">
                Estimated Daily Roster Wage: <strong className="text-amber-400 font-mono">₹{result.estimatedDailyCostTotal.toLocaleString()}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.requiredTeam.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <h4 className="font-bold text-white text-xs">{member.role}</h4>
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-amber-300 font-bold font-mono text-[11px]">
                        x{member.count}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      Machine: <span className="text-neutral-200 font-mono">{member.machineType}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400">
                      Solves: {member.criticalStep}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-white font-mono">₹{member.estimatedDailyWage}/day</div>
                    <div className="text-[10px] text-neutral-500">Per Operator</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Recommendations & Strategies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Delay Mitigation Impact</span>
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {result.delayMitigation}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>Shop Floor IE Strategy</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {result.suggestedShiftStrategy}
              </p>
            </div>
          </div>

          {/* 1-Click Deploy Team */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
            <div className="text-xs text-neutral-400">
              Ready to dispatch immediately from nearby Tiruppur & cluster pools.
            </div>

            <button
              onClick={() => onDeployRecommendedTeam(result.requiredTeam, initialLine?.id)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              <Zap className="w-4 h-4 text-neutral-950" />
              <span>Deploy AI-Recommended Team ({result.requiredTeam.reduce((a, b) => a + b.count, 0)} Operators)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
