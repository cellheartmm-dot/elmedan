import React, { useState } from 'react';
import { 
  Search, 
  TestTube2, 
  Clock, 
  Info, 
  Plus, 
  ShoppingCart, 
  X, 
  AlertCircle,
  Droplet,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { TestItem } from '../types';

interface TestCatalogProps {
  testCatalog: TestItem[];
  cart: TestItem[];
  addToCart: (test: TestItem) => void;
  removeFromCart: (testId: string) => void;
  openBookingModal: () => void;
}

export const TestCatalog: React.FC<TestCatalogProps> = ({
  testCatalog,
  cart,
  addToCart,
  removeFromCart,
  openBookingModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [activePrepModal, setActivePrepModal] = useState<TestItem | null>(null);

  const categories = ['الكل', 'أمراض الدم', 'الكيمياء الحيوية', 'الهرمونات', 'الفيتامينات والدلالات', 'التحاليل العامة'];

  const filteredTests = testCatalog.filter(test => {
    const matchesCategory = selectedCategory === 'الكل' || test.category === selectedCategory;
    const matchesSearch = 
      test.title_ar.includes(searchTerm) || 
      test.title_en.toLowerCase().includes(searchTerm.toLowerCase()) || 
      test.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 py-6" style={{ fontFamily: 'var(--font-tajawal)' }}>
      
      {/* Header Banner */}
      <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-4 bg-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-red-50 text-red-700 border border-red-200 text-xs px-3.5 py-1.5 rounded-full font-bold shadow-sm">
              <Droplet className="w-4 h-4 text-red-600 animate-pulse" />
              <span>دليل معمل الميدان الرقمي للتحاليل والتعليمات الطبية</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-cairo">
              دليل الفحوصات والتحاليل الطبية 🧪
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              تصفح أكثر من 100 تحليل طبي معتمد بأحدث أجهزة الكيمياء والهرمونات. يمكنك معرفة شروط الصيام وإضافة التحاليل لحجز عينة منزلية فوراً.
            </p>
          </div>

          {/* Cart status badge */}
          {cart.length > 0 && (
            <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-red-300 flex items-center justify-between sm:justify-start space-x-3 sm:space-x-4 space-x-reverse bg-red-50/80 shadow-md">
              <div className="p-2.5 bg-red-600 text-white rounded-xl shadow-md flex-shrink-0">
                <ShoppingCart className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="text-[11px] sm:text-xs text-slate-700 font-bold">السلة: <span className="font-black text-red-600">{cart.length} تحليل</span></div>
                <div className="text-base sm:text-lg font-black text-slate-900 font-cairo">{cartTotal} ج.م</div>
              </div>
              <button
                onClick={openBookingModal}
                className="gradient-button text-white text-xs font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-md whitespace-nowrap"
              >
                تأكيد الحجز 👈
              </button>
            </div>
          )}
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-slate-200">
          
          <div className="md:col-span-5 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث باسم التحليل أو الكود (مثال: CBC, سكر)..."
              className="w-full glass-input px-4 py-3 rounded-xl text-sm font-bold pr-10 border border-slate-300"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
          </div>

          <div className="md:col-span-7 flex overflow-x-auto gap-2 items-center pb-1 no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredTests.map((test) => {
          const isInCart = cart.some(item => item.id === test.id);
          return (
            <div
              key={test.id}
              className={`glass-panel glass-panel-hover p-6 rounded-3xl border flex flex-col justify-between space-y-4 relative bg-white shadow-sm ${
                isInCart ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
              }`}
            >
              {test.is_popular && (
                <span className="absolute top-4 left-4 bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-red-200 shadow-sm">
                  شائع جداً 🔥
                </span>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-slate-100 text-red-700 px-2.5 py-1 rounded-lg border border-slate-200">
                    {test.code}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">{test.category}</span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 font-cairo">{test.title_ar}</h3>
                  <p className="text-xs text-slate-500 font-sans font-medium">{test.title_en}</p>
                </div>

                {/* Instructions pill */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5 font-medium">
                  <div className="flex items-start justify-between text-slate-700">
                    <div className="flex items-start space-x-1.5 space-x-reverse">
                      <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1"><strong className="text-slate-900 font-bold">التعليمات:</strong> {test.prep_instructions || 'لا توجد تعليمات صيام خاصة'}</span>
                    </div>

                    <button
                      onClick={() => setActivePrepModal(test)}
                      className="text-[11px] text-red-600 font-bold hover:underline shrink-0"
                    >
                      التفاصيل 💡
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1.5 border-t border-slate-200 font-semibold">
                    <span className="flex items-center space-x-1 space-x-reverse">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>مدة ظهور النتيجة: {test.turnaround_time}</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-slate-900 font-cairo">{test.price} <span className="text-xs font-normal text-slate-500">ج.م</span></div>
                </div>

                {isInCart ? (
                  <button
                    onClick={() => removeFromCart(test.id)}
                    className="bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-200 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center space-x-1.5 space-x-reverse transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>إزالة من السلة</span>
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(test)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 space-x-reverse transition-all shadow-md active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة للحجز</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {filteredTests.length === 0 && (
        <div className="glass-panel p-12 text-center rounded-3xl border border-slate-200 space-y-3 bg-white">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">لم نجد تحاليل مطابقة للبحث</h3>
          <p className="text-xs text-slate-500">جرب البحث بكلمات أخرى أو اختر فئة تحاليل مختلفة.</p>
        </div>
      )}

      {/* Single Test Prep Detail Modal */}
      {activePrepModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 bg-white shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <HelpCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-black text-slate-900 font-cairo">تعليمات تحليل: {activePrepModal.title_ar}</h3>
              </div>
              <button onClick={() => setActivePrepModal(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">اسم التحليل بالإنجليزية:</strong>
                <p className="font-sans font-bold text-red-600">{activePrepModal.title_en} ({activePrepModal.code})</p>
              </div>

              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                <strong className="text-red-700 block mb-1">شروط وتحضيرات الصيام:</strong>
                <p>{activePrepModal.prep_instructions || 'لا توجد شروط صيام خاصة لهذا التحليل.'}</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <strong className="text-emerald-800 block mb-1">توقيت صدور التقرير:</strong>
                <p>يصدر التقرير خلال {activePrepModal.turnaround_time} من سحب العينة ويمكن تحميله PDF مباشرة.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActivePrepModal(null)}
                className="bg-slate-900 text-white text-xs font-bold px-5 py-2 rounded-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
