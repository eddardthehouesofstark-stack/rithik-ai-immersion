import React, { useState } from 'react';
import { X, CheckCircle2, UserPlus, Zap, Award } from 'lucide-react';
import { WorkerProfile, WorkerRole } from '../types';

interface WorkerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterWorker: (worker: WorkerProfile) => void;
  lang: 'en' | 'ta' | 'hi';
}

export const WorkerRegistrationModal: React.FC<WorkerRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegisterWorker,
  lang,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<WorkerRole>('SEWING_OPERATOR');
  const [experienceYears, setExperienceYears] = useState(5);
  const [machines, setMachines] = useState('Pegasus M900, Juki MO-6800');
  const [dailyWage, setDailyWage] = useState(650);
  const [pieceRatePerHr, setPieceRatePerHr] = useState(150);
  const [locationCluster, setLocationCluster] = useState('Tiruppur Netaji Apparel Park - Zone A');
  const [canDoNightShift, setCanDoNightShift] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newWorker: WorkerProfile = {
      id: `w-${Date.now()}`,
      name,
      role,
      roleDisplay: role === 'SEWING_OPERATOR' ? 'Overlock & Flatlock Operator' : 'Apparel Craftsman',
      roleDisplayTamil: 'திறன் தையல் தொழிலாளி',
      rating: 5.0,
      completedShifts: 1,
      experienceYears,
      machines: machines.split(',').map(m => m.trim()),
      pieceRatePerHr,
      samEfficiency: 95,
      dailyWage,
      hourlyRate: Math.round(dailyWage / 8),
      locationCluster,
      distanceKm: 2.1,
      availability: 'IMMEDIATE',
      languages: ['Tamil', 'Hindi'],
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      verifiedBadges: ['Newly Verified', 'SAM 95% Certified', 'Safety Certified'],
      bioVoiceNoteText: `Experienced ${role} with ${experienceYears} years in export garment factories. Immediate joining ready.`,
      phone,
      canDoNightShift,
      transitTimeMins: 20,
    };

    onRegisterWorker(newWorker);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-lg p-6 space-y-5 text-neutral-100 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Join StitchGrid Verified Roster</h3>
              <p className="text-xs text-neutral-400">
                Register as an individual skilled operator or contractor crew leader
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-xl font-bold text-white">Registration Complete!</h4>
            <p className="text-xs text-neutral-400">
              Your availability beacon is active. Nearby garment export factories can now book you for emergency peak shifts.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. S. Karthik"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Phone (WhatsApp)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98421..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Primary Trade</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as WorkerRole)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="SEWING_OPERATOR">Sewing Machine Operator</option>
                  <option value="TAILOR_MASTER">Tailor / Master</option>
                  <option value="CUTTING_WORKER">Cutting Master</option>
                  <option value="EMBROIDERY_WORKER">Embroidery Operator</option>
                  <option value="IRONING_WORKER">Steam Press Ironing</option>
                  <option value="QUALITY_INSPECTOR">Quality Inspector (AQL)</option>
                  <option value="PACKING_WORKER">Packing & Barcode</option>
                  <option value="HELPER_TRIMMER">Line Helper / Trimmer</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Years of Floor Experience</label>
                <input
                  type="number"
                  min="1"
                  max="35"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-semibold mb-1">
                Sewing / Finishing Machine Models Mastered (Comma-separated)
              </label>
              <input
                type="text"
                value={machines}
                onChange={(e) => setMachines(e.target.value)}
                placeholder="e.g. Pegasus M900, Juki DDL-9000C, Eastman Cutter"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Daily Wage Expectation (₹)</label>
                <input
                  type="number"
                  value={dailyWage}
                  onChange={(e) => setDailyWage(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Speed Output (pieces/hour)</label>
                <input
                  type="number"
                  value={pieceRatePerHr}
                  onChange={(e) => setPieceRatePerHr(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-semibold mb-1">Garment Cluster Zone</label>
              <select
                value={locationCluster}
                onChange={(e) => setLocationCluster(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Tiruppur Netaji Apparel Park - Zone A">Tiruppur Netaji Apparel Park (NAP)</option>
                <option value="Angeripalayam Garment Hub">Angeripalayam Garment Hub</option>
                <option value="Avinashi Industrial Corridor">Avinashi Industrial Corridor</option>
                <option value="Surat Ring Road Textile Market">Surat Ring Road Textile Market</option>
                <option value="Bengaluru Bommanahalli Apparel Hub">Bengaluru Bommanahalli Apparel Hub</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="nightShift"
                checked={canDoNightShift}
                onChange={(e) => setCanDoNightShift(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              <label htmlFor="nightShift" className="text-neutral-300 cursor-pointer">
                Available for Overtime / Night Rush Shifts
              </label>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-500/20"
              >
                Publish Skill Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
