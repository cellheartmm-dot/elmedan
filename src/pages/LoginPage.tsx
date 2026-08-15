import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, Lock, User, Mail, ArrowLeft, ShieldCheck, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, isAdmin, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login fields
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPass2, setRegPass2] = useState('');

  // Auto redirect if user is already logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      if (isAdmin) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/patient-portal', { replace: true });
      }
    }
  }, [isLoggedIn, user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!loginPhone || !loginPass) { setError('من فضلك أدخل رقم الهاتف وكلمة المرور'); return; }
    setLoading(true);
    const res = await login(loginPhone, loginPass);
    setLoading(false);
    if (!res.success) { 
      setError(res.error || 'خطأ في البيانات'); 
      return; 
    }

    // Direct immediate redirection based on returned user role
    const isStaff = res.user && ['admin', 'doctor', 'receptionist', 'collector'].includes(res.user.role);
    if (isStaff) {
      navigate('/admin', { replace: true });
    } else {
      navigate('/patient-portal', { replace: true });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!regName || !regPhone || !regPass) { setError('يرجى تعبئة جميع الحقول المطلوبة'); return; }
    if (regPass !== regPass2) { setError('كلمتا المرور غير متطابقتان'); return; }
    if (regPass.length < 4) { setError('كلمة المرور يجب ألا تقل عن 4 أرقام'); return; }
    setLoading(true);
    const res = await register({ full_name: regName, phone: regPhone, email: regEmail, password: regPass });
    setLoading(false);
    if (!res.success) { setError(res.error || 'حدث خطأ'); return; }
    navigate('/patient-portal', { replace: true });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#f8fafc', border: '1.5px solid #e2e8f0',
    borderRadius: 'var(--radius-md)', padding: '0.825rem 1rem 0.825rem 3rem',
    fontFamily: 'var(--font-tajawal)', fontSize: '0.95rem', fontWeight: 500,
    color: '#0f172a', outline: 'none', transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.8rem', fontWeight: 700,
    fontFamily: 'var(--font-cairo)', color: '#475569', marginBottom: '0.45rem',
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #fff1f2 40%, #f8fafc 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* BG decorative */}
      <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(225,29,72,0.08), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)', pointerEvents: 'none' }} />
      <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025, pointerEvents: 'none' }}>
        <defs><pattern id="lgDots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#e11d48" /></pattern></defs>
        <rect width="100%" height="100%" fill="url(#lgDots)" />
      </svg>

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', animation: 'fadeInUp 0.5s ease' }}>

        {/* Card */}
        <div style={{
          background: '#fff', borderRadius: 'var(--radius-2xl)',
          border: '1px solid #e2e8f0',
          boxShadow: '0 24px 64px -12px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}>
          {/* Top accent */}
          <div style={{ height: 4, background: 'linear-gradient(90deg, #e11d48, #f97316, #e11d48)', backgroundSize: '200% 100%', animation: 'borderRun 3s linear infinite' }} />

          <div style={{ padding: '2.5rem 2rem' }}>

            {/* Logo + Brand */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
                <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'conic-gradient(from 0deg, #e11d48, #f97316, #e11d48)', animation: 'spin 8s linear infinite', opacity: 0.7 }} />
                <img src="/logo/logo.jpeg" alt="معمل الميدان" className="logo-img" style={{ position: 'relative', zIndex: 1, width: '4.5rem', height: '4.5rem' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1.5rem', color: '#0f172a' }}>
                معمل <span style={{ background: 'linear-gradient(135deg, #e11d48, #be123c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>الميدان</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-inter)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                Medical Laboratory Portal
              </div>
            </div>

            {/* Mode Tabs */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              background: '#f8fafc', borderRadius: 'var(--radius-lg)',
              border: '1px solid #e2e8f0', padding: '0.3rem', marginBottom: '1.75rem', gap: '0.3rem'
            }}>
              {(['login', 'register'] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setError(''); }} style={{
                  padding: '0.65rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-cairo)', fontWeight: 800, fontSize: '0.9rem',
                  background: mode === m ? '#fff' : 'transparent',
                  color: mode === m ? '#e11d48' : '#64748b',
                  boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s ease',
                }}>
                  {m === 'login' ? '🔑 تسجيل الدخول' : '✨ حساب جديد'}
                </button>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem', marginBottom: '1.25rem',
                fontSize: '0.85rem', fontWeight: 600, color: '#be123c',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                animation: 'fadeInUp 0.25s ease'
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* ──── LOGIN FORM ──── */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={labelStyle}>رقم الهاتف أو البريد الإلكتروني</label>
                  <div style={{ position: 'relative' }}>
                    <Phone style={{ width: 17, height: 17, color: '#94a3b8', position: 'absolute', top: '50%', insetInlineEnd: '1rem', transform: 'translateY(-50%)' }} />
                    <input
                      type="text" value={loginPhone} onChange={e => setLoginPhone(e.target.value)}
                      placeholder="01xxxxxxxxx أو admin"
                      style={{ ...inputStyle, paddingInlineEnd: '1rem', paddingInlineStart: '3rem' }}
                      onFocus={e => { e.target.style.borderColor = '#e11d48'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>كلمة المرور</label>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ width: 17, height: 17, color: '#94a3b8', position: 'absolute', top: '50%', insetInlineEnd: '1rem', transform: 'translateY(-50%)' }} />
                    <input
                      type={showPass ? 'text' : 'password'} value={loginPass}
                      onChange={e => setLoginPass(e.target.value)}
                      placeholder="••••••••"
                      style={{ ...inputStyle, paddingInlineEnd: '3rem', paddingInlineStart: '3rem' }}
                      onFocus={e => { e.target.style.borderColor = '#e11d48'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'absolute', top: '50%', insetInlineStart: '0.875rem', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
                      {showPass ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} style={{
                  width: '100%', background: loading ? '#cbd5e1' : 'linear-gradient(135deg, #e11d48, #be123c)',
                  color: '#fff', fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1rem',
                  padding: '1rem', borderRadius: 'var(--radius-md)', border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(225,29,72,0.3)',
                  transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  marginTop: '0.5rem'
                }}>
                  {loading ? <><Loader style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> جارٍ الدخول...</> : <>تسجيل الدخول <ArrowLeft style={{ width: 18, height: 18 }} /></>}
                </button>
              </form>
            )}

            {/* ──── REGISTER FORM ──── */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>الاسم الكامل <span style={{ color: '#e11d48' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <User style={{ width: 17, height: 17, color: '#94a3b8', position: 'absolute', top: '50%', insetInlineEnd: '1rem', transform: 'translateY(-50%)' }} />
                    <input type="text" value={regName} onChange={e => setRegName(e.target.value)} placeholder="محمد أحمد" style={{ ...inputStyle }}
                      onFocus={e => { e.target.style.borderColor = '#e11d48'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>رقم الهاتف <span style={{ color: '#e11d48' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <Phone style={{ width: 17, height: 17, color: '#94a3b8', position: 'absolute', top: '50%', insetInlineEnd: '1rem', transform: 'translateY(-50%)' }} />
                    <input type="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} placeholder="01xxxxxxxxx" style={{ ...inputStyle }}
                      onFocus={e => { e.target.style.borderColor = '#e11d48'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>البريد الإلكتروني <span style={{ color: '#94a3b8', fontWeight: 500 }}>(اختياري)</span></label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ width: 17, height: 17, color: '#94a3b8', position: 'absolute', top: '50%', insetInlineEnd: '1rem', transform: 'translateY(-50%)' }} />
                    <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="example@email.com" style={{ ...inputStyle }}
                      onFocus={e => { e.target.style.borderColor = '#e11d48'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={labelStyle}>كلمة المرور <span style={{ color: '#e11d48' }}>*</span></label>
                    <div style={{ position: 'relative' }}>
                      <Lock style={{ width: 17, height: 17, color: '#94a3b8', position: 'absolute', top: '50%', insetInlineEnd: '0.75rem', transform: 'translateY(-50%)' }} />
                      <input type={showPass ? 'text' : 'password'} value={regPass} onChange={e => setRegPass(e.target.value)} placeholder="••••" style={{ ...inputStyle, paddingInlineEnd: '0.75rem' }}
                        onFocus={e => { e.target.style.borderColor = '#e11d48'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>تأكيد المرور <span style={{ color: '#e11d48' }}>*</span></label>
                    <input type={showPass ? 'text' : 'password'} value={regPass2} onChange={e => setRegPass2(e.target.value)} placeholder="••••" style={{ ...inputStyle }}
                      onFocus={e => { e.target.style.borderColor = '#e11d48'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.78rem', color: '#475569', fontWeight: 500 }}>
                  <input type="checkbox" onChange={e => setShowPass(e.target.checked)} style={{ accentColor: '#e11d48' }} />
                  إظهار كلمة المرور
                </label>

                <button type="submit" disabled={loading} style={{
                  width: '100%', background: loading ? '#cbd5e1' : 'linear-gradient(135deg, #e11d48, #be123c)',
                  color: '#fff', fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1rem',
                  padding: '1rem', borderRadius: 'var(--radius-md)', border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(225,29,72,0.3)',
                  transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                }}>
                  {loading ? <><Loader style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> جارٍ الإنشاء...</> : <>إنشاء الحساب <ArrowLeft style={{ width: 18, height: 18 }} /></>}
                </button>
              </form>
            )}

          </div>

          {/* Footer */}
          <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <ShieldCheck style={{ width: 14, height: 14, color: '#059669' }} />
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>بياناتك آمنة — معتمد ISO 15189</span>
          </div>
        </div>

      </div>
    </div>
  );
};
