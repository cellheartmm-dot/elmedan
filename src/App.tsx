import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { TestCatalog } from './pages/TestCatalog';
import { HomeSampleBooking } from './pages/HomeSampleBooking';
import { PatientPortal } from './pages/PatientPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { LoginPage } from './pages/LoginPage';

import { HormonesMarkersPage } from './pages/services/HormonesMarkersPage';
import { ComprehensiveCheckupPage } from './pages/services/ComprehensiveCheckupPage';
import { ElderlyCarePage } from './pages/services/ElderlyCarePage';
import { CorporateServicesPage } from './pages/services/CorporateServicesPage';
import { DigitalReportsPage } from './pages/services/DigitalReportsPage';

import { AuthProvider, useAuth } from './context/AuthContext';
import { 
  TestItem, 
  Booking, 
  LabReport, 
  Invoice, 
  Expense, 
  CrmNote, 
  HomeCollector 
} from './types';

import { 
  initialTestCatalog, 
  initialBookings, 
  initialReports, 
  initialInvoices, 
  initialExpenses, 
  initialCrmNotes, 
  initialHomeCollectors 
} from './services/supabaseClient';

// Helper component to dynamically set window document title based on URL path
function DocumentTitleHandler() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = 'معمل الميدان للتحاليل الطبية | El-Medan Lab';

    if (path === '/') {
      title = 'الصفحة الرئيسية | معمل الميدان للتحاليل الطبية';
    } else if (path.startsWith('/catalog')) {
      title = 'دليل التحاليل الطبية والأسعار | معمل الميدان';
    } else if (path.startsWith('/home-booking')) {
      title = 'حجز زيارة سحب عينات من المنزل | معمل الميدان';
    } else if (path.startsWith('/patient-portal')) {
      title = 'بوابة المريض ونتائج التحاليل | معمل الميدان';
    } else if (path.startsWith('/admin')) {
      if (path.includes('/reports')) {
        title = 'رفع واعتماد نتائج التحاليل | لوحة تحكم المعمل';
      } else if (path.includes('/collectors')) {
        title = 'طاقم تمريض سحب العينات | لوحة تحكم المعمل';
      } else if (path.includes('/crm')) {
        title = 'سجل متابعات واستطلاعات المرضى CRM | معمل الميدان';
      } else if (path.includes('/accounting')) {
        title = 'الحسابات والفواتير والربحية | معمل الميدان';
      } else {
        title = 'لوحة تحكم المدير والأطقم الطبية | معمل الميدان';
      }
    } else if (path.startsWith('/login')) {
      title = 'تسجيل الدخول وإنشاء حساب | معمل الميدان';
    } else if (path.startsWith('/services/hormones-markers')) {
      title = 'تحاليل الهرمونات والدلالات المبكرة | معمل الميدان';
    } else if (path.startsWith('/services/comprehensive-checkup')) {
      title = 'تحاليل الفحص الشامل والدوري | معمل الميدان';
    } else if (path.startsWith('/services/elderly-care')) {
      title = 'خدمات سحب العينات لكبار السن | معمل الميدان';
    } else if (path.startsWith('/services/corporate')) {
      title = 'فحوصات وتعاقدات الشركات | معمل الميدان';
    } else if (path.startsWith('/services/digital-reports')) {
      title = 'نتائج وتقارير التحاليل الرقمية | معمل الميدان';
    }

    document.title = title;
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function AppContent() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth();

  // Application Data States
  const [testCatalog] = useState<TestItem[]>(initialTestCatalog);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [cart, setCart] = useState<TestItem[]>([]);
  const [reports, setReports] = useState<LabReport[]>(initialReports);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [crmNotes, setCrmNotes] = useState<CrmNote[]>(initialCrmNotes);
  const [homeCollectors] = useState<HomeCollector[]>(initialHomeCollectors);

  const [selectedBookingForPortal, setSelectedBookingForPortal] = useState<Booking | null>(null);

  // Cart Management
  const addToCart = (test: TestItem) => {
    if (!cart.some(item => item.id === test.id)) {
      setCart([...cart, test]);
    }
  };

  const removeFromCart = (testId: string) => {
    setCart(cart.filter(item => item.id !== testId));
  };

  const clearCart = () => setCart([]);

  // Booking Creation Handler
  const addNewBooking = (bData: Partial<Booking>): Booking => {
    const nextNum = bookings.length + 104;
    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      booking_number: `ELM-2026-${nextNum.toString().padStart(3, '0')}`,
      patient_name: bData.patient_name || 'مريض جديد',
      patient_phone: bData.patient_phone || '01000000000',
      patient_address: bData.patient_address,
      booking_type: bData.booking_type || 'home_collection',
      status: 'pending',
      branch_name: bData.branch_name || 'الفرع الرئيسي - مدينة نصر',
      preferred_date: bData.preferred_date || new Date().toISOString().split('T')[0],
      preferred_time: bData.preferred_time || '09:00 AM - 10:00 AM',
      total_amount: bData.total_amount || 0,
      payment_status: 'paid',
      payment_method: bData.payment_method || 'cash',
      notes: bData.notes,
      created_at: new Date().toISOString(),
      tests: bData.tests || []
    };

    setBookings([newBooking, ...bookings]);

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoice_number: `INV-2026-${nextNum.toString().padStart(3, '0')}`,
      booking_id: newBooking.id,
      patient_name: newBooking.patient_name,
      subtotal: newBooking.total_amount,
      discount: 0,
      net_total: newBooking.total_amount,
      paid_amount: newBooking.total_amount,
      payment_status: 'paid',
      payment_method: newBooking.payment_method,
      created_at: new Date().toISOString()
    };
    setInvoices([newInvoice, ...invoices]);

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: any, collectorId?: string) => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status,
          collector_id: collectorId || b.collector_id
        };
      }
      return b;
    }));
  };

  const addNewReport = (rep: Partial<LabReport>) => {
    const newRep: LabReport = {
      id: `rep-${Date.now()}`,
      booking_id: rep.booking_id || '',
      patient_id: rep.patient_id,
      test_name: rep.test_name || 'تقرير التحاليل الطبية الشامل',
      file_url: rep.file_url,
      status: 'completed',
      doctor_notes: rep.doctor_notes,
      result_values: rep.result_values,
      uploaded_at: new Date().toISOString()
    };
    setReports([newRep, ...reports]);
  };

  const addNewExpense = (exp: Partial<Expense>) => {
    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      category: exp.category || 'نثريات',
      description: exp.description || 'مصروف عام',
      amount: exp.amount || 0,
      expense_date: exp.expense_date || new Date().toISOString().split('T')[0],
      created_by: exp.created_by || 'المحاسب الرئيسي'
    };
    setExpenses([newExp, ...expenses]);
  };

  const addCrmNote = (note: Partial<CrmNote>) => {
    const newNote: CrmNote = {
      id: `crm-${Date.now()}`,
      patient_name: note.patient_name || 'مريض',
      staff_name: note.staff_name || 'خدمة العملاء',
      note_type: note.note_type || 'call',
      content: note.content || '',
      status: 'open',
      created_at: new Date().toISOString()
    };
    setCrmNotes([newNote, ...crmNotes]);
  };

  const openBookingModal = () => {
    navigate('/home-booking');
  };

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <DocumentTitleHandler />
      
      <div>
        {/* Public Navbar Header — Hidden on Admin Portal */}
        {!isAdminRoute && (
          <Header 
            openBookingModal={openBookingModal}
          />
        )}

        {/* Main Content Area — Routes */}
        <main style={{ width: '100%' }}>
          <Routes>
            <Route path="/" element={
              <Home 
                setActiveTab={(tab) => navigate(`/${tab === 'home' ? '' : tab}`)}
                openBookingModal={openBookingModal}
                testCatalog={testCatalog}
                bookings={bookings}
                setSelectedBookingForPortal={setSelectedBookingForPortal}
              />
            } />

            <Route path="/catalog" element={
              <TestCatalog 
                testCatalog={testCatalog}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                openBookingModal={openBookingModal}
              />
            } />

            <Route path="/home-booking" element={
              <HomeSampleBooking 
                testCatalog={testCatalog}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                addNewBooking={addNewBooking}
                setActiveTab={(tab) => navigate(`/${tab === 'home' ? '' : tab}`)}
              />
            } />

            <Route path="/patient-portal" element={
              <PatientPortal 
                bookings={bookings}
                reports={reports}
                selectedBookingForPortal={selectedBookingForPortal}
                onOpenLogin={() => navigate('/login')}
              />
            } />

            <Route path="/admin/*" element={
              <AdminDashboard 
                bookings={bookings}
                updateBookingStatus={updateBookingStatus}
                homeCollectors={homeCollectors}
                reports={reports}
                addNewReport={addNewReport}
                crmNotes={crmNotes}
                addCrmNote={addCrmNote}
                invoices={invoices}
                expenses={expenses}
                addNewExpense={addNewExpense}
              />
            } />

            <Route path="/login" element={<LoginPage />} />

            {/* Dedicated Service Pages */}
            <Route path="/services/hormones-markers" element={<HormonesMarkersPage />} />
            <Route path="/services/comprehensive-checkup" element={<ComprehensiveCheckupPage />} />
            <Route path="/services/elderly-care" element={<ElderlyCarePage />} />
            <Route path="/services/corporate" element={<CorporateServicesPage />} />
            <Route path="/services/digital-reports" element={<DigitalReportsPage />} />
          </Routes>
        </main>
      </div>

      {/* Footer — Hidden on Admin Portal */}
      {!isAdminRoute && <Footer />}

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
