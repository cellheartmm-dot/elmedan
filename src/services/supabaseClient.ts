import { createClient } from '@supabase/supabase-js';
import { Booking, TestItem, Profile, LabReport, Invoice, Expense, CrmNote, HomeCollector } from '../types';

const SUPABASE_URL = 'https://deygresqfgwyafdohani.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRleWdyZXNxZmd3eWFmZG9oYW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwODg0NjcsImV4cCI6MjAzODY2NDQ2N30.demoKey';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initial local state store populated from Supabase schema
export const initialTestCatalog: TestItem[] = [
  { id: 't-1', code: 'CBC', title_ar: 'صورة دم كاملة', title_en: 'Complete Blood Count (CBC)', category: 'أمراض الدم', price: 220, prep_instructions: 'لا يشترط الصيام', turnaround_time: '6 ساعات', normal_range: 'Hb: 12-16 g/dL, WBC: 4-11 k/uL', unit: 'متعدد', is_popular: true },
  { id: 't-2', code: 'FBS', title_ar: 'سكر صائم', title_en: 'Fasting Blood Sugar (FBS)', category: 'الكيمياء الحيوية', price: 90, prep_instructions: 'صيام 8 إلى 12 ساعة قبل سحب العينة', turnaround_time: '4 ساعات', normal_range: '70 - 99', unit: 'mg/dL', is_popular: true },
  { id: 't-3', code: 'HbA1c', title_ar: 'السكر التراكمي', title_en: 'Cumulative Sugar (HbA1c)', category: 'الكيمياء الحيوية', price: 280, prep_instructions: 'لا يشترط الصيام', turnaround_time: '12 ساعة', normal_range: '4.0 - 5.6 %', unit: '%', is_popular: true },
  { id: 't-4', code: 'LIPID', title_ar: 'ملف الدهون الشامل', title_en: 'Lipid Profile', category: 'الكيمياء الحيوية', price: 380, prep_instructions: 'صيام 12 ساعة', turnaround_time: '12 ساعة', normal_range: 'Cholesterol < 200, Triglycerides < 150', unit: 'mg/dL', is_popular: true },
  { id: 't-5', code: 'ALT-AST', title_ar: 'وظائف كبد (ALT / AST)', title_en: 'Liver Enzymes (ALT/AST)', category: 'الكيمياء الحيوية', price: 180, prep_instructions: 'صيام 6 ساعات موصى به', turnaround_time: '6 ساعات', normal_range: 'ALT: 7-56, AST: 10-40', unit: 'U/L', is_popular: false },
  { id: 't-6', code: 'KIDNEY', title_ar: 'وظائف كلى كاملة (يوريا وكرياتينين)', title_en: 'Kidney Function Panel', category: 'الكيمياء الحيوية', price: 250, prep_instructions: 'لا يشترط الصيام', turnaround_time: '6 ساعات', normal_range: 'Creatinine: 0.6-1.2, Urea: 15-45', unit: 'mg/dL', is_popular: true },
  { id: 't-7', code: 'TSH', title_ar: 'هرمون الغدة الدرقية TSH', title_en: 'Thyroid Stimulating Hormone', category: 'الهرمونات', price: 260, prep_instructions: 'سحب العينة صباحاً', turnaround_time: '24 ساعة', normal_range: '0.4 - 4.2', unit: 'uIU/mL', is_popular: true },
  { id: 't-8', code: 'VIT-D', title_ar: 'فيتامين د 25-OH', title_en: 'Vitamin D Total', category: 'الفيتامينات والدلالات', price: 550, prep_instructions: 'لا يشترط الصيام', turnaround_time: '24 ساعة', normal_range: '30 - 100', unit: 'ng/mL', is_popular: true },
  { id: 't-9', code: 'FERRITIN', title_ar: 'مخزون الحديد', title_en: 'Serum Ferritin', category: 'الفيتامينات والدلالات', price: 300, prep_instructions: 'لا يشترط الصيام', turnaround_time: '12 ساعة', normal_range: '20 - 250', unit: 'ng/mL', is_popular: false },
  { id: 't-10', code: 'URINE', title_ar: 'تحليل بول كامل', title_en: 'Complete Urine Analysis', category: 'التحاليل العامة', price: 80, prep_instructions: 'عينة بول من منتصف التبول صباحاً', turnaround_time: '2 ساعة', normal_range: 'Clear, Yellow, No pus/bacteria', unit: 'نظري', is_popular: true },
];

export const initialBookings: Booking[] = [
  {
    id: 'b-101',
    booking_number: 'ELM-2026-001',
    patient_id: 'p-1',
    patient_name: 'محمد محمود المحفوض',
    patient_phone: '01000000001',
    patient_address: 'شارع الطيران، مدينة نصر، القاهرة',
    booking_type: 'home_collection',
    status: 'completed',
    collector_id: 'col-1',
    branch_name: 'الفرع الرئيسي - الميدان',
    preferred_date: '2026-08-07',
    preferred_time: '09:00 AM - 10:00 AM',
    total_amount: 590,
    payment_status: 'paid',
    payment_method: 'cash',
    notes: 'طلب سحب عينات من المنزل - تحاليل سكر وتراكمي وفيتامين د',
    created_at: new Date().toISOString(),
    tests: [
      initialTestCatalog[1],
      initialTestCatalog[2],
      initialTestCatalog[0]
    ]
  },
  {
    id: 'b-102',
    booking_number: 'ELM-2026-002',
    patient_id: 'p-2',
    patient_name: 'سارة أحمد إبراهيم',
    patient_phone: '01100000002',
    patient_address: 'الحي الخامس، التجمع الخامس',
    booking_type: 'home_collection',
    status: 'collector_assigned',
    collector_id: 'col-2',
    branch_name: 'الفرع الرئيسي - الميدان',
    preferred_date: new Date().toISOString().split('T')[0],
    preferred_time: '11:00 AM - 12:00 PM',
    total_amount: 470,
    payment_status: 'paid',
    payment_method: 'visa',
    notes: 'تأكيد موعد الزيارة سريعا',
    created_at: new Date().toISOString(),
    tests: [
      initialTestCatalog[0],
      initialTestCatalog[5]
    ]
  },
  {
    id: 'b-103',
    booking_number: 'ELM-2026-003',
    patient_id: 'p-3',
    patient_name: 'أحمد عبده الشريف',
    patient_phone: '01200000003',
    patient_address: 'شارع النصر، المعادي',
    booking_type: 'lab_visit',
    status: 'processing',
    branch_name: 'فرع المعادي - شارع النصر',
    preferred_date: new Date().toISOString().split('T')[0],
    preferred_time: '02:00 PM - 03:00 PM',
    total_amount: 380,
    payment_status: 'paid',
    payment_method: 'cash',
    notes: 'حضور في فرع المعادي',
    created_at: new Date().toISOString(),
    tests: [
      initialTestCatalog[3]
    ]
  }
];

export const initialHomeCollectors: HomeCollector[] = [
  { id: 'col-1', name: 'أحمد محمود (تمريض)', phone: '01012345678', assigned_area: 'مدينة نصر والمصرين', active_visits: 2, status: 'available' },
  { id: 'col-2', name: 'م. حسام علي (تمريض)', phone: '01123456789', assigned_area: 'التجمع والقاهرة الجديدة', active_visits: 1, status: 'on_duty' },
  { id: 'col-3', name: 'د. منى سعيد (سحاب عينات)', phone: '01234567890', assigned_area: 'المعادي والمقطم', active_visits: 0, status: 'available' },
];

export const initialReports: LabReport[] = [
  {
    id: 'rep-1',
    booking_id: 'b-101',
    patient_id: 'p-1',
    test_name: 'تقرير السكر والدم الشامل',
    file_url: 'https://pub-r2.elmedanlab.com/reports/ELM-2026-001.pdf',
    status: 'completed',
    doctor_notes: 'النتائج ممتازة، نسبة السكر الصائم 88 mg/dL والتراكمي 5.2%. يُنصح بالحفاظ على النظام الغذائي الصحي.',
    result_values: { 'FBS (السكر الصائم)': '88 mg/dL', 'HbA1c (التراكمي)': '5.2%', 'WBC (خلايا الدم البيضاء)': '6.8 k/uL', 'Hb (الهيموجلوبين)': '14.5 g/dL' },
    uploaded_at: new Date().toISOString()
  }
];

export const initialInvoices: Invoice[] = [
  { id: 'inv-1', invoice_number: 'INV-2026-001', booking_id: 'b-101', patient_name: 'محمد محمود المحفوض', subtotal: 590, discount: 40, net_total: 550, paid_amount: 550, payment_status: 'paid', payment_method: 'cash', created_at: new Date().toISOString() },
  { id: 'inv-2', invoice_number: 'INV-2026-002', booking_id: 'b-102', patient_name: 'سارة أحمد إبراهيم', subtotal: 470, discount: 0, net_total: 470, paid_amount: 470, payment_status: 'paid', payment_method: 'visa', created_at: new Date().toISOString() },
  { id: 'inv-3', invoice_number: 'INV-2026-003', booking_id: 'b-103', patient_name: 'أحمد عبده الشريف', subtotal: 380, discount: 30, net_total: 350, paid_amount: 350, payment_status: 'paid', payment_method: 'cash', created_at: new Date().toISOString() }
];

export const initialExpenses: Expense[] = [
  { id: 'exp-1', category: 'كيماويات ومحاليل', description: 'شراء محاليل جهاز CBC وأنابيب سحب عينات CBC EDTA', amount: 4200, expense_date: '2026-08-06', created_by: 'د. أحمد صبري' },
  { id: 'exp-2', category: 'صيانة وأجهزة', description: 'صيانة دورية لجهاز الهرمونات Cobas e411', amount: 1800, expense_date: '2026-08-03', created_by: 'المهندس طارق' },
  { id: 'exp-3', category: 'نثريات ومستلزمات', description: 'أدوات معقمة وجوانتيات وسرنجات معقمة', amount: 950, expense_date: '2026-08-07', created_by: 'أستاذ محمود' }
];

export const initialCrmNotes: CrmNote[] = [
  { id: 'crm-1', patient_id: 'p-1', patient_name: 'محمد محمود المحفوض', staff_name: 'ممثلة خدمة العملاء - نهى', note_type: 'feedback', content: 'تم التواصل مع العميل للتأكد من انطباعه عن خدمة سحب العينات المنزلية. العميل أشاد جداً باحترافية وسرعة ممرض سحب العينات.', follow_up_date: '2026-08-20', status: 'closed', created_at: new Date().toISOString() },
  { id: 'crm-2', patient_id: 'p-2', patient_name: 'سارة أحمد إبراهيم', staff_name: 'ممثلة خدمة العملاء - نهى', note_type: 'call', content: 'تأكيد عنوان الزيارة المنزلية وموعد وصول السحاب الساعة 11:00 صباحاً.', follow_up_date: '2026-08-08', status: 'closed', created_at: new Date().toISOString() }
];
