import React from 'react';
import { Truck, Clock, CheckCircle2, MapPin, Users } from 'lucide-react';
import { DispatchBooking } from '../types';

interface ActiveDispatchesBarProps {
  dispatches: DispatchBooking[];
  onMarkArrived: (dispatchId: string) => void;
}

export const ActiveDispatchesBar: React.FC<ActiveDispatchesBarProps> = ({
  dispatches,
  onMarkArrived,
}) => {
  if (dispatches.length === 0) return null;

  return (
    <div className="bg-neutral-900 border-b border-amber-500/30 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Active Factory In-Transit Dispatches:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {dispatches.map((disp) => (
            <div
              key={disp.id}
              className="flex items-center gap-2 px-3 py-1 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-white">{disp.workerCount} Workers</span>
              <span className="text-neutral-500">→</span>
              <span className="font-semibold text-neutral-300">{disp.lineId}</span>
              <div className="flex items-center gap-1 text-emerald-400 font-mono text-[11px] font-bold">
                <Clock className="w-3 h-3" />
                <span>{disp.status === 'ARRIVED' ? 'Arrived' : `ETA ${disp.etaMinutes}m`}</span>
              </div>
              {disp.status !== 'ARRIVED' && (
                <button
                  onClick={() => onMarkArrived(disp.id)}
                  className="ml-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-neutral-950 text-[10px] font-bold transition-colors"
                >
                  Confirm Gate Entry
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
