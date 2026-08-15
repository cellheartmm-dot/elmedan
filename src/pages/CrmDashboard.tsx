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
  Droplet
} from 'lucide-react';
import { Booking, HomeCollector, LabReport, CrmNote } from '../types';
import { R2StorageService } from '../services/r2Storage';

interface CrmDashboardProps {
  bookings: Booking[];
  updateBookingStatus: (bookingId: string, status: any, collectorId?: string) => void;
  homeCollectors: HomeCollector[];
  reports: LabReport[];
  addNewReport: (rep: Partial<LabReport>) => void;
  crmNotes: CrmNote[];
  addCrmNote: (note: Partial<CrmNote>) => void;
}

export const CrmDashboard: React.FC<CrmDashboardProps> = ({
  bookings,
  updateBookingStatus,
  homeCollectors,
  reports,
  addNewReport,
  crmNotes,
  addCrmNote
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'reports' | 'collectors' | 'crm_logs'>('bookings');
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

    // Simulate Cloudflare R2 Upload
    const fakeR2Url = `${R2StorageService.uploadReportFile({ name: `${b.booking_number}.pdf` } as File, b.booking_number)}`;

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

  return (
    <div className="space-y-8 py-6">
      
      {/* Dashboard Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-4 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-red-50 text-red-700 border border-red-200 text-xs px-3 py-1 rounded-full font-bold">
              <Droplet className="w-4 h-4 text-red-600 animate-pulse" />
              <span>نظام إدارة معمل الميدان والعلاقات الطبية (CRM Portal)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-cairo">
              لوحة تحكم الأطقم الطبية والـ CRM 🩺
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              إدارة طلبات سحب العينات المنزلية، توزيع الفنيين والتمريض، رفع نتائج التحاليل لـ Cloudflare R2، ومتابعة اتصالات واستطلاعات رأي المرضى.
            </p>
          </div>

          {/* Quick Tabs Navigation */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'bookings', label: 'الحجوزات والزيارات', icon: Calendar },
              { id: 'reports', label: 'رفع الاعتمادات والنتائج', icon: FileUp },
              { id: 'collectors', label: 'سحابين العينات (التمريض)', icon: Truck },
              { id: 'crm_logs', label: 'سجل المتابعات (CRM)', icon: PhoneCall },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 space-x-reverse px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* TAB 1: BOOKINGS & HOME VISITS DISPATCHER */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-black text-slate-900 font-cairo">إدارة طلبات الحجز والزيارات المنزلية</h2>
            
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث باسم المريض أو الهاتف..."
                className="w-full glass-input px-4 py-2 rounded-xl text-xs pr-9 border border-slate-300 font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredBookings.map((b) => (
              <div key={b.id} className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-sm font-bold text-slate-900 font-mono bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                      #{b.booking_number}
                    </span>
                    <span className="text-sm font-black text-slate-900">{b.patient_name}</span>
                    <span className="text-xs text-red-600 font-mono font-bold">({b.patient_phone})</span>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      b.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      الحالة: {b.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-slate-500 block">نوع الحجز:</span>
                    <strong className="text-slate-900">{b.booking_type === 'home_collection' ? 'سحب عينة من المنزل 🚑' : 'حجز فرع 🏥'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">الموعد والتاريخ:</span>
                    <strong className="text-red-700">{b.preferred_date} ({b.preferred_time})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">العنوان والتفاصيل:</span>
                    <strong className="text-slate-800">{b.patient_address || b.branch_name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">المبلغ وطريقة الدفع:</span>
                    <strong className="text-emerald-700 font-bold">{b.total_amount} ج.م ({b.payment_method})</strong>
                  </div>
                </div>

                {/* Dispatch collector action */}
                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 space-x-reverse text-xs">
                    <span className="text-slate-700 font-bold">تحديث الفني/السحاب المسؤول:</span>
                    <select
                      value={b.collector_id || ''}
                      onChange={(e) => updateBookingStatus(b.id, 'collector_assigned', e.target.value)}
                      className="bg-slate-50 text-slate-900 text-xs p-2 rounded-lg border border-slate-300 font-bold"
                    >
                      <option value="">اختر ممرض سحب العينات...</option>
                      {homeCollectors.map(c => (
                        <option key={c.id} value={c.id}>{c.name} - ({c.assigned_area})</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-2 space-x-reverse">
                    <button
                      onClick={() => updateBookingStatus(b.id, 'sample_collected')}
                      className="bg-red-50 text-red-700 border border-red-200 text-xs px-3 py-1.5 rounded-lg hover:bg-red-100 font-bold"
                    >
                      تأكيد سحب العينة 💉
                    </button>
                    <button
                      onClick={() => updateBookingStatus(b.id, 'completed')}
                      className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-100 font-bold"
                    >
                      اعتماد واكتمال التحليل ✅
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: REPORTS UPLOADER (Cloudflare R2 Ready) */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 bg-white shadow-sm">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 font-cairo">رفع واعتماد تقارير التحاليل الطبية</h3>
                <p className="text-xs text-slate-500 font-medium">مربوط مع Cloudflare R2 Storage لإصدار التقرير للمريض فوراً</p>
              </div>
            </div>

            <form onSubmit={handleUploadResult} className="space-y-4 text-xs font-bold">
              <div>
                <label className="text-slate-700 block mb-1">اختر الحجز / المريض *</label>
                <select
                  required
                  value={selectedBookingForUpload}
                  onChange={(e) => setSelectedBookingForUpload(e.target.value)}
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-xs border border-slate-300 font-medium"
                >
                  <option value="">اختر حجز المريض المعني...</option>
                  {bookings.map(b => (
                    <option key={b.id} value={b.id}>
                      #{b.booking_number} - {b.patient_name} ({b.preferred_date})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-700 block mb-1">عنوان التقرير الطبي</label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="مثال: تقرير نتائج السكر والدم الشامل"
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-xs border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 block mb-1">قيمة السكر الصائم (FBS)</label>
                  <input
                    type="text"
                    value={fbsValue}
                    onChange={(e) => setFbsValue(e.target.value)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">السكر التراكمي (HbA1c)</label>
                  <input
                    type="text"
                    value={hba1cValue}
                    onChange={(e) => setHba1cValue(e.target.value)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1">توصية وتوقيع طبيب المعمل الاستشاري</label>
                <textarea
                  rows={3}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="ملاحظات الاستشاري الطبية على نتائج التحليل..."
                  className="w-full glass-input p-3 rounded-xl text-xs border border-slate-300 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs shadow-md"
              >
                رفع التقرير وتنبيه المريض على أكونته 🚀
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-black text-slate-900 font-cairo">آخر التقارير المعتمدة بالمعمل</h3>
            <div className="space-y-3">
              {reports.map((r) => (
                <div key={r.id} className="glass-panel p-4 rounded-2xl border border-slate-200 space-y-2 text-xs bg-white shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{r.test_name}</span>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">معتمد ✅</span>
                  </div>
                  <p className="text-slate-600 font-medium">{r.doctor_notes}</p>
                  <div className="text-[11px] text-red-600 font-mono truncate font-bold">{r.file_url}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: HOME COLLECTORS (NURSES) */}
      {activeTab === 'collectors' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black text-slate-900 font-cairo">فريق سحابين العينات المنزلية (التمريض)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeCollectors.map((col) => (
              <div key={col.id} className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-3 bg-white shadow-sm">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 font-cairo">{col.name}</h3>
                    <span className="text-xs text-slate-500 font-semibold">{col.phone}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-700 pt-2 border-t border-slate-200 font-bold">
                  <div className="flex justify-between">
                    <span>المنطقة المكلف بها:</span>
                    <strong className="text-red-700">{col.assigned_area}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>الزيارات النشطة حالياً:</span>
                    <strong className="text-amber-600 font-black">{col.active_visits} زيارات</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>حالة الممرض:</span>
                    <strong className="text-emerald-700">{col.status === 'available' ? 'متاح للزيارات 🟢' : 'في طريق الزيارة 🟡'}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CRM NOTES & CALL LOGS */}
      {activeTab === 'crm_logs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 space-y-4 bg-white shadow-sm">
            <h3 className="text-lg font-black text-slate-900 font-cairo">تسجيل مكالمة / متابعة عميل</h3>

            <form onSubmit={handleAddCrmNoteSubmit} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-700 block mb-1">اسم المريض</label>
                <input
                  type="text"
                  required
                  value={newNotePatient}
                  onChange={(e) => setNewNotePatient(e.target.value)}
                  placeholder="اسم المريض..."
                  className="w-full glass-input px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1">نوع التواصل</label>
                <select
                  value={newNoteType}
                  onChange={(e) => setNewNoteType(e.target.value as any)}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs border border-slate-300 font-medium"
                >
                  <option value="feedback">استطلاع رأي وتقييم الخدمة</option>
                  <option value="call">مكالمة متابعة هاتفية</option>
                  <option value="follow_up">تذكير بموعد تحليل دوري</option>
                  <option value="complaint">استفسار أو اقتراح</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 block mb-1">تفاصيل المكالمة والـ CRM</label>
                <textarea
                  rows={3}
                  required
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="ملخص كلام المريض..."
                  className="w-full glass-input p-3 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl shadow-md"
              >
                حفظ في سجل الـ CRM 📝
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-black text-slate-900 font-cairo">سجل متابعات خدمة العملاء والـ CRM</h3>
            
            <div className="space-y-3">
              {crmNotes.map((n) => (
                <div key={n.id} className="glass-panel p-4 rounded-2xl border border-slate-200 space-y-2 text-xs bg-white shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{n.patient_name}</span>
                    <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded font-mono font-bold border border-red-100">{n.staff_name}</span>
                  </div>
                  <p className="text-slate-700 font-medium">{n.content}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
