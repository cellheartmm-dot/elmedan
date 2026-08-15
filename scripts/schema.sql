-- =========================================================
-- معمل الميدان (El-Medan Medical Laboratory) Schema Migration
-- Drops existing tables and recreates fresh structures & seed data
-- =========================================================

-- Drop existing tables if present (clean slate)
DROP TABLE IF EXISTS crm_notes CASCADE;
DROP TABLE IF EXISTS lab_reports CASCADE;
DROP TABLE IF EXISTS booking_tests CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS home_collectors CASCADE;
DROP TABLE IF EXISTS test_catalog CASCADE;
DROP TABLE IF EXISTS tests CASCADE;
DROP TABLE IF EXISTS test_categories CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS appointment_tests CASCADE;
DROP TABLE IF EXISTS test_results CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS home_sample_requests CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS lab_settings CASCADE;
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 1. PROFILES (Patients, Admins, Doctors, Reception, Collectors)
CREATE TABLE profiles (
    id TEXT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) UNIQUE,
    email VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'patient', -- 'patient', 'admin', 'doctor', 'receptionist', 'collector'
    address TEXT,
    gender VARCHAR(20) DEFAULT 'male',
    age INT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TEST CATALOG (قائمة التحاليل الطبية)
CREATE TABLE test_catalog (
    id TEXT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    prep_instructions TEXT,
    turnaround_time VARCHAR(100) DEFAULT '24 ساعة',
    normal_range TEXT,
    unit VARCHAR(50),
    is_popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. HOME COLLECTORS (فنيين وسحابين العينات المنزلية)
CREATE TABLE home_collectors (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    assigned_area VARCHAR(255) NOT NULL,
    active_visits INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'available', -- 'available', 'on_duty', 'off_duty'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. BOOKINGS (الحجوزات والزيارات المنزلية)
CREATE TABLE bookings (
    id TEXT PRIMARY KEY,
    booking_number VARCHAR(50) UNIQUE NOT NULL,
    patient_id TEXT REFERENCES profiles(id) ON DELETE SET NULL,
    patient_name VARCHAR(255) NOT NULL,
    patient_phone VARCHAR(50) NOT NULL,
    patient_address TEXT,
    booking_type VARCHAR(50) NOT NULL DEFAULT 'lab_visit', -- 'lab_visit', 'home_collection'
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'collector_assigned', 'sample_collected', 'processing', 'completed', 'cancelled'
    collector_id TEXT REFERENCES home_collectors(id) ON DELETE SET NULL,
    branch_name VARCHAR(100) DEFAULT 'الفرع الرئيسي - الميدان',
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'unpaid', -- 'unpaid', 'paid', 'partial'
    payment_method VARCHAR(50) DEFAULT 'cash', -- 'cash', 'visa', 'insurance'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. BOOKING TESTS (التحاليل المطلوبة بكل حجز)
CREATE TABLE booking_tests (
    id TEXT PRIMARY KEY,
    booking_id TEXT REFERENCES bookings(id) ON DELETE CASCADE,
    test_id TEXT REFERENCES test_catalog(id) ON DELETE CASCADE,
    test_name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

-- 6. LAB REPORTS (تقارير وتأكيد نتائج التحاليل)
CREATE TABLE lab_reports (
    id TEXT PRIMARY KEY,
    booking_id TEXT REFERENCES bookings(id) ON DELETE CASCADE,
    patient_id TEXT REFERENCES profiles(id) ON DELETE SET NULL,
    test_name VARCHAR(255) NOT NULL,
    file_url TEXT, -- Cloudflare R2 / Supabase Storage URL
    status VARCHAR(50) DEFAULT 'completed', -- 'pending', 'completed'
    doctor_notes TEXT,
    result_values JSONB, -- Dynamic key-value lab parameter results
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. INVOICES (الفواتير المالية)
CREATE TABLE invoices (
    id TEXT PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    booking_id TEXT REFERENCES bookings(id) ON DELETE SET NULL,
    patient_name VARCHAR(255) NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    discount NUMERIC(10, 2) DEFAULT 0,
    net_total NUMERIC(10, 2) NOT NULL,
    paid_amount NUMERIC(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'paid', -- 'paid', 'unpaid', 'partial'
    payment_method VARCHAR(50) DEFAULT 'cash', -- 'cash', 'visa', 'insurance'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. EXPENSES (المصروفات والتكاليف)
CREATE TABLE expenses (
    id TEXT PRIMARY KEY,
    category VARCHAR(100) NOT NULL, -- 'كيماويات ومحاليل', 'صيانة وأجهزة', 'مرتبات وحوافز', 'فواتير ومرافق', 'نثريات'
    description TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_by VARCHAR(255) DEFAULT 'المحاسب الرئيسي',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. CRM NOTES (متابعات العملاء والاتصالات)
CREATE TABLE crm_notes (
    id TEXT PRIMARY KEY,
    patient_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
    patient_name VARCHAR(255) NOT NULL,
    staff_name VARCHAR(255) NOT NULL,
    note_type VARCHAR(50) DEFAULT 'call', -- 'call', 'follow_up', 'complaint', 'feedback'
    content TEXT NOT NULL,
    follow_up_date DATE,
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- SEED DEMO DATA FOR EL-MEDAN LAB
-- =========================================================

-- Test Catalog Seed Data
INSERT INTO test_catalog (id, code, title_ar, title_en, category, price, prep_instructions, turnaround_time, normal_range, unit, is_popular) VALUES
('t-1', 'CBC', 'صورة دم كاملة', 'Complete Blood Count (CBC)', 'أمراض الدم', 220.00, 'لا يشترط الصيام', '6 ساعات', 'Hb: 12-16 g/dL, WBC: 4-11 k/uL', 'متعدد', true),
('t-2', 'FBS', 'سكر صائم', 'Fasting Blood Sugar (FBS)', 'الكيمياء الحيوية', 90.00, 'صيام 8 إلى 12 ساعة قبل سحب العينة', '4 ساعات', '70 - 99', 'mg/dL', true),
('t-3', 'HbA1c', 'السكر التراكمي', 'Cumulative Sugar (HbA1c)', 'الكيمياء الحيوية', 280.00, 'لا يشترط الصيام', '12 ساعة', '4.0 - 5.6 %', '%', true),
('t-4', 'LIPID', 'ملف الدهون الشامل', 'Lipid Profile', 'الكيمياء الحيوية', 380.00, 'صيام 12 ساعة', '12 ساعة', 'Cholesterol < 200, Triglycerides < 150', 'mg/dL', true),
('t-5', 'ALT-AST', 'وظائف كبد (ALT / AST)', 'Liver Enzymes (ALT/AST)', 'الكيمياء الحيوية', 180.00, 'صيام 6 ساعات موصى به', '6 ساعات', 'ALT: 7-56, AST: 10-40', 'U/L', false),
('t-6', 'KIDNEY', 'وظائف كلى كاملة (يوريا وكرياتينين)', 'Kidney Function Panel', 'الكيمياء الحيوية', 250.00, 'لا يشترط الصيام', '6 ساعات', 'Creatinine: 0.6-1.2, Urea: 15-45', 'mg/dL', true),
('t-7', 'TSH', 'هرمون الغدة الدرقية TSH', 'Thyroid Stimulating Hormone', 'الهرمونات', 260.00, 'سحب العينة صباحاً', '24 ساعة', '0.4 - 4.2', 'uIU/mL', true),
('t-8', 'VIT-D', 'فيتامين د 25-OH', 'Vitamin D Total', 'الفيتامينات والدلالات', 550.00, 'لا يشترط الصيام', '24 ساعة', '30 - 100', 'ng/mL', true),
('t-9', 'FERRITIN', 'مخزون الحديد', 'Serum Ferritin', 'الفيتامينات والدلالات', 300.00, 'لا يشترط الصيام', '12 ساعة', '20 - 250', 'ng/mL', false),
('t-10', 'URINE', 'تحليل بول كامل', 'Complete Urine Analysis', 'التحاليل العامة', 80.00, 'عينة بول من منتصف التبول صباحاً', '2 ساعة', 'Clear, Yellow, No pus/bacteria', 'نظري', true);

-- Home Collectors Seed Data
INSERT INTO home_collectors (id, name, phone, assigned_area, active_visits, status) VALUES
('col-1', 'أحمد محمود (تمريض)', '01012345678', 'مدينة نصر والمصرين', 2, 'available'),
('col-2', 'م. حسام علي (تمريض)', '01123456789', 'التجمع والقاهرة الجديدة', 1, 'on_duty'),
('col-3', 'د. منى سعيد (سحاب عينات)', '01234567890', 'المعادي والمقطم', 0, 'available');

-- Demo Patients Profiles
INSERT INTO profiles (id, full_name, phone, email, role, address, gender, age) VALUES
('p-1', 'محمد محمود المحفوض', '01000000001', 'm.mahfouz@elmedanlab.com', 'patient', 'شارع الطيران، مدينة نصر، القاهرة', 'male', 34),
('p-2', 'سارة أحمد إبراهيم', '01100000002', 'sara.ahmed@gmail.com', 'patient', 'الحي الخامس، التجمع الخامس', 'female', 28),
('p-3', 'أحمد عبده الشريف', '01200000003', 'ahmed.elsharif@yahoo.com', 'patient', 'شارع النصر، المعادي', 'male', 45),
('p-admin', 'مدير معمل الميدان', '01099999999', 'admin@elmedanlab.com', 'admin', 'الفرع الرئيسي - الميدان', 'male', 40);

-- Demo Bookings
INSERT INTO bookings (id, booking_number, patient_id, patient_name, patient_phone, patient_address, booking_type, status, collector_id, preferred_date, preferred_time, total_amount, payment_status, payment_method, notes) VALUES
('b-101', 'ELM-2026-001', 'p-1', 'محمد محمود المحفوض', '01000000001', 'شارع الطيران، مدينة نصر، القاهرة', 'home_collection', 'completed', 'col-1', CURRENT_DATE - INTERVAL '1 day', '09:00 AM - 10:00 AM', 590.00, 'paid', 'cash', 'طلب سحب عينات من المنزل - تحاليل سكر وتراكمي وفيتامين د'),
('b-102', 'ELM-2026-002', 'p-2', 'سارة أحمد إبراهيم', '01100000002', 'الحي الخامس، التجمع الخامس', 'home_collection', 'collector_assigned', 'col-2', CURRENT_DATE, '11:00 AM - 12:00 PM', 470.00, 'paid', 'visa', 'تأكيد موعد الزيارة سريعا'),
('b-103', 'ELM-2026-003', 'p-3', 'أحمد عبده الشريف', '01200000003', 'شارع النصر، المعادي', 'lab_visit', 'processing', NULL, CURRENT_DATE, '02:00 PM - 03:00 PM', 380.00, 'paid', 'cash', 'حضور في فرع المعادي');

-- Booking Tests Seed
INSERT INTO booking_tests (id, booking_id, test_id, test_name, price) VALUES
('bt-1', 'b-101', 't-2', 'سكر صائم', 90.00),
('bt-2', 'b-101', 't-3', 'السكر التراكمي', 280.00),
('bt-3', 'b-101', 't-1', 'صورة دم كاملة', 220.00),
('bt-4', 'b-102', 't-1', 'صورة دم كاملة', 220.00),
('bt-5', 'b-102', 't-6', 'وظائف كلى كاملة', 250.00),
('bt-6', 'b-103', 't-4', 'ملف الدهون الشامل', 380.00);

-- Demo Lab Reports
INSERT INTO lab_reports (id, booking_id, patient_id, test_name, file_url, status, doctor_notes, result_values) VALUES
('rep-1', 'b-101', 'p-1', 'تقرير السكر والدم الشامل', 'https://pub-r2.elmedanlab.com/reports/ELM-2026-001.pdf', 'completed', 'النتائج ممتازة، نسبة السكر الصائم 88 mg/dL والتراكمي 5.2%. يُنصح بالحفاظ على النظام الغذائي الصحي.', '{"FBS": "88 mg/dL", "HbA1c": "5.2%", "WBC": "6.8 k/uL", "Hb": "14.5 g/dL"}');

-- Demo Invoices
INSERT INTO invoices (id, invoice_number, booking_id, patient_name, subtotal, discount, net_total, paid_amount, payment_status, payment_method) VALUES
('inv-1', 'INV-2026-001', 'b-101', 'محمد محمود المحفوض', 590.00, 40.00, 550.00, 550.00, 'paid', 'cash'),
('inv-2', 'INV-2026-002', 'b-102', 'سارة أحمد إبراهيم', 470.00, 0.00, 470.00, 470.00, 'paid', 'visa'),
('inv-3', 'INV-2026-003', 'b-103', 'أحمد عبده الشريف', 380.00, 30.00, 350.00, 350.00, 'paid', 'cash');

-- Demo Expenses
INSERT INTO expenses (id, category, description, amount, expense_date, created_by) VALUES
('exp-1', 'كيماويات ومحاليل', 'شراء محاليل جهاز CBC وأنابيب سحب عينات CBC EDTA', 4200.00, CURRENT_DATE - INTERVAL '2 days', 'د. أحمد صبري'),
('exp-2', 'صيانة وأجهزة', 'صيانة دورية لجهاز الهرمونات Cobas e411', 1800.00, CURRENT_DATE - INTERVAL '5 days', 'المهندس طارق'),
('exp-3', 'نثريات ومستلزمات', 'أدوات معقمة وجوانتيات وسرنجات معقمة', 950.00, CURRENT_DATE - INTERVAL '1 day', 'أستاذ محمود');

-- Demo CRM Notes
INSERT INTO crm_notes (id, patient_id, patient_name, staff_name, note_type, content, follow_up_date, status) VALUES
('crm-1', 'p-1', 'محمد محمود المحفوض', 'ممثلة خدمة العملاء - نهى', 'feedback', 'تم التواصل مع العميل للتأكد من انطباعه عن خدمة سحب العينات المنزلية. العميل أشاد جداً باحترافية وسرعة ممرض سحب العينات.', CURRENT_DATE + INTERVAL '14 days', 'closed'),
('crm-2', 'p-2', 'سارة أحمد إبراهيم', 'ممثلة خدمة العملاء - نهى', 'call', 'تأكيد عنوان الزيارة المنزلية وموعد وصول السحاب الساعة 11:00 صباحاً.', CURRENT_DATE, 'closed');
