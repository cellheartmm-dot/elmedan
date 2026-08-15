import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  ArrowUpRight, 
  Droplet
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Invoice, Expense } from '../types';

interface AccountingDashboardProps {
  invoices: Invoice[];
  expenses: Expense[];
  addNewExpense: (exp: Partial<Expense>) => void;
}

export const AccountingDashboard: React.FC<AccountingDashboardProps> = ({
  invoices,
  expenses,
  addNewExpense
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'expenses'>('overview');

  // Expense Form State
  const [expCategory, setExpCategory] = useState('كيماويات ومحاليل');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState('');

  // Financial Calculations
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.net_total, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  // Chart Data with Crimson & Ruby Light Mode colors
  const monthlyRevenueData = [
    { name: 'السبت', revenue: 4200, expense: 1200 },
    { name: 'الأحد', revenue: 5800, expense: 1500 },
    { name: 'الإثنين', revenue: 6400, expense: 950 },
    { name: 'الثلاثاء', revenue: 5100, expense: 1800 },
    { name: 'الأربعاء', revenue: 7200, expense: 2100 },
    { name: 'الخميس', revenue: 8900, expense: 1400 },
    { name: 'الجمعة', revenue: 3500, expense: 600 },
  ];

  const expenseBreakdownData = [
    { name: 'كيماويات ومحاليل', value: 4200, color: '#ef4444' },
    { name: 'صيانة وأجهزة', value: 1800, color: '#f97316' },
    { name: 'مرتبات وحوافز', value: 3500, color: '#a855f7' },
    { name: 'نثريات ومستلزمات', value: 950, color: '#ec4899' },
  ];

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

  return (
    <div className="space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 space-y-4 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-red-50 text-red-700 border border-red-200 text-xs px-3 py-1 rounded-full font-bold">
              <Droplet className="w-4 h-4 text-red-600 animate-pulse" />
              <span>النظام المالي وحسابات معمل الميدان</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-cairo">
              الحسابات والتقارير المالية والربحية 💰
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              متابعة الإيرادات اليومية للتحاليل، التحصيل بالفيزا والكاش، مصروفات المحاليل وصيانة الأجهزة، وصافي أرباح المعمل.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'الملخص المالي والرسوم', icon: TrendingUp },
              { id: 'invoices', label: 'سجل الفواتير والإيرادات', icon: FileText },
              { id: 'expenses', label: 'المصروفات والتكاليف', icon: DollarSign },
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

      {/* Financial Stats KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-emerald-200 space-y-2 relative overflow-hidden bg-emerald-50/50 shadow-sm">
          <span className="text-xs text-slate-600 font-bold">إجمالي الإيرادات اليومية:</span>
          <div className="text-3xl font-black text-emerald-700 font-cairo">
            {totalRevenue.toLocaleString()} <span className="text-sm font-normal text-slate-600">ج.م</span>
          </div>
          <div className="text-[11px] text-emerald-800 flex items-center space-x-1 space-x-reverse pt-1 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
            <span>+14.5% مقارنة بالأسبوع الماضي</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-rose-200 space-y-2 relative overflow-hidden bg-rose-50/50 shadow-sm">
          <span className="text-xs text-slate-600 font-bold">إجمالي المصروفات والمحاليل:</span>
          <div className="text-3xl font-black text-rose-700 font-cairo">
            {totalExpenses.toLocaleString()} <span className="text-sm font-normal text-slate-600">ج.م</span>
          </div>
          <div className="text-[11px] text-slate-500 pt-1 font-medium">شامل صيانة الأجهزة والكيماويات</div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-red-200 space-y-2 relative overflow-hidden bg-red-50/50 shadow-sm">
          <span className="text-xs text-slate-600 font-bold">صافي الأرباح النظرية:</span>
          <div className="text-3xl font-black text-red-700 font-cairo">
            {netProfit.toLocaleString()} <span className="text-sm font-normal text-slate-600">ج.م</span>
          </div>
          <div className="text-[11px] text-red-800 font-bold pt-1">هامش ربح ممتاز ✅</div>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & CHARTS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue Bar Chart */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 space-y-4 bg-white shadow-sm">
            <h3 className="text-lg font-black text-slate-900 font-cairo">مقارنة الإيرادات والمصروفات الأسبوعية</h3>
            
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="revenue" fill="#ef4444" name="الإيرادات (ج.م)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expense" fill="#991b1b" name="المصروفات (ج.م)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Pie Chart */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 space-y-4 bg-white shadow-sm">
            <h3 className="text-lg font-black text-slate-900 font-cairo">توزيع تكاليف المعمل التشغيلية</h3>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 font-bold">
              {expenseBreakdownData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-700 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: INVOICES LOG */}
      {activeTab === 'invoices' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4 bg-white shadow-sm">
          <h3 className="text-lg font-black text-slate-900 font-cairo">سجل فواتير المعمل والإيرادات</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">رقم الفاتورة</th>
                  <th className="p-3">اسم المريض</th>
                  <th className="p-3">إجمالي التحاليل</th>
                  <th className="p-3">الخصم</th>
                  <th className="p-3">الصافي المدفوع</th>
                  <th className="p-3">طريقة الدفع</th>
                  <th className="p-3">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-black text-red-600">#{inv.invoice_number}</td>
                    <td className="p-3 font-bold text-slate-900">{inv.patient_name}</td>
                    <td className="p-3">{inv.subtotal} ج.م</td>
                    <td className="p-3 text-rose-600 font-bold">{inv.discount} ج.م</td>
                    <td className="p-3 font-black text-emerald-700">{inv.net_total} ج.م</td>
                    <td className="p-3">
                      <span className="bg-slate-100 px-2 py-1 rounded text-red-700 border border-slate-200 font-bold">
                        {inv.payment_method}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 font-semibold">{new Date(inv.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: EXPENSES LOGGER */}
      {activeTab === 'expenses' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 space-y-4 bg-white shadow-sm">
            <h3 className="text-lg font-black text-slate-900 font-cairo">تسجيل مصاريف جديدة</h3>

            <form onSubmit={handleAddExpenseSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="text-slate-700 block mb-1">بند المصروفات *</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-xs border border-slate-300 font-medium"
                >
                  <option value="كيماويات ومحاليل">كيماويات ومحاليل (CBC / Chemistry Kits)</option>
                  <option value="صيانة وأجهزة">صيانة ومعايرة أجهزة المعمل</option>
                  <option value="مرتبات وحوافز">مرتبات الأطقم والتمريض</option>
                  <option value="فواتير ومرافق">فواتير كهرباء ومياه وانترنت</option>
                  <option value="نثريات ومستلزمات">نثريات واستخلاصات طبية</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 block mb-1">بيان/وصف المصروف *</label>
                <input
                  type="text"
                  required
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  placeholder="بيان شحنة المحاليل أو الفاتورة..."
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-xs border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1">المبلغ (ج.م) *</label>
                <input
                  type="number"
                  required
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  placeholder="المبلغ بالجنيه المصري..."
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-xs border border-slate-300 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md"
              >
                إضافة لدفتر المصروفات 💾
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-black text-slate-900 font-cairo">دفتر التكاليف والمصروفات المسجلة</h3>
            <div className="space-y-3">
              {expenses.map((exp) => (
                <div key={exp.id} className="glass-panel p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs bg-white shadow-sm">
                  <div>
                    <div className="font-bold text-slate-900">{exp.description}</div>
                    <span className="text-slate-500 font-semibold">{exp.category} - بواسطة {exp.created_by}</span>
                  </div>
                  <div className="text-rose-600 font-black text-sm font-mono">
                    -{exp.amount} ج.م
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
