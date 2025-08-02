import { Lead, Team, TeamMember, LeadAssignment, CallLog, Alert } from '../types/leadManagement';
import teamsData from '../data/teams.json';

class LeadManagementService {
  private leads: Lead[] = [];
  private teams: Team[] = teamsData.teams as Team[];
  private assignments: LeadAssignment[] = [];
  private callLogs: CallLog[] = [];
  private alerts: Alert[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  // Load data from localStorage
  private loadFromLocalStorage() {
    try {
      const storedLeads = localStorage.getItem('leads');
      const storedAssignments = localStorage.getItem('leadAssignments');
      const storedCallLogs = localStorage.getItem('callLogs');
      const storedAlerts = localStorage.getItem('alerts');

      if (storedLeads) this.leads = JSON.parse(storedLeads);
      if (storedAssignments) this.assignments = JSON.parse(storedAssignments);
      if (storedCallLogs) this.callLogs = JSON.parse(storedCallLogs);
      if (storedAlerts) this.alerts = JSON.parse(storedAlerts);
    } catch (error) {
      console.error('Error loading lead management data:', error);
    }
  }

  // Save data to localStorage
  private saveToLocalStorage() {
    try {
      localStorage.setItem('leads', JSON.stringify(this.leads));
      localStorage.setItem('leadAssignments', JSON.stringify(this.assignments));
      localStorage.setItem('callLogs', JSON.stringify(this.callLogs));
      localStorage.setItem('alerts', JSON.stringify(this.alerts));
    } catch (error) {
      console.error('Error saving lead management data:', error);
    }
  }

  // Create new lead when customer connects
  async createLead(customerData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    visaType: string;
    country: string;
  }): Promise<Lead> {
    const lead: Lead = {
      id: `lead-${Date.now()}`,
      customerId: customerData.id,
      customerName: customerData.name,
      customerEmail: customerData.email,
      customerPhone: customerData.phone,
      visaType: customerData.visaType,
      country: customerData.country,
      status: 'new',
      notes: '',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      countdownStart: new Date().toISOString(),
      countdownDuration: 10, // 10 minutes default
      isOverdue: false
    };

    this.leads.push(lead);
    this.saveToLocalStorage();

    // Auto-assign lead to appropriate team
    await this.autoAssignLead(lead.id);

    // Create alert for admin
    this.createAlert({
      type: 'assignment',
      leadId: lead.id,
      message: `New lead assigned: ${customerData.name} - ${customerData.visaType}`,
      sound: 'notification.mp3'
    });

    return lead;
  }

  // Auto-assign lead based on visa type
  private async autoAssignLead(leadId: string): Promise<boolean> {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) {
      return false;
    }

    // Find appropriate team based on visa type
    const appropriateTeam = this.teams.find(team => 
      team.visaTypes.includes(lead.visaType.toLowerCase())
    );

    if (!appropriateTeam) {
      return false;
    }

    // Find available member with least leads
    const availableMembers = appropriateTeam.members.filter(member => 
      member.status === 'available' && member.currentLeads < 5
    );

    if (availableMembers.length === 0) {
      return false;
    }

    // Assign to member with least leads
    const assignedMember = availableMembers.reduce((prev, current) => 
      prev.currentLeads < current.currentLeads ? prev : current
    );

    // Update lead assignment
    lead.status = 'assigned';
    lead.assignedTeam = appropriateTeam.id;
    lead.assignedMember = assignedMember.id;
    lead.assignedAt = new Date().toISOString();
    lead.updatedAt = new Date().toISOString();

    // Update member status
    assignedMember.currentLeads++;
    assignedMember.status = 'busy';

    // Create assignment record
    const assignment: LeadAssignment = {
      leadId: lead.id,
      teamId: appropriateTeam.id,
      memberId: assignedMember.id,
      assignedAt: new Date().toISOString(),
      status: 'pending'
    };

    this.assignments.push(assignment);
    this.saveToLocalStorage();

    return true;
  }

  // Get leads for specific member
  getLeadsForMember(memberId: string): Lead[] {
    return this.leads.filter(lead => 
      lead.assignedMember === memberId && 
      ['assigned', 'contacted', 'qualified'].includes(lead.status)
    );
  }

  // Get all leads for admin
  getAllLeads(): Lead[] {
    return this.leads.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // Update lead status
  async updateLeadStatus(leadId: string, status: Lead['status'], notes?: string): Promise<boolean> {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return false;

    lead.status = status;
    lead.updatedAt = new Date().toISOString();
    if (notes) lead.notes = notes;

    if (status === 'contacted') {
      lead.contactedAt = new Date().toISOString();
    }

    this.saveToLocalStorage();
    return true;
  }

  // Call Now functionality
  async initiateCall(leadId: string, memberId: string): Promise<CallLog> {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) throw new Error('Lead not found');

    // Create call log
    const callLog: CallLog = {
      id: `call-${Date.now()}`,
      leadId: leadId,
      memberId: memberId,
      callType: 'outgoing',
      startTime: new Date().toISOString(),
      status: 'initiated'
    };

    this.callLogs.push(callLog);

    // Update lead status
    lead.status = 'contacted';
    lead.contactedAt = new Date().toISOString();
    lead.updatedAt = new Date().toISOString();

    // Pause countdown timer
    lead.countdownStart = new Date().toISOString();

    this.saveToLocalStorage();
    return callLog;
  }

  // Complete call
  async completeCall(callId: string, duration: number, notes?: string): Promise<boolean> {
    const callLog = this.callLogs.find(c => c.id === callId);
    if (!callLog) return false;

    callLog.endTime = new Date().toISOString();
    callLog.duration = duration;
    callLog.status = 'completed';
    if (notes) callLog.notes = notes;

    // Update lead
    const lead = this.leads.find(l => l.id === callLog.leadId);
    if (lead) {
      lead.callDuration = duration;
      lead.updatedAt = new Date().toISOString();
    }

    this.saveToLocalStorage();
    return true;
  }

  // Forward lead to another team member
  async forwardLead(leadId: string, fromMemberId: string, toMemberId: string): Promise<boolean> {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return false;

    // Update lead assignment
    lead.assignedMember = toMemberId;
    lead.status = 'forwarded';
    lead.forwardedFrom = fromMemberId;
    lead.forwardedTo = toMemberId;
    lead.forwardedAt = new Date().toISOString();
    lead.updatedAt = new Date().toISOString();

    // Update member lead counts
    const fromMember = this.teams.flatMap(t => t.members).find(m => m.id === fromMemberId);
    const toMember = this.teams.flatMap(t => t.members).find(m => m.id === toMemberId);

    if (fromMember) fromMember.currentLeads--;
    if (toMember) toMember.currentLeads++;

    // Create alert for new member
    this.createAlert({
      type: 'forward',
      leadId: leadId,
      message: `Lead forwarded to you: ${lead.customerName}`,
      sound: 'forward.mp3'
    });

    this.saveToLocalStorage();
    return true;
  }

  // Create alert
  private createAlert(alertData: Omit<Alert, 'id' | 'createdAt' | 'isRead'>): void {
    const alert: Alert = {
      id: `alert-${Date.now()}`,
      ...alertData,
      createdAt: new Date().toISOString(),
      isRead: false
    };

    this.alerts.push(alert);
    this.saveToLocalStorage();

    // Play sound if specified
    if (alert.sound) {
      this.playAlertSound(alert.sound);
    }
  }

  // Play alert sound
  private playAlertSound(soundFile: string): void {
    try {
      const audio = new Audio(`/sounds/${soundFile}`);
      audio.play().catch(error => {
        console.error('Error playing alert sound:', error);
      });
    } catch (error) {
      console.error('Error creating audio element:', error);
    }
  }

  // Get countdown timer for lead
  getLeadCountdown(leadId: string): { remaining: number; isOverdue: boolean } {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return { remaining: 0, isOverdue: false };

    const startTime = new Date(lead.countdownStart).getTime();
    const elapsed = (Date.now() - startTime) / (1000 * 60); // minutes
    const remaining = Math.max(0, lead.countdownDuration - elapsed);
    const isOverdue = remaining <= 0;

    // Update overdue status
    if (isOverdue && !lead.isOverdue) {
      lead.isOverdue = true;
      this.createAlert({
        type: 'overdue',
        leadId: leadId,
        message: `Lead overdue: ${lead.customerName}`,
        sound: 'overdue.mp3'
      });
      this.saveToLocalStorage();
    }

    return { remaining, isOverdue };
  }

  // Get alerts for member
  getAlertsForMember(memberId: string): Alert[] {
    return this.alerts.filter(alert => {
      const lead = this.leads.find(l => l.id === alert.leadId);
      return lead?.assignedMember === memberId && !alert.isRead;
    });
  }

  // Mark alert as read
  markAlertAsRead(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.isRead = true;
      this.saveToLocalStorage();
    }
  }

  // Get teams
  getTeams(): Team[] {
    return this.teams;
  }

  // Get team members
  getTeamMembers(): TeamMember[] {
    return this.teams.flatMap(team => team.members);
  }

  // Get user by email (for customer dashboard)
  async getUserByEmail(email: string): Promise<any> {
    // This is a mock implementation - in real app, this would query the user database
    return {
      id: 'customer-001',
      email: email,
      name: 'Test Customer',
      onboardingData: {
        visaType: 'tourist',
        country: 'Canada',
        purpose: 'Vacation',
        budgetRange: '₹5-10 Lakhs',
        fundingSource: 'Personal Savings'
      },
      progressSteps: [
        {
          title: 'Profile Creation',
          description: 'Basic information completed',
          status: 'completed',
          completedAt: new Date().toISOString()
        },
        {
          title: 'Document Collection',
          description: 'Gathering required documents',
          status: 'in-progress'
        },
        {
          title: 'Application Submission',
          description: 'Submit visa application',
          status: 'locked'
        }
      ]
    };
  }

  // Reset data (for testing)
  resetData(): void {
    this.leads = [];
    this.assignments = [];
    this.callLogs = [];
    this.alerts = [];
    this.saveToLocalStorage();
  }
}

export const leadManagementService = new LeadManagementService(); 