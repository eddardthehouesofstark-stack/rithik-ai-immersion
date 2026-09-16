export type WorkerRole = 
  | 'SEWING_OPERATOR'
  | 'TAILOR_MASTER'
  | 'CUTTING_WORKER'
  | 'EMBROIDERY_WORKER'
  | 'IRONING_WORKER'
  | 'QUALITY_INSPECTOR'
  | 'PACKING_WORKER'
  | 'HELPER_TRIMMER';

export interface WorkerProfile {
  id: string;
  name: string;
  role: WorkerRole;
  roleDisplay: string;
  roleDisplayTamil: string;
  rating: number;
  completedShifts: number;
  experienceYears: number;
  machines: string[];
  pieceRatePerHr: number;
  samEfficiency: number; // e.g., 94%
  dailyWage: number;
  hourlyRate: number;
  locationCluster: string;
  distanceKm: number;
  availability: 'IMMEDIATE' | 'TOMORROW' | 'BOOKED';
  languages: string[];
  avatarUrl: string;
  verifiedBadges: string[];
  bioVoiceNoteText: string;
  phone: string;
  canDoNightShift: boolean;
  transitTimeMins: number;
}

export interface ProductionLine {
  id: string;
  lineCode: string;
  buyerName: string;
  garmentType: string;
  fabricType: string;
  orderTotalQty: number;
  producedQty: number;
  targetPerDay: number;
  currentOutputPerHour: number;
  targetOutputPerHour: number;
  activeWorkers: number;
  requiredWorkers: number;
  efficiencyRate: number; // e.g. 64%
  deadlineHoursRemaining: number;
  latePenaltyPerDay: number;
  bottleneckOperation: string;
  bottleneckMachine: string;
  missingRoles: {
    role: WorkerRole;
    roleName: string;
    missingCount: number;
    machine: string;
    criticality: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  }[];
}

export interface ContractorCrew {
  id: string;
  crewName: string;
  leaderName: string;
  phone: string;
  cluster: string;
  totalWorkers: number;
  breakdown: {
    role: WorkerRole;
    count: number;
  }[];
  transportReady: boolean;
  dailyRatePerTeam: number;
  status: 'AVAILABLE_NOW' | 'BOOKED' | 'DISPATCHING';
  rating: number;
  pastDeliveries: number;
}

export interface DispatchBooking {
  id: string;
  lineId: string;
  factoryName: string;
  workerCount: number;
  roles: string[];
  shiftType: 'IMMEDIATE_DAY' | 'NIGHT_CRUNCH' | '3_DAY_SPRINT';
  status: 'DISPATCHED' | 'CONFIRMED' | 'ARRIVED' | 'WORKING';
  etaMinutes: number;
  totalEstimatedCost: number;
  timestamp: string;
}

export interface AIOptimizeResult {
  source: string;
  analysis: string;
  lineEfficiencyEstimate: string;
  requiredTeam: {
    role: string;
    count: number;
    machineType: string;
    criticalStep: string;
    estimatedDailyWage: number;
  }[];
  estimatedDailyCostTotal: number;
  delayMitigation: string;
  suggestedShiftStrategy: string;
}

export type UserType = 'FACTORY_MANAGER' | 'SKILLED_WORKER' | 'LABOR_MAISTRY';

export interface AuthUser {
  id: string;
  name: string;
  emailOrPhone: string;
  userType: UserType;
  organizationOrTrade: string;
  cluster: string;
}

