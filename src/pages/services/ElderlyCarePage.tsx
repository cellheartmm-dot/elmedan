import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, ShieldCheck, PhoneCall, CheckCircle2, Award, UserCheck } from 'lucide-react';

export const ElderlyCarePage: React.FC = () => {
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
        <div style={{ background: 'linear-gradient(135deg, #d97706 0%, #b45309 60%, #78350f 100%)', color: '#fff', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)', marginBottom: '2rem', boxShadow: '0 20px 50px rgba(217,119,6,0.25)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '0.35rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'var(--font-cairo)' }}>
            <Heart style={{ width: 15, height: 15 }} />
            برنامج الرعاية الخاصة واللطف المفرط
          </div>
          <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', marginBottom: '0.75rem', lineHeight: 1.25 }}>
            خدمة كبار السن والحالات الخاصة ♿
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#fef3c7', lineHeight: 1.7, maxWidth: '40rem' }}>
            سحب عينات رفيق بدون ألم، بطاقم تمريض مدرب خصيصاً على مراعاة الأوردة الدقيقة والتعامل الإنساني الراقي مع والدينا وكبار السن في منازلهم.
          </p>
        </div>

        {/* Features List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          {[
            { title: 'سحب بدون ألم بأحجام سنانير فائقة الدقة', desc: 'استخدام كاثيتر وسنانير فراشة مخصصة للأوردة الحساسة' },
            { title: 'أولوية قصوى واستجابة في 30 دقيقة', desc: 'مواعيد مخصصة تناسب روتين ومواعيد أدوية كبار السن' },
            { title: 'ارسال نتائج مفصلة للطبيب المعالج', desc: 'إرسال مباشر للتقرير لـ WhatsApp الطبيب أو الأبناء فور صدوره' },
          ].map((f, idx) => (
            <div key={idx} style={{ background: '#fff', border: '1.5px solid #feefc3', borderRadius: 'var(--radius-2xl)', padding: 'clamp(1.25rem, 3vw, 1.75rem)', boxShadow: 'var(--shadow-sm)' }}>
              <CheckCircle2 style={{ width: 24, height: 24, color: '#d97706', marginBottom: '0.75rem' }} />
              <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.4rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center', background: '#fff', padding: 'clamp(1.75rem, 4vw, 2.5rem) 1.25rem', borderRadius: 'var(--radius-2xl)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.15rem, 3vw, 1.3rem)', color: '#0f172a', marginBottom: '0.85rem' }}>
            طلب ممرض زيارة منزلية لكبار السن الآن 🚑
          </h3>
          <button onClick={() => navigate('/home-booking')} className="btn-primary" style={{ padding: '0.85rem 1.8rem', background: 'linear-gradient(135deg, #d97706, #b45309)', fontSize: '0.9rem' }}>
            احجز الزيارة المنزلية
          </button>
        </div>

      </div>
    </div>
  );
};
