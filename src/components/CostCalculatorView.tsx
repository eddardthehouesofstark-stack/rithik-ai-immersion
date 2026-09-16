import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Zap,
  Clock,
  ArrowLeft
} from 'lucide-react';

interface CostCalculatorViewProps {
  onBack?: () => void;
}

export const CostCalculatorView: React.FC<CostCalculatorViewProps> = ({ onBack }) => {
  const [orderQuantity, setOrderQuantity] = useState<number>(12000);
  const [fobPricePerPiece, setFobPricePerPiece] = useState<number>(4.5); // USD
  const [delayedPenaltyPerDay, setDelayedPenaltyPerDay] = useState<number>(1800); // USD
  const [missingWorkers, setMissingWorkers] = useState<number>(6);
  const [expectedDelayDays, setExpectedDelayDays] = useState<number>(3);
  const [workerDailyWage, setWorkerDailyWage] = useState<number>(8.5); // ~$8.50 or ~₹680

  // Calculations
  const totalOrderValue = orderQuantity * fobPricePerPiece;
  const buyerLatePenalties = delayedPenaltyPerDay * expectedDelayDays;
  const idleFactoryOverheadLoss = missingWorkers * 25 * expectedDelayDays; // idle machine & floor cost
  const totalFinancialRisk = buyerLatePenalties + idleFactoryOverheadLoss;

  const temporaryLaborCost = missingWorkers * workerDailyWage * expectedDelayDays;
  const netSavings = Math.max(0, totalFinancialRisk - temporaryLaborCost);
  const roiPercentage = temporaryLaborCost > 0 ? Math.round((netSavings / temporaryLaborCost) * 100) : 0;

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

      {/* Title */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Peak Season Labor Shortage Cost & Penalty Calculator
          </h2>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            IE FINANCIAL ROI
          </span>
        </div>
        <p className="text-xs text-neutral-400 max-w-3xl leading-relaxed">
          Quantify the hidden cost of missing operators on your shop floor. Compare the devastating cost of buyer air-freight penalties and delayed export shipments against the low cost of on-demand skilled dispatch.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders and Inputs (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Factory & Order Variables
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-neutral-300 font-medium">Export Order Quantity:</span>
                <span className="font-bold text-white font-mono">{orderQuantity.toLocaleString()} pieces</span>
              </div>
              <input
                type="range"
                min="2000"
                max="50000"
                step="1000"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-neutral-300 font-medium">FOB Price Per Garment:</span>
                <span className="font-bold text-white font-mono">${fobPricePerPiece.toFixed(2)} USD</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="18"
                step="0.5"
                value={fobPricePerPiece}
                onChange={(e) => setFobPricePerPiece(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-neutral-300 font-medium">Buyer Delay Penalty per Day:</span>
                <span className="font-bold text-red-400 font-mono">${delayedPenaltyPerDay.toLocaleString()} / day</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={delayedPenaltyPerDay}
                onChange={(e) => setDelayedPenaltyPerDay(Number(e.target.value))}
                className="w-full accent-red-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-neutral-300 font-medium">Missing Workers:</span>
                  <span className="font-bold text-amber-400 font-mono">{missingWorkers} operators</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={missingWorkers}
                  onChange={(e) => setMissingWorkers(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-neutral-300 font-medium">Expected Shipment Delay:</span>
                  <span className="font-bold text-red-400 font-mono">{expectedDelayDays} days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={expectedDelayDays}
                  onChange={(e) => setExpectedDelayDays(Number(e.target.value))}
                  className="w-full accent-red-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results & ROI Comparison (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Risk Card */}
          <div className="p-5 rounded-2xl bg-neutral-900 border border-red-500/40 bg-gradient-to-br from-red-950/30 to-neutral-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Risk: Unfilled Shortage</span>
              </span>
              <span className="text-xs text-red-400/80">Without StitchGrid</span>
            </div>

            <div>
              <div className="text-2xl font-black text-red-400 font-mono">
                ${totalFinancialRisk.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                ${buyerLatePenalties.toLocaleString()} late penalty + ${idleFactoryOverheadLoss.toLocaleString()} idle capacity loss
              </div>
            </div>
          </div>

          {/* StitchGrid Solution Card */}
          <div className="p-5 rounded-2xl bg-neutral-900 border border-amber-500/40 bg-gradient-to-br from-amber-950/20 to-neutral-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>StitchGrid Dispatch Cost</span>
              </span>
              <span className="text-xs text-emerald-400 font-semibold">100% Protected</span>
            </div>

            <div>
              <div className="text-2xl font-black text-white font-mono">
                ${temporaryLaborCost.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                {missingWorkers} certified operators for {expectedDelayDays} days (₹{Math.round(temporaryLaborCost * 83).toLocaleString()})
              </div>
            </div>
          </div>

          {/* Bottom Net Savings Summary */}
          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Net Factory Profit Protected</span>
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500 text-neutral-950">
                {roiPercentage}% ROI
              </span>
            </div>

            <div className="text-3xl font-black text-emerald-400 font-mono">
              +${netSavings.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Booking on-demand skilled operators directly pays for itself by preventing catastrophic air-freight fines and preserving buyer trust.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
