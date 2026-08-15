import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, ShieldCheck, FileCheck, CheckCircle2, Users, Briefcase } from 'lucide-react';

export const CorporateServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 'clamp(1rem, 3vw, 2.5rem) clamp(0.75rem, 3vw, 1.5rem)', fontFamily: 'var(--font-tajawal)' }}>
      <div style={{ maxWidth: '76rem', margin: '0 auto' }}>
        
        <button 
          onClick={() => navigate('/')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.9rem', cursor: 'pointer', fontFamily: 'var(--font-cairo)', fontWeight: 700, fontSize: '0.82rem', color: '#475569', marginBottom: '1.25rem' }}
        >
          <ArrowRight style={{ width: 15, height: 15 }} /> العودة للرئيسية
        </button>

        {/* Hero Banner Header */}
        <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 60%, #075985 100%)', color: '#fff', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)', marginBottom: '2rem', boxShadow: '0 20px 50px rgba(2,132,199,0.25)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '0.35rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'var(--font-cairo)' }}>
            <Building2 style={{ width: 15, height: 15 }} />
            حلول الفحوصات الطبية للمؤسسات والشركات
          </div>
          <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', marginBottom: '0.75rem', lineHeight: 1.25 }}>
            فحوصات الشركات والتعاقدات الطبية 🏢
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#e0f2fe', lineHeight: 1.7, maxWidth: '40rem' }}>
            حلول متكاملة لبرامج الفحص الدوري السنوي لموظفي الشركات، والكشوفات الطبية قبل التوظيف، وحملات سحب العينات الجماعية بمقر شركتك.
          </p>
        </div>

        {/* Corporate Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          {[
            { icon: <Users style={{ width: 26, height: 26, color: '#0284c7' }} />, title: 'حملات سحب عينات في مقر الشركة', desc: 'فريق تمريض متخصص ينتقل لمقر مؤسستك مع معدات التبريد وحفظ العينات' },
            { icon: <FileCheck style={{ width: 26, height: 26, color: '#0284c7' }} />, title: 'لوحة تحكم وتطبيق لإدارة النتائج', desc: 'إمكانية متابعة تقارير الفحص الدوري لكل موظف مع الحفاظ على الخصوصية' },
            { icon: <Briefcase style={{ width: 26, height: 26, color: '#0284c7' }} />, title: 'خصومات وتسهيلات سداد مخصصة', desc: 'خصومات تصل إلى 50% على التعاقدات السنوية وحزم الفحص الشامل' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: '#fff', border: '1.5px solid #e0f2fe', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.25rem, 3vw, 2rem)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Corporate Contact CTA */}
        <div style={{ background: '#0f172a', color: '#fff', padding: 'clamp(2rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2rem)', borderRadius: 'var(--radius-2xl)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', marginBottom: '0.75rem' }}>
            هل ترغب في طلب عرض سعر تعاقد لشركتك؟
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            تواصل مع قسم التعاقدات الطبية مباشرة للحصول على الاستشارة وخطة الفحص المخصصة.
          </p>
          <a href="tel:19888" className="btn-primary" style={{ display: 'inline-flex', padding: '0.85rem 1.8rem', background: 'linear-gradient(135deg, #0284c7, #0369a1)', textDecoration: 'none', fontSize: '0.9rem' }}>
            تواصل مع مسئول التعاقدات 📞 19888
          </a>
        </div>

      </div>
    </div>
  );
};
