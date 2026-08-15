export type UserRole = 'patient' | 'admin' | 'doctor' | 'receptionist' | 'collector';

export interface AuthUser {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  role: UserRole;
  address?: string;
  gender?: 'male' | 'female';
  age?: number;
}

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  role: UserRole;
  address?: string;
  gender?: 'male' | 'female';
  age?: number;
  avatar_url?: string;
  created_at?: string;
}

export interface TestItem {
  id: string;
  code: string;
  title_ar: string;
  title_en: string;
  category: string;
  price: number;
  prep_instructions?: string;
  turnaround_time?: string;
  normal_range?: string;
  unit?: string;
  is_popular?: boolean;
}

export interface HomeCollector {
  id: string;
  name: string;
  phone: string;
  assigned_area: string;
  active_visits: number;
  status: 'available' | 'on_duty' | 'off_duty';
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'collector_assigned'
  | 'sample_collected'
  | 'processing'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  booking_number: string;
  patient_id?: string;
  patient_name: string;
  patient_phone: string;
  patient_address?: string;
  booking_type: 'lab_visit' | 'home_collection';
  status: BookingStatus;
  collector_id?: string;
  branch_name: string;
  preferred_date: string;
  preferred_time: string;
  total_amount: number;
  payment_status: 'unpaid' | 'paid' | 'partial';
  payment_method: 'cash' | 'visa' | 'insurance';
  notes?: string;
  created_at: string;
  tests?: TestItem[];
}

export interface LabReport {
  id: string;
  booking_id: string;
  patient_id?: string;
  test_name: string;
  file_url?: string;
  status: 'pending' | 'completed';
  doctor_notes?: string;
  result_values?: Record<string, string>;
  uploaded_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  booking_id?: string;
  patient_name: string;
  subtotal: number;
  discount: number;
  net_total: number;
  paid_amount: number;
  payment_status: 'paid' | 'unpaid' | 'partial';
  payment_method: 'cash' | 'visa' | 'insurance';
  created_at: string;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  expense_date: string;
  created_by: string;
}

export interface CrmNote {
  id: string;
  patient_id?: string;
  patient_name: string;
  staff_name: string;
  note_type: 'call' | 'follow_up' | 'complaint' | 'feedback';
  content: string;
  follow_up_date?: string;
  status: 'open' | 'closed';
  created_at: string;
}
