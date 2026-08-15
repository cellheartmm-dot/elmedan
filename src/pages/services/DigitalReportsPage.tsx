import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, ShieldCheck, QrCode, Lock, CheckCircle2, Download } from 'lucide-react';

export const DigitalReportsPage: React.FC = () => {
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
        <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)', color: '#fff', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)', marginBottom: '2rem', boxShadow: '0 20px 50px rgba(67,56,202,0.25)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '0.35rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'var(--font-cairo)' }}>
            <FileText style={{ width: 15, height: 15 }} />
            منظومة التقارير الرقمية المعتمدة
          </div>
          <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', marginBottom: '0.75rem', lineHeight: 1.25 }}>
            نتائج وتقارير التحاليل الرقمية 📑
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#c7d2fe', lineHeight: 1.7, maxWidth: '40rem' }}>
            نظام إصدار وتوثيق التقارير الطبية رقمياً بصيغة PDF معتمداً مع QR Code مشفر ومراجعة استشارية ثلاثية قبل صدور النتيجة.
          </p>
        </div>

        {/* System Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          {[
            { icon: <QrCode style={{ width: 26, height: 26, color: '#4338ca' }} />, title: 'توثيق رسمي بـ QR Code', desc: 'كل تقرير يحمل كود تحقق رسمي لمنع التزوير وسهولة إرساله للمستشفيات والأطباء' },
            { icon: <Lock style={{ width: 26, height: 26, color: '#4338ca' }} />, title: 'خصوصية وأمان بياناتك', desc: 'النتائج محمية بتشفير عالي وتُعرض فقط للمريض وصاحب الحجز المسجل' },
            { icon: <Download style={{ width: 26, height: 26, color: '#4338ca' }} />, title: 'تحميل مباشر ورسائل واتساب', desc: 'إشعار فوري برابط التحميل المباشر فور اعتماد النتيجة من الاستشاري' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: '#fff', border: '1.5px solid #e0e7ff', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.25rem, 3vw, 2rem)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Card to Patient Portal */}
        <div style={{ textAlign: 'center', background: '#fff', padding: 'clamp(2rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2rem)', borderRadius: 'var(--radius-2xl)', border: '1.5px solid #cbd5e1', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', color: '#0f172a', marginBottom: '0.75rem' }}>
            هل ترغب في الاستعلام عن نتائجك الحالية؟
          </h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            سجّل دخولك الآن لبوابة المريض وشاهد نتائجك فور صدورها أو ابحث برقم الحجز.
          </p>
          <button onClick={() => navigate('/patient-portal')} className="btn-primary" style={{ padding: '0.85rem 1.8rem', background: 'linear-gradient(135deg, #4338ca, #312e81)', fontSize: '0.9rem' }}>
            الانتقال لبوابة المريض 🔑
          </button>
        </div>

      </div>
    </div>
  );
};
