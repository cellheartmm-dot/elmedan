import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, CheckCircle2, Award, HeartPulse, Stethoscope, Droplet } from 'lucide-react';

export const ComprehensiveCheckupPage: React.FC = () => {
  const navigate = useNavigate();

  const packages = [
    { title: 'باقة الفحص الدوري الأساسية 🥈', count: '14 تحليل', price: 650, oldPrice: 950, tests: ['صورة دم كاملة CBC', 'وظائف كلى كاملة', 'وظائف كبد ALT/AST', 'سكر صائم FBS', 'تحليل بول كامل'] },
    { title: 'الباقة الذهبية الشاملة 🥇', count: '28 تحليل', price: 1250, oldPrice: 1800, tests: ['كل الفحوصات الأساسية', 'ملف الدهون الشامل Lipid Profile', 'السكر التراكمي HbA1c', 'فيتامين د Vitamin D', 'مخزون الحديد Ferritin'] },
    { title: 'باقة الماس المتكاملة 💎', count: '42 تحليل', price: 2100, oldPrice: 3100, tests: ['شامل جميع وظائف الجسم', 'هرمونات الغدة TSH', 'دلالات أورام وقائية', 'فيتامين B12 ونقرس', 'رسم قلب وتدقيق استشاري'] },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 'clamp(1rem, 3vw, 2.5rem) clamp(0.75rem, 3vw, 1.5rem)', fontFamily: 'var(--font-tajawal)' }}>
      <div style={{ maxWidth: '76rem', margin: '0 auto' }}>
        
        <button 
          onClick={() => navigate('/')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.9rem', cursor: 'pointer', fontFamily: 'var(--font-cairo)', fontWeight: 700, fontSize: '0.82rem', color: '#475569', marginBottom: '1.25rem' }}
        >
          <ArrowRight style={{ width: 15, height: 15 }} /> العودة للرئيسية
        </button>

        {/* Hero Header */}
        <div style={{ background: 'linear-gradient(135deg, #047857 0%, #059669 60%, #10b981 100%)', color: '#fff', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)', marginBottom: '2rem', boxShadow: '0 20px 50px rgba(5,150,105,0.25)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '0.35rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'var(--font-cairo)' }}>
            <HeartPulse style={{ width: 15, height: 15 }} />
            برامج الفحص الدوري الوقائي المعتمدة
          </div>
          <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', marginBottom: '0.75rem', lineHeight: 1.25 }}>
            تحاليل الفحص الشامل والدوري 🔬
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#ecfdf5', lineHeight: 1.7, maxWidth: '40rem' }}>
            اطمئن على صحتك وصحة أسرتك مع باقات الفحص الشامل الموفرة المصممة خصيصاً لاكتشاف أي اختلالات حيوية مبكراً والوقاية السريعة.
          </p>
        </div>

        {/* Packages Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
          {packages.map((p, i) => (
            <div key={i} style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 'var(--radius-2xl)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', borderRadius: 999, padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 800 }}>
                    {p.count}
                  </span>
                  <div>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#047857', fontFamily: 'var(--font-cairo)' }}>{p.price} ج.م</span>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through', marginInlineStart: '0.5rem' }}>{p.oldPrice} ج.م</span>
                  </div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1.2rem', color: '#0f172a', marginBottom: '1.25rem' }}>{p.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  {p.tests.map((t, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                      <CheckCircle2 style={{ width: 16, height: 16, color: '#10b981' }} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => navigate('/home-booking')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #059669, #047857)' }}>
                حجز الباقة الآن 🚑
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
