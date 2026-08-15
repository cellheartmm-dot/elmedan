import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dna, ShieldCheck, ArrowRight, Clock, Award, FileText, CheckCircle2, Sparkles, PhoneCall } from 'lucide-react';

export const HormonesMarkersPage: React.FC = () => {
  const navigate = useNavigate();

  const hormonePackages = [
    { title: 'تحليل وظائف الغدة الدرقية الكامل (Thyroid Panel)', tests: ['TSH', 'Free T3', 'Free T4', 'Thyroid Antibodies'], price: 580, duration: '24 ساعة' },
    { title: 'باقة هرمونات الخصوبة والصحة الجسدية (Fertility Profile)', tests: ['FSH', 'LH', 'Prolactin', 'E2 / Testosterone Total'], price: 790, duration: '24 ساعة' },
    { title: 'دلالات الأورام المبكرة والفحص الوقائي (Tumor Markers)', tests: ['CEA', 'AFP', 'PSA / CA-125', 'Beta-HCG'], price: 1150, duration: '48 ساعة' },
    { title: 'هرمونات النمو والنمو المتوازن (Growth & Metabolic Panel)', tests: ['Growth Hormone (GH)', 'IGF-1', 'Cortisol Morning/Evening'], price: 920, duration: '24 ساعة' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 'clamp(1rem, 3vw, 2.5rem) clamp(0.75rem, 3vw, 1.5rem)', fontFamily: 'var(--font-tajawal)' }}>
      <div style={{ maxWidth: '76rem', margin: '0 auto' }}>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.9rem', cursor: 'pointer', fontFamily: 'var(--font-cairo)', fontWeight: 700, fontSize: '0.82rem', color: '#475569', marginBottom: '1.25rem', boxShadow: 'var(--shadow-sm)' }}
        >
          <ArrowRight style={{ width: 15, height: 15 }} /> العودة للرئيسية
        </button>

        {/* Hero Banner Header */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #311b92 100%)', color: '#fff', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)', marginBottom: '2rem', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(49,27,146,0.25)' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)', pointerEvents: 'none' }} />
          
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '42rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: 999, padding: '0.35rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, color: '#c084fc', marginBottom: '0.75rem', fontFamily: 'var(--font-cairo)' }}>
              <Dna className="icon-animate-spin" style={{ width: 15, height: 15 }} />
              مركز تميز تحاليل الهرمونات ودلالات الأورام
            </div>
            
            <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              تحاليل الهرمونات والدلالات المبكرة 🧬
            </h1>
            
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7, fontWeight: 500, marginBottom: '1.5rem' }}>
              فحوصات معيارية عالية الدقة باستخدام تقنيات Electrochemiluminescence (ECLIA) المتطورة لقياس مستويات الهرمونات ودلالات الأورام بالنانوجرام.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              <button onClick={() => navigate('/home-booking')} className="btn-primary" style={{ padding: '0.85rem 1.6rem', background: 'linear-gradient(135deg, #a855f7, #7e22ce)', boxShadow: '0 4px 20px rgba(168,85,247,0.4)', fontSize: '0.88rem' }}>
                احجز سحب عينات الهرمونات من المنزل 🚑
              </button>
              <button onClick={() => navigate('/catalog')} className="btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.85rem', padding: '0.85rem 1.4rem' }}>
                دليل الفحوصات كاملاً
              </button>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, color: '#0f172a', fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', marginBottom: '1.25rem' }}>
          باقات وحزم الهرمونات الأكثر طلباً 🧪
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {hormonePackages.map((pkg, idx) => (
            <div key={idx} style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s ease' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{ background: '#f3e8ff', color: '#7e22ce', border: '1px solid #e9d5ff', borderRadius: 999, padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 800 }}>
                    ⏱️ ظهور النتيجة خلال {pkg.duration}
                  </span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-cairo)' }}>
                    {pkg.price} ج.م
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '1.15rem', marginBottom: '1rem' }}>
                  {pkg.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {pkg.tests.map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: '#475569', fontWeight: 600 }}>
                      <CheckCircle2 style={{ width: 16, height: 16, color: '#a855f7' }} />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => navigate('/home-booking')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a, #334155)', boxShadow: 'none' }}>
                احجز هذه الباقة 🚑
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
