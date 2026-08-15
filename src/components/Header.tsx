import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  TestTube2, Home, FileText, Calendar,
  Menu, X, Droplet, PhoneCall,
  MapPin, Clock, LogIn, LogOut, LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  openBookingModal?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { path: '/',               label: 'الرئيسية',              icon: Home },
    { path: '/catalog',        label: 'دليل التحاليل',          icon: TestTube2 },
    { path: '/home-booking',   label: 'سحب عينات منزلي',       icon: Calendar },
    { path: '/patient-portal', label: 'نتائجي 📑',              icon: FileText },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'إدارة المعمل 🩺', icon: LayoutDashboard });
  }

  const isCurrentPath = (p: string) => {
    if (p === '/') return location.pathname === '/';
    return location.pathname.startsWith(p);
  };

  return (
    <>
      {/* ── TOP TICKER BAR ── */}
      <div style={{
        background: '#0f172a',
        color: 'rgba(255,255,255,0.75)',
        fontSize: '0.72rem',
        fontWeight: 600,
        fontFamily: 'var(--font-tajawal)',
        padding: '0.35rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a href="tel:19888" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fb7185', textDecoration: 'none' }}>
            <PhoneCall style={{ width: 12, height: 12 }} />
            <span>الخط الساخن:</span>
            <strong style={{ color: '#fff', fontFamily: 'var(--font-inter)', letterSpacing: '0.05em' }}>19888</strong>
          </a>
          <span style={{ opacity: 0.3 }} className="sm-only-inline">|</span>
          <div className="sm-only-inline" style={{ display: 'none', alignItems: 'center', gap: '0.35rem' }}>
            <MapPin style={{ width: 12, height: 12, color: '#94a3b8' }} />
            <span>مدينة نصر · المعادي · التجمع</span>
          </div>
          <style>{`@media(min-width:640px){ .sm-only-inline { display: flex !important; } }`}</style>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34d399', fontSize: '0.68rem' }}>
          <Clock style={{ width: 11, height: 11 }} />
          <span>خدمة 24/7</span>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.98)' : '#fff',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : '0 1px 0 rgba(0,0,0,0.03)',
        transition: 'all 0.3s ease',
        fontFamily: 'var(--font-tajawal)',
      }}>
        <div style={{
          maxWidth: '84rem', margin: '0 auto',
          padding: '0 0.85rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '4rem'
        }}>
          <style>{`@media(min-width:640px){ header > div { padding: 0 1.5rem !important; height: 4.5rem !important; } }`}</style>

          {/* BRAND */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.55rem', padding: 0
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: -2,
                background: 'conic-gradient(from 0deg, #e11d48, #f97316, #e11d48)',
                borderRadius: '50%', animation: 'spin 8s linear infinite', opacity: 0.7
              }} />
              <img src="/logo/logo.jpeg" alt="معمل الميدان" className="logo-img" style={{ position: 'relative', zIndex: 1, width: '2.4rem', height: '2.4rem' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.01em'
              }}>
                معمل <span style={{ background: 'linear-gradient(135deg, #e11d48, #be123c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>الميدان</span>
              </div>
              <div style={{
                fontFamily: 'var(--font-inter)', fontSize: '0.58rem',
                fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                ISO 15189 CERTIFIED
              </div>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '0.2rem' }} className="desktop-nav">
            <style>{`
              @media(min-width:1024px){ .desktop-nav { display: flex !important; } }
            `}</style>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isCurrentPath(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.55rem 0.875rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-cairo)', fontWeight: active ? 800 : 600,
                    fontSize: '0.85rem',
                    background: active ? '#fff1f2' : 'transparent',
                    color: active ? '#e11d48' : '#475569',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#0f172a';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }
                  }}
                >
                  <Icon style={{ width: 15, height: 15 }} />
                  {item.label}
                  {active && (
                    <span style={{
                      position: 'absolute', bottom: -1, insetInlineStart: '50%',
                      transform: 'translateX(50%)',
                      width: '60%', height: 2,
                      background: '#e11d48', borderRadius: 999
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT CONTROLS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>

            {/* Auth status or login button */}
            {isLoggedIn && user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <button
                  onClick={() => navigate(isAdmin ? '/admin' : '/patient-portal')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    borderRadius: 'var(--radius-md)', padding: '0.4rem 0.65rem',
                    fontFamily: 'var(--font-cairo)', fontWeight: 700, fontSize: '0.75rem',
                    color: '#0f172a', cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', background: '#fff1f2',
                    border: '1px solid #fecdd3', color: '#e11d48',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 900
                  }}>
                    {user.full_name.charAt(0)}
                  </div>
                  <span className="user-name-label">{user.full_name.split(' ')[0]}</span>
                  <style>{`@media(max-width:400px){ .user-name-label { display: none !important; } }`}</style>
                </button>
                <button
                  onClick={logout}
                  title="تسجيل الخروج"
                  style={{
                    background: '#fff1f2', border: '1px solid #fecdd3', color: '#be123c',
                    borderRadius: 'var(--radius-md)', padding: '0.4rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center'
                  }}
                >
                  <LogOut style={{ width: 14, height: 14 }} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.75rem' }}
              >
                <LogIn style={{ width: 13, height: 13 }} />
                <span className="login-text">دخول</span>
                <span className="login-full-text">دخول / تسجيل</span>
                <style>{`
                  .login-full-text { display: none; }
                  @media(min-width:640px){ .login-full-text { display: inline !important; } .login-text { display: none !important; } }
                `}</style>
              </button>
            )}

            {/* Book CTA */}
            <button onClick={() => navigate('/home-booking')} style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              color: '#fff',
              fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: '0.8rem',
              padding: '0.55rem 0.9rem', borderRadius: 'var(--radius-full)',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(225,29,72,0.25)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(225,29,72,0.38)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(225,29,72,0.25)'; }}>
              <Droplet style={{ width: 14, height: 14 }} />
              <span style={{ display: 'none' }} className="btn-label">احجز سحب عينات 🚑</span>
              <span className="btn-short">حجز 🚑</span>
              <style>{`@media(min-width:640px){ .btn-label{display:inline !important;} .btn-short{display:none !important;} }`}</style>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg-hidden"
              aria-label="قائمة التنقل"
              style={{
                background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-md)', padding: '0.5rem',
                cursor: 'pointer', color: '#475569',
                display: 'flex', alignItems: 'center'
              }}
            >
              {mobileOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
            </button>

          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileOpen && (
          <div style={{
            background: '#fff',
            borderTop: '1px solid #e2e8f0',
            padding: '1rem 1.25rem 1.5rem',
            animation: 'fadeInUp 0.22s ease',
            boxShadow: '0 12px 30px rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
              {navItems.map(item => {
                const Icon = item.icon;
                const active = isCurrentPath(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setMobileOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.75rem 1rem', borderRadius: 'var(--radius-lg)',
                      border: 'none', cursor: 'pointer', textAlign: 'right',
                      background: active ? '#fff1f2' : '#f8fafc',
                      color: active ? '#e11d48' : '#334155',
                      fontFamily: 'var(--font-cairo)', fontWeight: active ? 800 : 600,
                      fontSize: '0.9rem', transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon style={{ width: 18, height: 18 }} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Mobile Contact Actions */}
            <div style={{ paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.5rem' }}>
              <a
                href="tel:19888"
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  background: 'linear-gradient(135deg, #e11d48, #be123c)',
                  color: '#fff', padding: '0.7rem', borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none', fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: '0.82rem'
                }}
              >
                <PhoneCall style={{ width: 14, height: 14 }} />
                اتصل بالخط الساخن (19888)
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

