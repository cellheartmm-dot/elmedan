import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Clock, ArrowUpRight, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer style={{
      background: '#0f172a',
      color: 'rgba(255,255,255,0.7)',
      fontFamily: 'var(--font-tajawal)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top red accent line */}
      <div style={{
        height: 3,
        background: 'linear-gradient(90deg, transparent, #e11d48 30%, #f97316 60%, #e11d48 80%, transparent)',
      }} />

      {/* Decorative bg orbs */}
      <div style={{ position: 'absolute', top: -100, insetInlineEnd: -100, width: 350, height: 350, borderRadius: '50%', background: 'rgba(225,29,72,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, insetInlineStart: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(99,102,241,0.04)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '84rem', margin: '0 auto', padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 1.5rem) 1.5rem', position: 'relative' }}>

        {/* Grid */}
        <style>{`
          .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          @media(min-width:640px){ .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; } }
          @media(min-width:1024px){ .footer-grid { grid-template-columns: 2fr 1.2fr 1.2fr 1.5fr; } }
        `}</style>
        <div className="footer-grid">

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: -2,
                  background: 'conic-gradient(from 0deg, #e11d48, #f97316, #e11d48)',
                  borderRadius: '50%', animation: 'spin 8s linear infinite', opacity: 0.6
                }} />
                <img src="/logo/logo.jpeg" alt="معمل الميدان" className="logo-img-sm" style={{ position: 'relative', zIndex: 1, width: '2.5rem', height: '2.5rem' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1.2rem', color: '#fff' }}>
                  معمل <span style={{ background: 'linear-gradient(135deg, #f43f5e, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>الميدان</span>
                </div>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-inter)' }}>
                  Medical Laboratory
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', maxWidth: '22rem' }}>
              معمل الميدان للتحاليل الطبية — نقدم أعلى معايير الدقة والسرعة في التحاليل الطبية وسحب العينات المنزلية، معتمدين دولياً وفق معايير ISO 15189.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(225,29,72,0.1)', border: '1px solid rgba(225,29,72,0.2)', borderRadius: 999, padding: '0.4rem 0.875rem', width: 'fit-content' }}>
              <ShieldCheck style={{ width: 14, height: 14, color: '#f43f5e' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f43f5e' }}>ISO 15189 Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: '0.9rem', color: '#fff', marginBottom: '1.1rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              روابط سريعة
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { path: '/',               label: 'الصفحة الرئيسية' },
                { path: '/catalog',        label: 'دليل التحاليل الكامل' },
                { path: '/home-booking',   label: 'حجز سحب عينات منزلي' },
                { path: '/patient-portal', label: 'استلام نتائجي (بوابة المريض)' },
                { path: '/admin',          label: 'بوابة إدارة المعمل' },
              ].map(link => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    textAlign: 'right', color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-tajawal)',
                    padding: '0.2rem 0',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f43f5e'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  <ArrowUpRight style={{ width: 13, height: 13, flexShrink: 0 }} />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Branches */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: '0.9rem', color: '#fff', marginBottom: '1.1rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              فروعنا
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'القاهرة — مدينة نصر، شارع الطيران',
                'القاهرة — المعادي، شارع النصر',
                'التجمع الخامس — الحي الخامس',
                'الجيزة — الدقي',
              ].map((branch, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <MapPin style={{ width: 13, height: 13, color: '#f43f5e', marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{branch}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.25rem' }}>
                <Clock style={{ width: 13, height: 13, color: '#34d399', flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399' }}>نعمل 24 ساعة / 7 أيام</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: '0.9rem', color: '#fff', marginBottom: '1.1rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              تواصل معنا
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <a href="tel:19888" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f43f5e')}
                onMouseLeave={e => (e.currentTarget.style.color = '')}>
                <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-md)', background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone style={{ width: 14, height: 14, color: '#f43f5e' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>الخط الساخن</div>
                  <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 800, fontFamily: 'var(--font-inter)', letterSpacing: '0.06em' }}>19888</div>
                </div>
              </a>

              <a href="mailto:info@elmedanlab.com" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f43f5e')}
                onMouseLeave={e => (e.currentTarget.style.color = '')}>
                <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail style={{ width: 14, height: 14, color: '#818cf8' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>البريد الإلكتروني</div>
                  <div style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600, fontFamily: 'var(--font-inter)' }}>info@elmedanlab.com</div>
                </div>
              </a>

              <div style={{ marginTop: '0.5rem' }}>
                <button
                  onClick={() => navigate('/home-booking')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #e11d48, #be123c)',
                    color: '#fff',
                    fontFamily: 'var(--font-cairo)', fontWeight: 800,
                    fontSize: '0.85rem', padding: '0.75rem',
                    borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(225,29,72,0.25)',
                    transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  🚑 احجز سحب عينات الآن
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
          justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            © {new Date().getFullYear()} معمل الميدان للتحاليل الطبية — جميع الحقوق محفوظة
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            صُنع بـ <Heart style={{ width: 12, height: 12, color: '#f43f5e', fill: '#f43f5e' }} /> لصحة المصريين
          </div>
        </div>

      </div>
    </footer>
  );
};
