import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle2, 
  Truck, 
  Building2, 
  Trash2,
  Droplet
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TestItem, Booking } from '../types';

interface HomeSampleBookingProps {
  testCatalog: TestItem[];
  cart: TestItem[];
  addToCart: (test: TestItem) => void;
  removeFromCart: (testId: string) => void;
  clearCart: () => void;
  addNewBooking: (b: Partial<Booking>) => Booking;
  setActiveTab: (tab: string) => void;
}

export const HomeSampleBooking: React.FC<HomeSampleBookingProps> = ({
  testCatalog,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  addNewBooking,
  setActiveTab
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [bookingType, setBookingType] = useState<'home_collection' | 'lab_visit'>('home_collection');
  const [branchName, setBranchName] = useState('الفرع الرئيسي - مدينة نصر');
  const [preferredDate, setPreferredDate] = useState(new Date().toISOString().split('T')[0]);
  const [preferredTime, setPreferredTime] = useState('09:00 AM - 10:00 AM');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'visa' | 'insurance'>('cash');
  const [notes, setNotes] = useState('');

  const [selectedTestId, setSelectedTestId] = useState('');
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  const homeFee = bookingType === 'home_collection' ? 50 : 0;
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalAmount = subtotal + homeFee;

  const handleAddSelectedTest = () => {
    if (!selectedTestId) return;
    const test = testCatalog.find(t => t.id === selectedTestId);
    if (test) {
      addToCart(test);
      setSelectedTestId('');
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim() || cart.length === 0) {
      alert('يرجى ملء اسم المريض، رقم الهاتف، واختيار تحليل واحد على الأقل.');
      return;
    }

    const newB = addNewBooking({
      patient_name: patientName,
      patient_phone: patientPhone,
      patient_address: patientAddress || 'الفرع الرئيسي',
      booking_type: bookingType,
      branch_name: branchName,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      total_amount: totalAmount,
      payment_method: paymentMethod,
      notes,
      tests: [...cart]
    });

    setCreatedBooking(newB);
    clearCart();

    // Trigger celebratory confetti animation!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 py-6" style={{ fontFamily: 'var(--font-tajawal)' }}>
      
      {/* Header Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 space-x-reverse bg-red-50 text-red-700 border border-red-200 text-xs px-3.5 py-1.5 rounded-full font-bold">
          <Droplet className="w-4 h-4 text-red-600 animate-pulse" />
          <span>حجز سريع لخدمة سحب العينات المنزلية وزيارة المعمل</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-cairo">
          طلب سحب عينات من المنزل 🚑
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
          حدد مواعيد الزيارة المناسبة لك، وسيصلك طاقم تمريض معمل الميدان في موعدك المحدد تماماً مع كافة التجهيزات والتعقيم.
        </p>
      </div>

      {createdBooking ? (
        <div className="glass-panel p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-emerald-300 text-center space-y-6 animate-in zoom-in duration-300 bg-white shadow-md">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              تم تأكيد الحجز بنجاح 🎉
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-cairo">
              رقم الحجز: #{createdBooking.booking_number}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              شكراً لك عزيزي المريض <strong className="text-slate-900">{createdBooking.patient_name}</strong>. تم تسجيل طلبك وسيتواصل معك موظف الخدمة لتأكيد وصول سحاب العينات.
            </p>
          </div>

          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-right text-xs space-y-2 max-w-md mx-auto font-bold">
            <div className="flex justify-between text-slate-700">
              <span>نوع الخدمة:</span>
              <strong className="text-slate-900">{createdBooking.booking_type === 'home_collection' ? 'سحب عينات منزلية' : 'حجز بالفرع'}</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>الموعد المحدد:</span>
              <strong className="text-red-600">{createdBooking.preferred_date} ({createdBooking.preferred_time})</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>إجمالي المبلغ:</span>
              <strong className="text-emerald-700 font-black text-sm">{createdBooking.total_amount} ج.م</strong>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('patient-portal')}
              className="gradient-button text-white font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm"
            >
              الانتقال لبوابة النتائج والحساب الشخصي
            </button>
            <button
              onClick={() => setCreatedBooking(null)}
              className="bg-slate-100 text-slate-700 font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm border border-slate-300 hover:bg-slate-200"
            >
              حجز جديد
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmitBooking} className="glass-panel p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-6 sm:space-y-8 bg-white shadow-sm">
          
          {/* Step 1: Booking Type Choice */}
          <div className="space-y-3">
            <label className="text-sm font-black text-slate-900 font-cairo flex items-center space-x-2 space-x-reverse">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs">1</span>
              <span>مكان سحب العينة:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setBookingType('home_collection')}
                className={`p-5 rounded-2xl border text-right transition-all flex items-center space-x-4 space-x-reverse ${
                  bookingType === 'home_collection'
                    ? 'bg-red-50 border-red-400 text-slate-900 shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className={`p-3 rounded-xl ${bookingType === 'home_collection' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-cairo">سحب عينات من المنزل 🚑</h4>
                  <p className="text-xs text-slate-500 font-medium">يصلك تمريض المعمل بالحقيبة المعقمة (رسوم 50 ج.م)</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBookingType('lab_visit')}
                className={`p-5 rounded-2xl border text-right transition-all flex items-center space-x-4 space-x-reverse ${
                  bookingType === 'lab_visit'
                    ? 'bg-red-50 border-red-400 text-slate-900 shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className={`p-3 rounded-xl ${bookingType === 'lab_visit' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-cairo">زيارة أحد فروع معمل الميدان 🏥</h4>
                  <p className="text-xs text-slate-500 font-medium">حجز موعد مسبق بالفرع بدون انتظار</p>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Patient Info */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="text-sm font-black text-slate-900 font-cairo flex items-center space-x-2 space-x-reverse">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs">2</span>
              <span>بيانات المريض والعنوان:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-700 block mb-1 font-bold">اسم المريض ثلاثي *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="مثال: محمد محمود المحفوض"
                    className="w-full glass-input px-4 py-2.5 rounded-xl text-sm pr-10 border border-slate-300"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-bold">رقم الموبايل للتواصل *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="01000000000"
                    className="w-full glass-input px-4 py-2.5 rounded-xl text-sm pr-10 border border-slate-300"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                </div>
              </div>
            </div>

            {bookingType === 'home_collection' ? (
              <div>
                <label className="text-xs text-slate-700 block mb-1 font-bold">العنوان التفصيلي للزيارة المنزلية *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={patientAddress}
                    onChange={(e) => setPatientAddress(e.target.value)}
                    placeholder="رقم العمارة، الشارع، المنطقة، الدور، رقم الشقة..."
                    className="w-full glass-input px-4 py-2.5 rounded-xl text-sm pr-10 border border-slate-300"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs text-slate-700 block mb-1 font-bold">اختر فرع المعمل *</label>
                <select
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm border border-slate-300 font-medium"
                >
                  <option value="الفرع الرئيسي - مدينة نصر">الفرع الرئيسي - مدينة نصر (شارع الطيران)</option>
                  <option value="فرع المعادي - شارع النصر">فرع المعادي (شارع النصر)</option>
                  <option value="فرع التجمع الخامس">فرع التجمع الخامس (الحي الخامس)</option>
                </select>
              </div>
            )}
          </div>

          {/* Step 3: Preferred Date & Time */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="text-sm font-black text-slate-900 font-cairo flex items-center space-x-2 space-x-reverse">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs">3</span>
              <span>تاريخ ووقت الموعد المفضّل:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-700 block mb-1 font-bold">تاريخ الحجز</label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-bold">الفترة الزمنية</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm border border-slate-300 font-medium"
                >
                  <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM (فترة صباحية صيام)</option>
                  <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                  <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                  <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM (فترة بعد الظهر)</option>
                  <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM (فترة مسائية)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 4: Selected Tests */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-sm font-black text-slate-900 font-cairo flex items-center space-x-2 space-x-reverse">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs">4</span>
                <span>التحاليل المطلوبة بالحجز ({cart.length}):</span>
              </label>

              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="text-xs text-red-600 hover:underline font-bold"
              >
                تصفح دليل التحاليل 👈
              </button>
            </div>

            {/* Quick add dropdown */}
            <div className="flex space-x-2 space-x-reverse">
              <select
                value={selectedTestId}
                onChange={(e) => setSelectedTestId(e.target.value)}
                className="w-full glass-input px-4 py-2.5 rounded-xl text-sm border border-slate-300 font-medium"
              >
                <option value="">اختر تحليلاً لإضافته سريعا...</option>
                {testCatalog.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title_ar} ({t.code}) - {t.price} ج.م
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddSelectedTest}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 rounded-xl shrink-0 shadow-sm"
              >
                إضافة
              </button>
            </div>

            {/* Cart Items List */}
            {cart.length > 0 ? (
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{item.title_ar}</span>
                      <span className="text-slate-500 mr-2 font-medium">({item.code})</span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="font-black text-red-600">{item.price} ج.م</span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-rose-600 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 text-center rounded-2xl text-xs text-slate-500 font-medium">
                ⚠️ السلة فارغة حالياً. حدد التحاليل أعلاه أو اختر من دليل التحاليل.
              </div>
            )}
          </div>

          {/* Payment & Total */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-red-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-600 font-bold">طريقة الدفع عند الزيارة / الاستلام:</span>
                <div className="flex space-x-2 space-x-reverse pt-1">
                  {[
                    { id: 'cash', label: 'نقداً (كاش)' },
                    { id: 'visa', label: 'فيزا (POS ممتد)' },
                    { id: 'insurance', label: 'تعاقد / تأمين' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        paymentMethod === p.id
                          ? 'bg-red-600 border-red-600 text-white shadow-sm'
                          : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-left">
                <div className="text-xs text-slate-600 font-bold">إجمالي رسوم الحجز والتحاليل:</div>
                <div className="text-3xl font-black text-emerald-600 font-cairo">{totalAmount} <span className="text-sm font-normal text-slate-600">ج.م</span></div>
                {bookingType === 'home_collection' && <div className="text-[11px] text-red-600 font-bold">(شامل رسوم الزيارة المنزلية 50 ج.م)</div>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full gradient-button text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-red-500/20 active:scale-98 transition-transform"
            >
              تأكيد طلب سحب العينة والحجز الآن 🚀
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
