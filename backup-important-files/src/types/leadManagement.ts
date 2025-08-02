export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'telecaller' | 'supervisor' | 'manager';
  status: 'available' | 'busy' | 'offline';
  currentLeads: number;
}

export interface Team {
  id: string;
  name: string;
  type: 'telecaller' | 'supervisor' | 'manager';
  members: TeamMember[];
  visaTypes: string[];
  maxLeads: number;
}

export interface Lead {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  visaType: string;
  country: string;
  status: 'new' | 'assigned' | 'contacted' | 'qualified' | 'converted' | 'lost' | 'forwarded';
  assignedTeam?: string;
  assignedMember?: string;
  assignedAt?: string;
  contactedAt?: string;
  callDuration?: number;
  notes: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  countdownStart: string;
  countdownDuration: number; // in minutes
  isOverdue: boolean;
  forwardedFrom?: string;
  forwardedTo?: string;
  forwardedAt?: string;
}

export interface LeadAssignment {
  leadId: string;
  teamId: string;
  memberId: string;
  assignedAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'forwarded';
}

export interface CallLog {
  id: string;
  leadId: string;
  memberId: string;
  callType: 'incoming' | 'outgoing';
  startTime: string;
  endTime?: string;
  duration?: number;
  status: 'initiated' | 'connected' | 'completed' | 'missed' | 'busy';
  notes?: string;
}

export interface Alert {
  id: string;
  type: 'overdue' | 'urgent' | 'assignment' | 'forward';
  leadId: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  sound?: string;
} 