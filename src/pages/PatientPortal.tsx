import React, { useState } from 'react';
import { 
  Download, 
  Eye, 
  Clock, 
  Activity, 
  ShieldCheck, 
  X,
  Droplet,
  Search,
  Lock,
  UserCheck,
  FileCheck2,
  ArrowLeft
} from 'lucide-react';
import { Booking, LabReport } from '../types';
import { R2StorageService } from '../services/r2Storage';
import { useAuth } from '../context/AuthContext';

interface PatientPortalProps {
  bookings: Booking[];
  reports: LabReport[];
  selectedBookingForPortal?: Booking | null;
  onOpenLogin?: () => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({
  bookings,
  reports,
  selectedBookingForPortal,
  onOpenLogin
}) => {
  const { user, isLoggedIn } = useAuth();
  const [activeReportModal, setActiveReportModal] = useState<LabReport | null>(null);

  // Search by booking number or phone if not logged in
  const [manualQuery, setManualQuery] = useState('');
  const [manualResult, setManualResult] = useState<Booking | null | 'not_found'>(null);

  // Determine which bookings to show
  const patientBookings = bookings.filter(b => {
    if (isLoggedIn && user) {
      return b.patient_phone === user.phone || b.patient_id === user.id;
    }
    if (selectedBookingForPortal) {
      return b.id === selectedBookingForPortal.id;
    }
    return false;
  });

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuery.trim()) return;
    const found = bookings.find(b => 
      b.booking_number.toLowerCase() === manualQuery.trim().toLowerCase() ||
      b.patient_phone === manualQuery.trim()
    );
    setManualResult(found || 'not_found');
  };

  const handleDownloadPdf = (rep: LabReport, bNum: string, patientName: string) => {
    const pdfDataUri = R2StorageService.generatePdfReport(rep, patientName, bNum);
    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.download = `تقرير_معمل_الميدان_${bNum}.pdf`;
    link.click();
  };

  return (
    <div style={{ maxWidth: '84rem', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem) clamp(0.75rem, 3vw, 1.5rem)', fontFamily: 'var(--font-tajawal)' }}>
      
      {/* Header Banner */}
      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid #e2e8f0',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 999,
              padding: '0.3rem 0.8rem', fontSize: '0.72rem', fontWeight: 700,
              fontFamily: 'var(--font-cairo)', color: '#be123c', marginBottom: '0.5rem'
            }}>
              <ShieldCheck style={{ width: 13, height: 13, color: '#e11d48' }} />
              بوابة النتائج الحصرية الخاصة بالمرضى
            </div>
            <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', color: '#0f172a', margin: 0 }}>
              أكونت المريض ونتائج التحاليل 📑
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500, marginTop: '0.35rem', lineHeight: 1.6 }}>
              مرحباً بك عزيزي المريض. يمكنك الاطلاع على حالة فحوصاتك، تحميل تقارير PDF الرسمية المعتمدة، ومعاينة قيم التحاليل.
            </p>
          </div>

          {/* User Card or Login Prompt */}
          {isLoggedIn && user ? (
            <div style={{
              background: '#f8fafc', border: '1.5px solid #e2e8f0',
              borderRadius: 'var(--radius-xl)', padding: '0.75rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem'
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                border: '2px solid #fecdd3', color: '#e11d48',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1rem'
              }}>
                {user.full_name.charAt(0)}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{user.full_name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-inter)' }}>{user.phone}</div>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="btn-primary"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.85rem' }}
            >
              <Lock style={{ width: 15, height: 15 }} />
              تسجيل الدخول لعرض نتايجك الخاصة
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {!isLoggedIn && !selectedBookingForPortal ? (
        /* Unauthenticated View: Option to log in or enter booking number */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div style={{
            background: '#fff', borderRadius: 'var(--radius-2xl)',
            border: '1px solid #e2e8f0', padding: '3rem 2rem',
            textAlign: 'center', maxWidth: '36rem', margin: '0 auto', width: '100%',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 'var(--radius-xl)',
              background: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Lock style={{ width: 30, height: 30 }} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, color: '#0f172a', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              عرض نتايجك الطبية الخاصة 🔒
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              لحماية خصوصيتك الطبية، يُرجى تسجيل الدخول إلى أكونتك لترى نتائج تحاليلك وتقاريرك فقط، أو استعلم برقم الحجز المخصص لك.
            </p>

            <button
              onClick={onOpenLogin}
              className="btn-primary"
              style={{ width: '100%', padding: '1rem', justifyContent: 'center', marginBottom: '1.75rem', fontSize: '1rem' }}
            >
              تسجيل الدخول / حساب جديد <ArrowLeft style={{ width: 18, height: 18 }} />
            </button>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#475569', marginBottom: '0.75rem' }}>
                أو استعلم برقم الحجز مباشرة:
              </div>
              <form onSubmit={handleManualSearch} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="مثال: ELM-2026-001"
                  value={manualQuery}
                  onChange={(e) => setManualQuery(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.85rem' }}
                />
                <button type="submit" className="btn-secondary" style={{ padding: '0.75rem 1.25rem' }}>
                  بحث
                </button>
              </form>

              {manualResult === 'not_found' && (
                <div style={{ marginTop: '0.875rem', padding: '0.75rem', background: '#fff1f2', borderRadius: 'var(--radius-md)', color: '#be123c', fontSize: '0.82rem', fontWeight: 600 }}>
                  ⚠️ لم نجد حجوزات بهذا الرقم.
                </div>
              )}

              {typeof manualResult === 'object' && manualResult !== null && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fdf4', borderRadius: 'var(--radius-lg)', border: '1px solid #bbf7d0', textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#065f46', fontFamily: 'var(--font-cairo)' }}>#{manualResult.booking_number} - {manualResult.patient_name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.2rem' }}>الحالة: {manualResult.status === 'completed' ? 'النتيجة جاهزة ✅' : 'قيد التحليل ⏳'}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated View / Filtered patient results */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, color: '#0f172a', fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity style={{ width: 22, height: 22, color: '#e11d48' }} />
              نتائج تحاليلك وحجوزاتك الحالية ({patientBookings.length})
            </h2>
          </div>

          {patientBookings.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: 'var(--radius-2xl)', border: '1px solid #e2e8f0', padding: '3rem', textAlign: 'center', color: '#64748b' }}>
              📂 لا توجد تحاليل مسجلة لهذا الحساب حتى الآن. يمكنك حجز زيارة منزلية لسحب العينات.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {patientBookings.map((booking) => {
                const bReport = reports.find(r => r.booking_id === booking.id);
                return (
                  <div
                    key={booking.id}
                    style={{
                      background: '#fff',
                      borderRadius: 'var(--radius-2xl)',
                      border: '1.5px solid #e2e8f0',
                      padding: '1.5rem 1.75rem',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 'var(--radius-lg)',
                          background: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <FileCheck2 style={{ width: 22, height: 22 }} />
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, color: '#0f172a', fontSize: '1.1rem' }}>
                            حجز رقم #{booking.booking_number}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            تاريخ الطلب: {booking.created_at.split('T')[0]} · {booking.branch_name}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span className={`badge ${booking.status === 'completed' ? 'badge-green' : 'badge-amber'}`}>
                          {booking.status === 'completed' ? 'النتيجة جاهزة ومعتمدة ✅' : 'قيد التحليل بالمعمل ⏳'}
                        </span>
                        <span className="badge badge-slate">{booking.total_amount} ج.م</span>
                      </div>
                    </div>

                    {/* Tests breakdown */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#475569', marginBottom: '0.5rem' }}>
                        الفحوصات المطلوبة:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {booking.tests?.map((t, idx) => (
                          <span key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '0.3rem 0.6rem', fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>
                            🔬 {t.title_ar}
                          </span>
                        )) || <span style={{ fontSize: '0.8rem', color: '#64748b' }}>تحاليل متعدية</span>}
                      </div>
                    </div>

                    {/* Actions if result ready */}
                    {bReport ? (
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-xl)', padding: '1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#065f46', fontSize: '0.95rem' }}>
                            {bReport.test_name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#047857', marginTop: '0.2rem' }}>
                            {bReport.doctor_notes}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                          <button
                            onClick={() => setActiveReportModal(bReport)}
                            className="btn-secondary"
                            style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
                          >
                            <Eye style={{ width: 15, height: 15 }} /> معاينة التقرير
                          </button>
                          <button
                            onClick={() => handleDownloadPdf(bReport, booking.booking_number, booking.patient_name)}
                            className="btn-primary"
                            style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', background: 'linear-gradient(135deg, #059669, #047857)' }}
                          >
                            <Download style={{ width: 15, height: 15 }} /> تحميل PDF معتمد
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-xl)', padding: '1rem', fontSize: '0.82rem', color: '#92400e', fontWeight: 600 }}>
                        ⏳ عينتك حالياً في مرحلة المعالجة المخبرية المعيارية. سيتم إشعارك فور صدور النتيجة هنا.
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal for Report Preview */}
      {activeReportModal && (
        <div className="modal-backdrop" onClick={() => setActiveReportModal(null)}>
          <div className="modal-box" style={{ width: '100%', maxWidth: 560, padding: '2rem' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, color: '#0f172a', fontSize: '1.15rem' }}>
                معاينة تقرير التحاليل 📑
              </div>
              <button onClick={() => setActiveReportModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'var(--font-cairo)' }}>{activeReportModal.test_name}</div>
              <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>{activeReportModal.doctor_notes}</div>

              {activeReportModal.result_values && (
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '0.4rem', fontFamily: 'var(--font-cairo)' }}>النتائج القياسية:</div>
                  {Object.entries(activeReportModal.result_values).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '0.25rem 0' }}>
                      <span style={{ color: '#475569', fontWeight: 600 }}>{k}:</span>
                      <span style={{ fontWeight: 800, color: '#0f172a' }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveReportModal(null)}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
