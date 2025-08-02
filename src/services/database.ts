import usersData from '../data/users.json';

export interface DatabaseUser {
  id: string;
  email: string;
  password: string;
  name: string;
  type: 'customer' | 'staff' | 'partner' | 'admin';
  isAuthenticated: boolean;
  createdAt: string;
  onboardingData?: any;
  progressSteps?: any[];
  leadStatus?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  leadNotes?: string;
}

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  area: string;
  pincode: string;
  email: string;
  mobile: string;
  password: string;
}

class DatabaseService {
  private users: DatabaseUser[] = [];

  constructor() {
    // Try to load users from localStorage first
    try {
      const savedUsers = localStorage.getItem('visafox_users');
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        // Validate that we have valid user data
        if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
          this.users = parsedUsers;
          console.log('Database: Loaded users from localStorage');
          console.log('Database: Current users:', this.users.map(u => ({ email: u.email, type: u.type })));
        } else {
          throw new Error('Invalid user data in localStorage');
        }
      } else {
        // Fallback to static data
        this.users = usersData.users as DatabaseUser[];
        console.log('Database: Loaded users from static data');
        console.log('Database: Static users:', this.users.map(u => ({ email: u.email, type: u.type })));
        // Save static data to localStorage for future use
        this.saveUsers();
      }
    } catch (error) {
      console.error('Database: Error loading users, using static data:', error);
      this.users = usersData.users as DatabaseUser[];
      // Clear corrupted localStorage and save fresh data
      localStorage.removeItem('visafox_users');
      this.saveUsers();
    }
  }

  // Authenticate user
  async authenticateUser(email: string, password: string, userType: 'customer' | 'staff' | 'partner' | 'admin'): Promise<DatabaseUser | null> {
    console.log('Database: Authenticating user:', { email, userType });
    console.log('Database: Current users in database:', this.users.map(u => ({ email: u.email, type: u.type })));
    
    const user = this.users.find(u => 
      u.email === email && 
      u.password === password && 
      u.type === userType
    );

    if (user) {
      console.log('Database: User found:', user);
      return user;
    }

    console.log('Database: User not found');
    console.log('Database: Available users:', this.users);
    return null;
  }

  // Get user by ID
  async getUserById(id: string): Promise<DatabaseUser | null> {
    return this.users.find(u => u.id === id) || null;
  }

  // Get user by email
  async getUserByEmail(email: string): Promise<DatabaseUser | null> {
    return this.users.find(u => u.email === email) || null;
  }

  // Create new user
  async createUser(userData: Omit<DatabaseUser, 'id' | 'createdAt'>): Promise<DatabaseUser> {
    const newUser: DatabaseUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    this.users.push(newUser);
    return newUser;
  }

  // Update user
  async updateUser(id: string, updates: Partial<DatabaseUser>): Promise<DatabaseUser | null> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }

  // Get all users
  async getAllUsers(): Promise<DatabaseUser[]> {
    return this.users;
  }

  // Save user data to localStorage
  private saveUsers() {
    try {
      localStorage.setItem('visafox_users', JSON.stringify(this.users));
      console.log('Database: Users saved to localStorage');
    } catch (error) {
      console.error('Database: Error saving users:', error);
    }
  }

  // Save onboarding data for a user
  async saveOnboardingData(userId: string, onboardingData: any): Promise<boolean> {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return false;

    this.users[userIndex].onboardingData = onboardingData;
    this.saveUsers();
    return true;
  }

  // Save progress steps for a user
  async saveProgressSteps(userId: string, progressSteps: any[]): Promise<boolean> {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return false;

    this.users[userIndex].progressSteps = progressSteps;
    this.saveUsers();
    return true;
  }

  // Get user's onboarding data
  async getOnboardingData(userId: string): Promise<any | null> {
    const user = this.users.find(u => u.id === userId);
    return user?.onboardingData || null;
  }

  // Get user's progress steps
  async getProgressSteps(userId: string): Promise<any[] | null> {
    const user = this.users.find(u => u.id === userId);
    return user?.progressSteps || null;
  }

  // Reset database to static data
  async resetToStaticData(): Promise<void> {
    // Clear all localStorage data that might be corrupted
    localStorage.removeItem('visafox_users');
    localStorage.removeItem('user');
    
    // Reset to static data
    this.users = usersData.users as DatabaseUser[];
    
    // Save the static data to localStorage to ensure persistence
    try {
      localStorage.setItem('visafox_users', JSON.stringify(this.users));
      console.log('Database: Reset to static data and saved to localStorage');
      console.log('Database: Available users after reset:', this.users.map(u => ({ email: u.email, type: u.type })));
    } catch (error) {
      console.error('Database: Error saving reset data:', error);
    }
  }

  // Check if demo user exists
  async checkDemoUser(): Promise<boolean> {
    const demoUser = this.users.find(u => u.email === 'demo@example.com');
    console.log('Database: Demo user exists:', !!demoUser);
    return !!demoUser;
  }

  // Restore demo user specifically
  async restoreDemoUser(): Promise<void> {
    const demoUser = usersData.users.find(u => u.email === 'demo@example.com') as DatabaseUser;
    if (demoUser) {
      // Remove existing demo user if exists
      this.users = this.users.filter(u => u.email !== 'demo@example.com');
      // Add the demo user back
      this.users.push(demoUser);
      this.saveUsers();
      console.log('Database: Demo user restored successfully');
    } else {
      console.log('Database: Demo user not found in static data');
    }
  }

  // Get all customer leads
  async getCustomerLeads(): Promise<DatabaseUser[]> {
    const customerLeads = this.users.filter(user => user.type === 'customer');
    console.log('Database: Found customer leads:', customerLeads.length);
    return customerLeads;
  }

  // Update lead status
  async updateLeadStatus(userId: string, status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost', notes?: string): Promise<boolean> {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return false;

    this.users[userIndex] = { 
      ...this.users[userIndex], 
      leadStatus: status,
      leadNotes: notes
    };
    this.saveUsers();
    return true;
  }

  // Register new user
  async registerUser(data: RegisterUserData): Promise<boolean> {
    console.log('Database: Registering new user:', { email: data.email });
    
    try {
      // Check if email already exists
      const existingUser = this.users.find(u => u.email === data.email);
      if (existingUser) {
        console.log('Database: Email already exists');
        return false;
      }

      // Create new user with unique ID
      const newUser: DatabaseUser = {
        id: Date.now().toString(), // Use timestamp for unique ID
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        type: 'customer',
        isAuthenticated: true,
        createdAt: new Date().toISOString(),
        onboardingData: null,
        progressSteps: []
      };

      // Add to users array
      this.users.push(newUser);
      
      // Save to localStorage for persistence
      this.saveUsers();
      
      console.log('Database: User registered successfully:', newUser);
      return true;
    } catch (error) {
      console.error('Database: Error registering user:', error);
      return false;
    }
  }
}

export const databaseService = new DatabaseService(); 