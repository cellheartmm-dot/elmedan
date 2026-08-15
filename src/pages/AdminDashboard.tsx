import React, { useState } from 'react';
import { 
  Users, 
  Truck, 
  FileUp, 
  PhoneCall, 
  Search, 
  Upload, 
  Calendar, 
  UserCheck,
  Droplet,
  Calculator,
  TrendingUp,
  DollarSign,
  FileText,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Clock,
  Plus,
  LogOut,
  Globe,
  Menu,
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Booking, HomeCollector, LabReport, CrmNote, Invoice, Expense } from '../types';
import { R2StorageService } from '../services/r2Storage';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardProps {
  bookings: Booking[];
  updateBookingStatus: (bookingId: string, status: any, collectorId?: string) => void;
  homeCollectors: HomeCollector[];
  reports: LabReport[];
  addNewReport: (rep: Partial<LabReport>) => void;
  crmNotes: CrmNote[];
  addCrmNote: (note: Partial<CrmNote>) => void;
  invoices: Invoice[];
  expenses: Expense[];
  addNewExpense: (exp: Partial<Expense>) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  updateBookingStatus,
  homeCollectors,
  reports,
  addNewReport,
  crmNotes,
  addCrmNote,
  invoices,
  expenses,
  addNewExpense
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Determine active tab from URL path
  const getTabFromPath = () => {
    if (location.pathname.includes('/admin/reports')) return 'reports';
    if (location.pathname.includes('/admin/collectors')) return 'collectors';
    if (location.pathname.includes('/admin/crm')) return 'crm_logs';
    if (location.pathname.includes('/admin/accounting')) return 'accounting';
    return 'bookings';
  };

  const activeTab = getTabFromPath();

  const handleTabChange = (tabId: string) => {
    setMobileSidebarOpen(false);
    if (tabId === 'bookings') navigate('/admin/bookings');
    else navigate(`/admin/${tabId}`);
  };

  const [searchTerm, setSearchTerm] = useState('');

  // Report uploader form state
  const [selectedBookingForUpload, setSelectedBookingForUpload] = useState<string>('');
  const [reportTitle, setReportTitle] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [fbsValue, setFbsValue] = useState('92 mg/dL');
  const [hba1cValue, setHba1cValue] = useState('5.4%');

  // CRM Note Form state
  const [newNotePatient, setNewNotePatient] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteType, setNewNoteType] = useState<'call' | 'follow_up' | 'complaint' | 'feedback'>('feedback');

  // Accounting Expense Form State
  const [expCategory, setExpCategory] = useState('كيماويات ومحاليل');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState('');

  // Financial Calculations
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.net_total, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const filteredBookings = bookings.filter(b => 
    b.patient_name.includes(searchTerm) || 
    b.booking_number.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.patient_phone.includes(searchTerm)
  );

  const handleUploadResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForUpload) {
      alert('اختر الحجز أولاً');
      return;
    }

    const b = bookings.find(x => x.id === selectedBookingForUpload);
    if (!b) return;

    R2StorageService.uploadReportFile({ name: `${b.booking_number}.pdf` } as File, b.booking_number);

    addNewReport({
      booking_id: b.id,
      patient_id: b.patient_id,
      test_name: reportTitle || 'تقرير التحاليل الطبية الشامل',
      file_url: 'https://pub-r2.elmedanlab.com/reports/' + b.booking_number + '.pdf',
      doctor_notes: doctorNotes || 'تمت المراجعة والاعتماد بواسطة استشاري التحاليل الطبية د. أحمد صبري.',
      result_values: {
        'Fasting Blood Sugar': fbsValue,
        'HbA1c Cumulative': hba1cValue,
        'Lab Verification': 'APPROVED'
      }
    });

    updateBookingStatus(b.id, 'completed');
    alert(`تم رفع واعتماد التقرير للحجز #${b.booking_number} بنجاح!`);
    setSelectedBookingForUpload('');
    setReportTitle('');
    setDoctorNotes('');
  };

  const handleAddCrmNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotePatient || !newNoteContent) return;

    addCrmNote({
      patient_name: newNotePatient,
      staff_name: 'ممثلة خدمة العملاء - نهى',
      note_type: newNoteType,
      content: newNoteContent,
      status: 'open'
    });

    setNewNotePatient('');
    setNewNoteContent('');
    alert('تم تسجل ملاحظة الـ CRM بنجاح!');
  };

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expDesc || !expAmount) return;

    addNewExpense({
      category: expCategory,
      description: expDesc,
      amount: parseFloat(expAmount),
      expense_date: new Date().toISOString().split('T')[0],
      created_by: 'المحاسب الرئيسي'
    });

    setExpDesc('');
    setExpAmount('');
    alert('تم تسجيل بند المصروفات بنجاح في نظام الحسابات!');
  };

  const sidebarNavItems = [
    { id: 'bookings', label: 'الحجوزات والزيارات', icon: Calendar, badge: bookings.length, color: '#e11d48' },
    { id: 'reports', label: 'رفع الاعتمادات والنتائج', icon: FileUp, badge: reports.length, color: '#059669' },
    { id: 'collectors', label: 'سحابين العينات (التمريض)', icon: Truck, badge: homeCollectors.length, color: '#0891b2' },
    { id: 'crm_logs', label: 'سجل المتابعات (CRM)', icon: PhoneCall, badge: crmNotes.length, color: '#7c3aed' },
    { id: 'accounting', label: 'الحسابات والفواتير', icon: Calculator, badge: `${totalRevenue.toLocaleString()} ج.م`, color: '#d97706' },
  ];

  const getPageTitle = () => {
    switch (activeTab) {
      case 'bookings': return 'الحجوزات والزيارات المنزلية 📅';
      case 'reports': return 'رفع واعتماد نتائج التحاليل (Cloudflare R2) 📄';
      case 'collectors': return 'طاقم تمريض سحب العينات 🚑';
      case 'crm_logs': return 'سجل المتابعات واستطلاعات الرأي (CRM) 📞';
      case 'accounting': return 'الحسابات والتقارير المالية والربحية 💰';
      default: return 'لوحة التحكم';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6fb', fontFamily: 'var(--font-tajawal)', direction: 'rtl' }}>
      
      {/* ── SIDEBAR OVERLAY FOR MOBILE ── */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', zIndex: 90 }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? 'open' : ''}`} style={{
        width: 280,
        background: '#0f172a',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: 100,
        boxShadow: '4px 0 25px rgba(0,0,0,0.15)',
        transition: 'transform 0.3s ease',
      }}>
        <style>{`
          @media(max-width:1023px) {
            .admin-sidebar { transform: translateX(100%); }
            .admin-sidebar.open { transform: translateX(0); }
            .admin-main-content { margin-inline-start: 0 !important; }
          }
          @media(min-width:1024px) {
            .admin-sidebar { transform: none !important; }
            .admin-main-content { margin-inline-start: 280px !important; }
          }
        `}</style>

        <div>
          {/* Brand Header */}
          <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: -2, background: 'conic-gradient(from 0deg, #e11d48, #f97316, #e11d48)', borderRadius: '50%', animation: 'spin 8s linear infinite', opacity: 0.7 }} />
                <img src="/logo/logo.jpeg" alt="معمل الميدان" className="logo-img-sm" style={{ position: 'relative', zIndex: 1, width: '2.5rem', height: '2.5rem' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1.15rem', color: '#fff' }}>
                  معمل <span style={{ background: 'linear-gradient(135deg, #f43f5e, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>الميدان</span>
                </div>
                <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#f43f5e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  لوحة تحكم الإدارة 🩺
                </div>
              </div>
            </div>

            <button onClick={() => setMobileSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }} className="lg-hidden">
              <X style={{ width: 20, height: 20 }} />
            </button>
          </div>

          {/* Admin User Profile Card */}
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'linear-gradient(135deg, #be123c, #e11d48)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(225,29,72,0.3)'
              }}>
                {user?.full_name ? user.full_name.charAt(0) : 'د'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: '0.88rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.full_name || 'د. المدير الطبي'}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                  مدير النظام المعتمد
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', paddingInlineStart: '0.75rem', marginBottom: '0.5rem', fontFamily: 'var(--font-cairo)' }}>
              قائمة الإدارة والتطبيقات
            </div>

            {sidebarNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.75rem 1rem', borderRadius: 'var(--radius-lg)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-cairo)', fontWeight: isActive ? 800 : 600,
                    fontSize: '0.86rem',
                    background: isActive ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                    boxShadow: isActive ? '0 4px 18px rgba(225,29,72,0.35)' : 'none',
                    transition: 'all 0.2s ease',
                    textAlign: 'right'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon style={{ width: 18, height: 18, color: isActive ? '#fff' : item.color }} />
                    <span>{item.label}</span>
                  </div>

                  <span style={{
                    fontSize: '0.7rem', fontWeight: 800,
                    padding: '0.15rem 0.5rem', borderRadius: 999,
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                    color: isActive ? '#fff' : '#94a3b8',
                    fontFamily: 'var(--font-inter)'
                  }}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Bottom Footer Actions */}
        <div style={{ padding: '1.25rem 1rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.8)', cursor: 'pointer',
              fontFamily: 'var(--font-cairo)', fontWeight: 700, fontSize: '0.82rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
          >
            <Globe style={{ width: 16, height: 16, color: '#38bdf8' }} />
            <span>العودة للموقع الرئيسي</span>
          </button>

          <button
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(244,63,94,0.3)', background: 'rgba(244,63,94,0.1)',
              color: '#fb7185', cursor: 'pointer',
              fontFamily: 'var(--font-cairo)', fontWeight: 700, fontSize: '0.82rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,63,94,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,63,94,0.1)'}
          >
            <LogOut style={{ width: 16, height: 16 }} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="admin-main-content" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header Bar inside Admin Portal */}
        <header style={{
          background: '#fff', borderBottom: '1px solid #e2e8f0',
          padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 1px 0 rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '0.5rem', cursor: 'pointer', color: '#475569', display: 'flex' }}
              className="lg-hidden"
            >
              <Menu style={{ width: 22, height: 22 }} />
            </button>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, fontFamily: 'var(--font-cairo)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>بوابة الإدارة</span>
                <ChevronRight style={{ width: 12, height: 12 }} />
                <span style={{ color: '#e11d48', fontWeight: 700 }}>{activeTab}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, color: '#0f172a', fontSize: '1.2rem', margin: 0 }}>
                {getPageTitle()}
              </h1>
            </div>
          </div>

        </header>

        {/* Body Workspace */}
        <div style={{ padding: '2rem', flex: 1 }}>

          {/* ── 1. BOOKINGS & VISITS TAB ── */}
          {activeTab === 'bookings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '1.15rem', margin: 0 }}>
                    قائمة الحجوزات والزيارات المنزلية ({filteredBookings.length})
                  </h2>
                  <div style={{ position: 'relative', width: 280 }}>
                    <input
                      type="text"
                      placeholder="بحث باسم المريض، الرقم أو الهاتف..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field"
                      style={{ paddingInlineEnd: '2.5rem', fontSize: '0.82rem' }}
                    />
                    <Search style={{ width: 16, height: 16, color: '#94a3b8', position: 'absolute', top: '50%', insetInlineEnd: '0.75rem', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>رقم الحجز</th>
                        <th>المريض</th>
                        <th>نوع الخدمة</th>
                        <th>الموعد المحدد</th>
                        <th>الفني المسؤول</th>
                        <th>الإجمالي</th>
                        <th>الحالة</th>
                        <th>الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((b) => {
                        return (
                          <tr key={b.id}>
                            <td style={{ fontWeight: 800, fontFamily: 'var(--font-cairo)', color: '#e11d48' }}>#{b.booking_number}</td>
                            <td>
                              <div style={{ fontWeight: 700, color: '#0f172a' }}>{b.patient_name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-inter)' }}>{b.patient_phone}</div>
                            </td>
                            <td>
                              <span className={`badge ${b.booking_type === 'home_collection' ? 'badge-red' : 'badge-blue'}`}>
                                {b.booking_type === 'home_collection' ? 'زيارة منزلية 🚑' : 'حضور بالفرع 🏥'}
                              </span>
                            </td>
                            <td style={{ fontSize: '0.8rem', color: '#475569' }}>
                              <div>{b.preferred_date}</div>
                              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{b.preferred_time}</div>
                            </td>
                            <td>
                              {b.booking_type === 'home_collection' ? (
                                <select
                                  value={b.collector_id || ''}
                                  onChange={(e) => updateBookingStatus(b.id, 'collector_assigned', e.target.value)}
                                  className="input-field"
                                  style={{ padding: '0.35rem 0.5rem', fontSize: '0.78rem', width: 140 }}
                                >
                                  <option value="">-- تعيين الفني --</option>
                                  {homeCollectors.map(c => (
                                    <option key={c.id} value={c.id}>{c.name} ({c.assigned_area})</option>
                                  ))}
                                </select>
                              ) : (
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>--</span>
                              )}
                            </td>
                            <td style={{ fontWeight: 800, color: '#0f172a' }}>{b.total_amount} ج.م</td>
                            <td>
                              <span className={`badge ${
                                b.status === 'completed' ? 'badge-green' :
                                b.status === 'processing' ? 'badge-purple' :
                                b.status === 'collector_assigned' ? 'badge-amber' : 'badge-slate'
                              }`}>
                                {b.status === 'completed' ? 'تمت النتيجة ✅' :
                                 b.status === 'processing' ? 'قيد التحليل 🔬' :
                                 b.status === 'collector_assigned' ? 'تم توجيه الممرض 🚑' : 'قيد الانتظار ⏳'}
                              </span>
                            </td>
                            <td>
                              <select
                                value={b.status}
                                onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                                className="input-field"
                                style={{ padding: '0.35rem 0.5rem', fontSize: '0.78rem', width: 130 }}
                              >
                                <option value="pending">انتظار</option>
                                <option value="collector_assigned">تعيين ممرض</option>
                                <option value="sample_collected">تم سحب العينة</option>
                                <option value="processing">جاري التحليل</option>
                                <option value="completed">مكتمل ومعتمد</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── 2. UPLOAD REPORTS TAB ── */}
          {activeTab === 'reports' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, color: '#0f172a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  رفع وتوثيق تقرير جديد 📤
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.5rem' }}>
                  سيتم حفظ الملف وتوثيقه بسيرفر Cloudflare R2 وإتاحته فوراً على أكونت المريض.
                </p>

                <form onSubmit={handleUploadResult} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#475569', marginBottom: '0.4rem' }}>
                      اختر الحجز المرتبط بالتقرير *
                    </label>
                    <select
                      value={selectedBookingForUpload}
                      onChange={(e) => setSelectedBookingForUpload(e.target.value)}
                      className="input-field"
                      required
                    >
                      <option value="">-- اختر طلب حجز --</option>
                      {bookings.map(b => (
                        <option key={b.id} value={b.id}>
                          #{b.booking_number} - {b.patient_name} ({b.total_amount} ج.م)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#475569', marginBottom: '0.4rem' }}>
                        عنوان التقرير
                      </label>
                      <input
                        type="text"
                        placeholder="تقرير التحاليل الطبية الشامل"
                        value={reportTitle}
                        onChange={(e) => setReportTitle(e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#475569', marginBottom: '0.4rem' }}>
                        ملف الـ PDF للنتيجة
                      </label>
                      <div style={{ border: '1.5px dashed #cbd5e1', borderRadius: 'var(--radius-md)', padding: '0.5rem', textAlign: 'center', background: '#f8fafc', fontSize: '0.8rem', color: '#64748b' }}>
                        📎 سيتم إنشاؤه وتوثيقه تلقائياً عند الاعتماد
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#475569', marginBottom: '0.4rem' }}>
                      ملاحظات الطبيب والاستشاري
                    </label>
                    <textarea
                      rows={3}
                      placeholder="ملاحظات الاستشاري حول نتائج التحليل..."
                      value={doctorNotes}
                      onChange={(e) => setDoctorNotes(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ justifySelf: 'start' }}>
                    <Upload style={{ width: 18, height: 18 }} />
                    رفع واعتماد التقرير على Cloudflare R2
                  </button>
                </form>
              </div>

              <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '1.05rem', marginBottom: '1rem' }}>
                  التقارير المرفوقة مؤخراً ({reports.length})
                </h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>الحجز</th>
                      <th>اسم التقرير</th>
                      <th>تاريخ الرفع</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map(r => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 800, color: '#e11d48' }}>#{r.booking_id}</td>
                        <td style={{ fontWeight: 700 }}>{r.test_name}</td>
                        <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{r.uploaded_at.split('T')[0]}</td>
                        <td><span className="badge badge-green">معتمد ومرفوع ✅</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── 3. COLLECTORS TAB ── */}
          {activeTab === 'collectors' && (
            <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '1.15rem', marginBottom: '1.25rem' }}>
                طاقم سحابي العينات والتمريض المنزلي 🚑
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {homeCollectors.map(c => (
                  <div key={c.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>{c.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-inter)' }}>{c.phone}</div>
                      </div>
                      <span className={`badge ${c.status === 'available' ? 'badge-green' : 'badge-amber'}`}>
                        {c.status === 'available' ? 'متاح' : 'في زيارة'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <div>المنطقة المكلف بها: <strong>{c.assigned_area}</strong></div>
                      <div>الزيارات النشطة حالياً: <strong style={{ color: '#e11d48' }}>{c.active_visits} زيارة</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── 4. CRM LOGS TAB ── */}
          {activeTab === 'crm_logs' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '1.15rem', marginBottom: '1.25rem' }}>
                  تسجيل متابعة / مكالمة مريض 📞
                </h2>
                <form onSubmit={handleAddCrmNoteSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#475569', marginBottom: '0.4rem' }}>اسم المريض</label>
                      <input type="text" placeholder="اسم المريض..." value={newNotePatient} onChange={e => setNewNotePatient(e.target.value)} className="input-field" required />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#475569', marginBottom: '0.4rem' }}>نوع المتابعة</label>
                      <select value={newNoteType} onChange={e => setNewNoteType(e.target.value as any)} className="input-field">
                        <option value="feedback">استطلاع رأي / تقييم</option>
                        <option value="call">مكالمة هاتفية</option>
                        <option value="follow_up">متابعة نتيجة</option>
                        <option value="complaint">شكوى</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#475569', marginBottom: '0.4rem' }}>تفاصيل المتابعة</label>
                    <textarea rows={3} placeholder="ملخص المكالمة أو استطلاع الرأي..." value={newNoteContent} onChange={e => setNewNoteContent(e.target.value)} className="input-field" required />
                  </div>
                  <button type="submit" className="btn-primary" style={{ justifySelf: 'start' }}>
                    <Plus style={{ width: 18, height: 18 }} /> تسجيل الملاحظة
                  </button>
                </form>
              </div>

              <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '1.05rem', marginBottom: '1rem' }}>
                  سجل المتابعات الأخير ({crmNotes.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {crmNotes.map(note => (
                    <div key={note.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-cairo)' }}>{note.patient_name}</div>
                        <span className="badge badge-purple">{note.note_type}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#475569' }}>{note.content}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.4rem' }}>بواسطة: {note.staff_name} - {note.created_at.split('T')[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── 5. ACCOUNTING & INVOICES TAB ── */}
          {activeTab === 'accounting' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Summary Financial Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div className="stat-pill">
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', fontFamily: 'var(--font-cairo)' }}>إجمالي الإيرادات</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669', fontFamily: 'var(--font-cairo)' }}>{totalRevenue.toLocaleString()} ج.م</div>
                </div>
                <div className="stat-pill">
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', fontFamily: 'var(--font-cairo)' }}>إجمالي المصروفات</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#e11d48', fontFamily: 'var(--font-cairo)' }}>{totalExpenses.toLocaleString()} ج.م</div>
                </div>
                <div className="stat-pill" style={{ border: '2px solid #bbf7d0', background: '#f0fdf4' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#065f46', fontFamily: 'var(--font-cairo)' }}>صافي الربح</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#047857', fontFamily: 'var(--font-cairo)' }}>{netProfit.toLocaleString()} ج.م</div>
                </div>
              </div>

              {/* Add Expense Form & Invoices Table */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                  <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '1.15rem', marginBottom: '1rem' }}>
                    تسجيل بند مصروفات جديد 💰
                  </h2>
                  <form onSubmit={handleAddExpenseSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.875rem', alignItems: 'end' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>البند</label>
                      <select value={expCategory} onChange={e => setExpCategory(e.target.value)} className="input-field">
                        <option value="كيماويات ومحاليل">كيماويات ومحاليل</option>
                        <option value="صيانة وأجهزة">صيانة وأجهزة</option>
                        <option value="مرتبات وحوافز">مرتبات وحوافز</option>
                        <option value="نثريات ومستلزمات">نثريات ومستلزمات</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>الوصف</label>
                      <input type="text" placeholder="مثال: شراء محاليل كيمياء..." value={expDesc} onChange={e => setExpDesc(e.target.value)} className="input-field" required />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>المبلغ (ج.م)</label>
                      <input type="number" placeholder="1000" value={expAmount} onChange={e => setExpAmount(e.target.value)} className="input-field" required />
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.25rem' }}>حفظ</button>
                  </form>
                </div>

                <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '1.05rem', marginBottom: '1rem' }}>
                    سجل الفواتير والتحصيلات ({invoices.length})
                  </h3>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>رقم الفاتورة</th>
                        <th>المريض</th>
                        <th>المبلغ الصافي</th>
                        <th>طريقة الدفع</th>
                        <th>التاريخ</th>
                        <th>الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(inv => (
                        <tr key={inv.id}>
                          <td style={{ fontWeight: 800, color: '#e11d48' }}>#{inv.invoice_number}</td>
                          <td style={{ fontWeight: 700 }}>{inv.patient_name}</td>
                          <td style={{ fontWeight: 800, color: '#059669' }}>{inv.net_total} ج.م</td>
                          <td><span className="badge badge-slate">{inv.payment_method}</span></td>
                          <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{inv.created_at.split('T')[0]}</td>
                          <td><span className="badge badge-green">مسدد بالكامل ✅</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};
