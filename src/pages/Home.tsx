import React, { useState, useEffect, useRef } from 'react';
import { 
  Truck, TestTube, FileCheck2, ChevronLeft,
  Search, Activity, CheckCircle2, Droplet, ArrowLeft,
  ShieldCheck, Award, Clock, X, PhoneCall, Star,
  Users, TrendingUp, Zap, Heart, ArrowUpRight,
  Microscope, FlaskConical, Stethoscope, Droplets,
  HeartPulse, Dna, Beaker
} from 'lucide-react';
import { TestItem, Booking } from '../types';
import { HeroSlider } from '../components/HeroSlider';
import { ServiceCardsSection } from '../components/ServiceCardsSection';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
  testCatalog: TestItem[];
  bookings: Booking[];
  setSelectedBookingForPortal?: (b: Booking) => void;
}

// Animated counter hook
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(target * ease));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// Stat counter component
function StatCounter({ value, suffix, label, color }: { value: number; suffix: string; label: string; color: string }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="stat-pill anim-count">
      <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-cairo)', color }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600, marginTop: '0.25rem' }}>{label}</div>
    </div>
  );
}

export const Home: React.FC<HomeProps> = ({
  setActiveTab,
  openBookingModal,
  testCatalog,
  bookings,
  setSelectedBookingForPortal
}) => {
  const [quickLookup, setQuickLookup] = useState('');
  const [lookupResult, setLookupResult] = useState<Booking | null | 'not_found'>(null);
  const [fastingModal, setFastingModal] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickLookup.trim()) return;
    const found = bookings.find(b =>
      b.patient_phone.includes(quickLookup) ||
      b.booking_number.toLowerCase().includes(quickLookup.toLowerCase())
    );
    setLookupResult(found || 'not_found');
  };

  const packages = [
    {
      id: 'p1',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Blood Drop — professional medical */}
          <path d="M16 4C16 4 7 15.5 7 20.5C7 25.2 11.1 29 16 29C20.9 29 25 25.2 25 20.5C25 15.5 16 4 16 4Z" fill="currentColor" opacity="0.15"/>
          <path d="M16 6.5C16 6.5 9 16.5 9 21C9 24.9 12.1 28 16 28C19.9 28 23 24.9 23 21C23 16.5 16 6.5 16 6.5Z" fill="currentColor"/>
          <path d="M12 21C12 18.5 14.5 15 16 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        </svg>
      ),
      title: 'الفحص الشامل المتكامل',
      subtitle: 'Comprehensive Health Check',
      tests: '14 تحليل',
      price: 850,
      original: 1200,
      desc: 'صورة دم — سكر صائم وتراكمي — كبد — كلى — كوليسترول — فيتامينات',
      popular: true,
      color: '#e11d48',
    },
    {
      id: 'p2',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* DNA Helix — Thyroid/Hormones */}
          <path d="M10 4C10 4 14 8 16 12C18 8 22 4 22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M10 28C10 28 14 24 16 20C18 24 22 28 22 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M16 4V28" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.4"/>
          <circle cx="16" cy="12" r="2.5" fill="currentColor"/>
          <circle cx="16" cy="20" r="2.5" fill="currentColor" opacity="0.7"/>
          <path d="M10 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M10 20H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
          <circle cx="22" cy="4" r="1.5" fill="currentColor" opacity="0.6"/>
          <circle cx="10" cy="28" r="1.5" fill="currentColor" opacity="0.6"/>
          <circle cx="22" cy="28" r="1.5" fill="currentColor"/>
        </svg>
      ),
      title: 'صحة الغدة والهرمونات',
      subtitle: 'Thyroid & Hormones Panel',
      tests: '6 تحاليل',
      price: 650,
      original: 900,
      desc: 'TSH — Free T3 — Free T4 — مخزون الحديد — فيتامين ب12 — فيتامين د',
      popular: false,
      color: '#7c3aed',
    },
    {
      id: 'p3',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Heart with ECG pulse — Diabetes/BP */}
          <path d="M16 27C16 27 4 19.5 4 12C4 8.1 7.1 5 11 5C13.1 5 15 6 16 7.5C17 6 18.9 5 21 5C24.9 5 28 8.1 28 12C28 19.5 16 27 16 27Z" fill="currentColor" opacity="0.15"/>
          <path d="M16 25C16 25 5 18 5 12C5 8.7 7.7 6 11 6C13 6 14.8 7 16 8.5C17.2 7 19 6 21 6C24.3 6 27 8.7 27 12C27 18 16 25 16 25Z" fill="currentColor"/>
          <path d="M6 14H10L12 10L14 17L16 13L17 15H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'متابعة السكر والضغط',
      subtitle: 'Diabetes & BP Monitoring',
      tests: '5 تحاليل',
      price: 420,
      original: 600,
      desc: 'سكر تراكمي HbA1c — سكر صائم — وظائف كلى — بول كامل — صودا الدم',
      popular: false,
      color: '#059669',
    },
  ];

  const workflowSteps = [
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/><path d="M9 7h6"/></svg>, num: 1, title: 'احجز أونلاين', desc: 'اختر تحاليلك وحدد الوقت المناسب لك' },
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="m9 12 2 2 4-4"/></svg>, num: 2, title: 'يصلك الممرض', desc: 'طاقم تمريض مؤهل بالحقيبة المعقمة' },
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4-14 14H4v-4L18 2z"/><path d="m14 6 4 4"/><path d="M4 20v-4"/><circle cx="6" cy="17" r="1" fill="currentColor"/></svg>, num: 3, title: 'سحب العينة', desc: 'آمن — بدون ألم — أدوات أحادية الاستخدام' },
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4"/><path d="M9 3h6"/><path d="M15 3h4a2 2 0 0 1 2 2v4"/><path d="M3 9v6"/><path d="M21 9v6"/><path d="M3 15v2a2 2 0 0 0 2 2h4"/><path d="M21 15v2a2 2 0 0 1-2 2h-4"/><path d="M9 21h6"/><circle cx="12" cy="12" r="3"/></svg>, num: 4, title: 'فحص المعمل', desc: 'أجهزة أوتوماتيكية معيارية ISO 15189' },
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>, num: 5, title: 'نتيجتك على هاتفك', desc: 'PDF معتمد بـ QR Code على حسابك فوراً' },
  ];

  const testimonials = [
    { name: 'د. محمد رشاد', role: 'طبيب قلب — مستشفى الدلتا', text: 'معمل الميدان يضاهي معامل أوروبية في دقة نتائج الهرمونات والكيمياء الحيوية، أنصح به جميع مرضاي.', stars: 5 },
    { name: 'سارة فاروق', role: 'مريضة — مدينة نصر', text: 'أول مرة أحجز من المنزل وأستلم النتيجة PDF خلال 6 ساعات. تجربة مميزة جداً وفريق التمريض محترف.', stars: 5 },
    { name: 'أحمد السيد', role: 'مريض — المعادي', text: 'النتائج دقيقة ومعتمدة، والسعر معقول جداً مقارنة بمعامل أخرى. دايماً بحجز من معمل الميدان.', stars: 5 },
  ];

  return (
    <div style={{ background: '#f4f6fb', minHeight: '100vh' }}>

      {/* ===================================================
          HERO SECTION
      =================================================== */}
      <section style={{
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
        padding: 'clamp(1.5rem, 4vw, 4rem) 0 clamp(2.5rem, 5vw, 4.5rem)',
        borderBottom: '1px solid #e2e8f0'
      }}>
        {/* Background decorative SVG dots grid */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.045, pointerEvents: 'none' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#e11d48" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Glowing radial orb */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '480px', height: '480px',
          background: 'radial-gradient(circle, rgba(225,29,72,0.09) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', left: '-60px',
          width: '380px', height: '380px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />

        <div className="section-container" style={{ maxWidth: '84rem' }}>
          {/* Top Featured Hero Slider */}
          <div style={{ marginBottom: '1.5rem' }}>
            <HeroSlider openBookingModal={openBookingModal} />
          </div>

          {/* Interactive Service Cards with Compact Mini-Icons */}
          <ServiceCardsSection openBookingModal={openBookingModal} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center' }}>

            {/* Lg: 2 columns */}
            <style>{`@media(min-width:1024px){.hero-inner{grid-template-columns:1fr 1fr !important; gap: 3.5rem !important;}}`}</style>
            <div className="hero-inner" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center' }}>

              {/* LEFT: Text block */}
              <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Trust badge */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                    background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                    border: '1px solid #fecdd3',
                    borderRadius: '999px',
                    padding: '0.35rem 0.9rem',
                    fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-cairo)',
                    color: '#be123c',
                    boxShadow: '0 2px 8px rgba(225,29,72,0.12)'
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e11d48', display: 'inline-block', animation: 'dotPulse 1.5s ease-in-out infinite' }} />
                    معتمد ISO 15189 · خدمة 24 ساعة
                  </div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    background: '#f0fdf4', border: '1px solid #bbf7d0',
                    borderRadius: '999px', padding: '0.35rem 0.8rem',
                    fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#15803d'
                  }}>
                    ✅ ترخيص وزارة الصحة
                  </div>
                </div>

                {/* Main headline */}
                <div>
                  <h1 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, margin: 0 }}>
                    <span style={{ display: 'block', fontSize: 'clamp(1.75rem, 5vw, 3.2rem)' }}>
                      معمل الميدان
                    </span>
                    <span style={{
                      display: 'block',
                      fontSize: 'clamp(1.2rem, 3.5vw, 2rem)',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #e11d48 0%, #be123c 60%, #f97316 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginTop: '0.25rem'
                    }}>
                      للتحاليل الطبية المتكاملة
                    </span>
                  </h1>
                  <p style={{
                    marginTop: '0.85rem',
                    color: 'var(--slate-600)',
                    fontSize: 'clamp(0.88rem, 2vw, 1.05rem)',
                    lineHeight: 1.7,
                    fontWeight: 500,
                    maxWidth: '34rem'
                  }}>
                    دقة تشخيصية تضاهي أكبر معامل مصر والعالم — نتائجك جاهزة فوراً بـ PDF معتمد، وسحب العينات من بابك بسنانير معقمة خلال 30 دقيقة.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.25rem' }}>
                  <button onClick={openBookingModal} className="btn-primary" style={{ fontSize: '0.92rem', padding: '0.85rem 1.6rem' }}>
                    <Truck style={{ width: 18, height: 18 }} />
                    احجز سحب عينات منزلي 🚑
                  </button>
                  <button onClick={() => setActiveTab('catalog')} className="btn-secondary" style={{ fontSize: '0.88rem', padding: '0.85rem 1.4rem' }}>
                    <FlaskConical style={{ width: 16, height: 16, color: '#e11d48' }} />
                    دليل التحاليل الكامل
                  </button>
                </div>

                {/* Trust row */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  {[
                    { icon: <ShieldCheck style={{ width: 15, height: 15, color: '#e11d48' }} />, text: '+150,000 تحليل معتمد' },
                    { icon: <Award style={{ width: 15, height: 15, color: '#059669' }} />, text: 'سحب عينات منزلي' },
                    { icon: <Clock style={{ width: 15, height: 15, color: '#7c3aed' }} />, text: 'النتيجة خلال 6 ساعات' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '0.35rem',
                      background: '#f8fafc', border: '1px solid #e2e8f0',
                      borderRadius: 999, padding: '0.35rem 0.75rem',
                      fontSize: '0.74rem', fontWeight: 600, color: '#334155'
                    }}>
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>

              </div>

              {/* RIGHT: Patient Portal Banner Card */}
              <div className="anim-fade-up delay-300">
                <div style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-2xl)',
                  border: '1.5px solid #fecdd3',
                  boxShadow: '0 15px 45px -15px rgba(225,29,72,0.18), 0 6px 18px rgba(0,0,0,0.04)',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'center'
                }}>
                  {/* Subtle top gradient bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                    background: 'linear-gradient(90deg, #e11d48, #f97316, #e11d48)',
                    backgroundSize: '200% 100%',
                    animation: 'borderRun 3s linear infinite'
                  }} />

                  <div style={{
                    width: 56, height: 56, borderRadius: 'var(--radius-xl)',
                    background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                    border: '1.5px solid #fecdd3',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <FileCheck2 style={{ width: 28, height: 28, color: '#e11d48' }} />
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, color: '#0f172a', fontSize: '1.2rem', margin: '0 0 0.4rem' }}>
                    بوابة نتائج التحاليل الرسمية 📑
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, fontWeight: 500, marginBottom: '1.5rem' }}>
                    استلم تقريرك الطبي المعتمَد بـ PDF وتابع حالة عيناتك فور صدورها عبر بوابة المريض الخاصة بك.
                  </p>

                  <button
                    onClick={() => setActiveTab('patient-portal')}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.92rem', padding: '0.85rem' }}
                  >
                    الدخول لبوابة المريض <ArrowLeft style={{ width: 16, height: 16 }} />
                  </button>

                  <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
                    <ShieldCheck style={{ width: 14, height: 14 }} />
                    تشفير كامل للبيانات الطبية
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ===================================================
          STATS SECTION
      =================================================== */}
      <section style={{ padding: '3.5rem 0', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="section-container">
          <style>{`
            .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
            @media(min-width:768px){ .stats-grid { grid-template-columns: repeat(4, 1fr); } }
          `}</style>
          <div className="stats-grid">
            <StatCounter value={150000} suffix="+" label="تحليل طبي معتمد أجريناه" color="#e11d48" />
            <StatCounter value={15000}  suffix="+" label="زيارة منزلية لسحب العينات" color="#7c3aed" />
            <StatCounter value={98}     suffix="%" label="معدل رضاء العملاء" color="#059669" />
            <StatCounter value={24}     suffix="/7" label="خدمة طوارئ بدون انقطاع" color="#d97706" />
          </div>
        </div>
      </section>

      {/* ===================================================
          HOW IT WORKS — 5-STEP PROCESS
      =================================================== */}
      <section style={{ padding: '5rem 0', background: '#f4f6fb' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#fff1f2', border: '1px solid #fecdd3',
              borderRadius: 999, padding: '0.4rem 1rem',
              fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#be123c',
              marginBottom: '0.875rem'
            }}>
              <Zap style={{ width: 14, height: 14 }} />
              رحلة تحليلك خطوة بخطوة
            </div>
            <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#0f172a', margin: 0 }}>
              كيف تعمل خدمة معمل الميدان؟
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.75rem', fontWeight: 500 }}>
              5 خطوات بسيطة من الحجز حتى استلام نتيجتك على هاتفك
            </p>
          </div>

          <style>{`
            .steps-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
            @media(min-width:640px){ .steps-grid { grid-template-columns: repeat(2, 1fr); } }
            @media(min-width:1024px){ .steps-grid { grid-template-columns: repeat(5, 1fr); } }
          `}</style>
          <div className="steps-grid">
            {workflowSteps.map((step, i) => (
              <div key={step.num} className="process-step anim-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                {/* Step number badge */}
                <div style={{
                  position: 'absolute', top: '0.875rem', insetInlineStart: '0.875rem',
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e11d48, #be123c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 900, color: '#fff',
                  fontFamily: 'var(--font-inter)',
                  boxShadow: '0 2px 8px rgba(225,29,72,0.3)'
                }}>{step.num}</div>
                <div style={{
                  width: 56, height: 56,
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                  border: '1.5px solid #fecdd3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#e11d48',
                  marginBottom: '0.875rem',
                  marginInlineStart: 'auto', marginInlineEnd: 'auto',
                  boxShadow: '0 4px 14px rgba(225,29,72,0.12)',
                }}>{step.icon}</div>
                <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500, lineHeight: 1.6 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          SERVICES HIGHLIGHT STRIP
      =================================================== */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        padding: '4rem 0',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-80px', insetInlineEnd: '-80px', width: 320, height: 320, borderRadius: '50%', background: 'rgba(225,29,72,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', insetInlineStart: '-60px', width: 240, height: 240, borderRadius: '50%', background: 'rgba(124,58,237,0.06)', pointerEvents: 'none' }} />

        <div className="section-container">
          <style>{`
            .services-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
            @media(min-width:640px){ .services-grid { grid-template-columns: repeat(2, 1fr); } }
            @media(min-width:1024px){ .services-grid { grid-template-columns: repeat(4, 1fr); } }
          `}</style>
          <div className="services-grid">
            {[
              { icon: <Truck style={{ width: 28, height: 28 }} />, color: '#e11d48', title: 'سحب عينات منزلي', sub: 'طاقم تمريض مؤهل يصلك خلال 30 دقيقة بالحقيبة المعقمة' },
              { icon: <Microscope style={{ width: 28, height: 28 }} />, color: '#7c3aed', title: 'أجهزة أوتوماتيك', sub: 'أجهزة كيمياء حيوية وهرمونات من ماركات Beckman & Roche' },
              { icon: <FileCheck2 style={{ width: 28, height: 28 }} />, color: '#059669', title: 'نتيجة PDF موثقة', sub: 'تقرير رقمي معتمد بـ QR Code ومعتمد من وزارة الصحة' },
              { icon: <PhoneCall style={{ width: 28, height: 28 }} />, color: '#d97706', title: 'خدمة عملاء 24/7', sub: 'استشاري طبي على الخط لشرح نتائجك في أي وقت تريد' },
            ].map((s, i) => (
              <div key={i} className="anim-fade-up" style={{
                animationDelay: `${i * 0.12}s`,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.75rem',
                transition: 'all var(--transition-base)',
                cursor: 'default'
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.background = 'rgba(255,255,255,0.08)';
                el.style.borderColor = `${s.color}40`;
                el.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.background = 'rgba(255,255,255,0.04)';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
                el.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 'var(--radius-lg)',
                  background: `${s.color}20`, border: `1px solid ${s.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.color, marginBottom: '1rem'
                }}>
                  {s.icon}
                </div>
                <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#fff', fontSize: '1rem', marginBottom: '0.4rem' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', fontWeight: 500, lineHeight: 1.65 }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          PACKAGES
      =================================================== */}
      <section style={{ padding: '5rem 0', background: '#f4f6fb' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#fff1f2', border: '1px solid #fecdd3',
              borderRadius: 999, padding: '0.4rem 1rem',
              fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#be123c',
              marginBottom: '0.875rem'
            }}>
              🔥 الأكثر طلباً
            </div>
            <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#0f172a', margin: 0 }}>
              باكات الفحص الطبي الشامل
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.75rem', fontWeight: 500 }}>
              صُمِّمت بواسطة استشاريي التحاليل الطبية لتقييم شامل لصحتك
            </p>
          </div>

          <style>{`
            .packages-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
            @media(min-width:768px){ .packages-grid { grid-template-columns: repeat(3, 1fr); } }
          `}</style>
          <div className="packages-grid">
            {packages.map((pkg, i) => (
              <div key={pkg.id} className="anim-fade-up" style={{
                animationDelay: `${i * 0.12}s`,
                background: '#fff',
                borderRadius: 'var(--radius-2xl)',
                border: pkg.popular ? `2px solid ${pkg.color}` : '1px solid #e2e8f0',
                boxShadow: pkg.popular ? `0 12px 40px ${pkg.color}20` : 'var(--shadow-sm)',
                padding: '2rem',
                position: 'relative', overflow: 'hidden',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 20px 50px ${pkg.color}25`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = pkg.popular ? `0 12px 40px ${pkg.color}20` : 'var(--shadow-sm)';
              }}>

                {/* Decorative bg circle */}
                <div style={{ position: 'absolute', top: -40, insetInlineEnd: -40, width: 120, height: 120, borderRadius: '50%', background: `${pkg.color}08`, pointerEvents: 'none' }} />

                {pkg.popular && (
                  <div style={{
                    position: 'absolute', top: '1rem', insetInlineStart: '1rem',
                    background: `linear-gradient(135deg, ${pkg.color}, #f97316)`,
                    color: '#fff', fontSize: '0.7rem', fontWeight: 800,
                    fontFamily: 'var(--font-cairo)',
                    padding: '0.25rem 0.75rem', borderRadius: 999,
                    boxShadow: `0 4px 12px ${pkg.color}40`
                  }}>
                    🔥 الأكثر طلباً
                  </div>
                )}

                {/* Professional SVG Icon Box */}
                <div style={{
                  width: 68, height: 68,
                  borderRadius: 'var(--radius-xl)',
                  background: `linear-gradient(135deg, ${pkg.color}18, ${pkg.color}08)`,
                  border: `1.5px solid ${pkg.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: pkg.color,
                  marginBottom: '1.25rem',
                  marginTop: pkg.popular ? '1.5rem' : '0',
                  boxShadow: `0 4px 16px ${pkg.color}15`,
                  position: 'relative',
                }}>
                  {/* Subtle inner glow ring */}
                  <div style={{
                    position: 'absolute', inset: 4,
                    borderRadius: 'calc(var(--radius-xl) - 4px)',
                    background: `radial-gradient(circle at 35% 35%, ${pkg.color}20, transparent 70%)`,
                    pointerEvents: 'none'
                  }} />
                  {pkg.icon}
                </div>

                <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.25rem' }}>
                  {pkg.title}
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, marginBottom: '0.875rem' }}>
                  {pkg.subtitle}
                </div>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  background: `${pkg.color}10`, border: `1px solid ${pkg.color}25`,
                  borderRadius: 999, padding: '0.25rem 0.75rem',
                  fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: pkg.color,
                  marginBottom: '0.875rem'
                }}>
                  <FlaskConical style={{ width: 13, height: 13 }} />
                  {pkg.tests}
                </div>

                <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.7, fontWeight: 500, marginBottom: '1.5rem' }}>
                  {pkg.desc}
                </p>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1.75rem', color: '#0f172a' }}>
                      {pkg.price}
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}> ج.م</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                      {pkg.original} ج.م
                    </div>
                  </div>
                  <button
                    onClick={openBookingModal}
                    style={{
                      background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}cc)`,
                      color: '#fff', fontFamily: 'var(--font-cairo)', fontWeight: 800,
                      fontSize: '0.82rem', padding: '0.65rem 1.25rem', borderRadius: 999,
                      border: 'none', cursor: 'pointer',
                      boxShadow: `0 4px 16px ${pkg.color}30`,
                      transition: 'all var(--transition-base)'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${pkg.color}45`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 16px ${pkg.color}30`; }}
                  >
                    احجز الباقة
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          HOME COLLECTION CTA BANNER
      =================================================== */}
      <section style={{ padding: '5rem 0', background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="section-container">
          <div style={{
            background: 'linear-gradient(135deg, #fff1f2 0%, #fff 40%, #eff6ff 100%)',
            border: '1.5px solid #fecdd3',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(225,29,72,0.08)'
          }}>
            {/* SVG medical cross bg watermark */}
            <svg aria-hidden="true" style={{ position: 'absolute', bottom: 0, insetInlineStart: 0, opacity: 0.04, width: 300, height: 300, pointerEvents: 'none' }} viewBox="0 0 200 200">
              <rect x="80" y="20" width="40" height="160" rx="8" fill="#e11d48" />
              <rect x="20" y="80" width="160" height="40" rx="8" fill="#e11d48" />
            </svg>

            <style>{`
              .cta-home-inner { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; }
              @media(min-width:1024px){ .cta-home-inner { grid-template-columns: 1fr 1fr; } }
            `}</style>
            <div className="cta-home-inner">
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: '#fff1f2', border: '1px solid #fecdd3',
                  borderRadius: 999, padding: '0.4rem 1rem',
                  fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#be123c',
                  marginBottom: '1rem'
                }}>
                  <Truck style={{ width: 14, height: 14 }} />
                  سحب العينات المنزلي — التغطية الكاملة
                </div>

                <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#0f172a', lineHeight: 1.25, margin: '0 0 0.875rem' }}>
                  نسحب عيناتك من باب بيتك 🚑<br />
                  <span style={{ color: '#e11d48' }}>بنفس دقة المعمل تماماً</span>
                </h2>

                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75, fontWeight: 500, marginBottom: '1.5rem' }}>
                  طاقم تمريض مؤهل، إبر معقمة أحادية الاستخدام، حقائب تبريد طبية معتمدة. كل شيء مُجهَّز لتصلك نتيجة دقيقة كأنك في الفرع.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                  {[
                    'الوصول خلال 30 دقيقة في حالات الطوارئ',
                    'تغطية كاملة: القاهرة — الجيزة — الإسكندرية',
                    'متخصصون في الأطفال وكبار السن',
                    'نتيجة PDF معتمدة ترسل على حسابك فور صدورها',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                      <CheckCircle2 style={{ width: 16, height: 16, color: '#059669', flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>

                <button onClick={openBookingModal} className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
                  <Truck style={{ width: 18, height: 18 }} />
                  احجز زيارة منزلية الآن
                </button>
              </div>

              {/* Stats on right */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {[
                  { v: '+15,000', l: 'زيارة منزلية مكتملة', c: '#e11d48' },
                  { v: '100%', l: 'تعقيم أدوات السحب', c: '#7c3aed' },
                  { v: '30 دقيقة', l: 'وقت الاستجابة للطوارئ', c: '#059669' },
                  { v: '24/7', l: 'تغطية جميع الأيام', c: '#d97706' },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: '#fff', border: '1px solid #e2e8f0',
                    borderRadius: 'var(--radius-xl)', padding: '1.5rem',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
                    <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: '1.6rem', color: s.c }}>
                      {s.v}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginTop: '0.25rem' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          TESTIMONIALS
      =================================================== */}
      <section style={{ padding: '5rem 0', background: '#f4f6fb' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#fff1f2', border: '1px solid #fecdd3',
              borderRadius: 999, padding: '0.4rem 1rem',
              fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-cairo)', color: '#be123c',
              marginBottom: '0.875rem'
            }}>
              ⭐ آراء عملائنا
            </div>
            <h2 style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', color: '#0f172a', margin: 0 }}>
              ثقة أكثر من 150,000 مريض ومريضة
            </h2>
          </div>

          <style>{`
            .testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
            @media(min-width:768px){ .testimonials-grid { grid-template-columns: repeat(3, 1fr); } }
          `}</style>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="card anim-fade-up" style={{ animationDelay: `${i * 0.12}s`, padding: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.875rem' }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} style={{ width: 16, height: 16, color: '#f59e0b', fill: '#f59e0b' }} />
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.75, fontWeight: 500, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                  &quot;{t.text}&quot;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                    border: '2px solid #fecdd3',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#e11d48', fontSize: '1rem'
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 800, color: '#0f172a', fontSize: '0.88rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          BOTTOM CTA STRIP
      =================================================== */}
      <section style={{
        background: 'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)',
        padding: '3.5rem 0',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-cairo)', fontWeight: 900, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#fff', marginBottom: '0.75rem' }}>
            مستعد تحجز تحليلك دلوقتي؟ 🩸
          </div>
          <div style={{ fontSize: '0.98rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500, marginBottom: '2rem' }}>
            سحب عينات من المنزل مجاناً — نتيجة PDF معتمدة — خدمة 24 ساعة
          </div>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={openBookingModal} style={{
              background: '#fff', color: '#be123c',
              fontFamily: 'var(--font-cairo)', fontWeight: 900,
              fontSize: '1rem', padding: '1rem 2.25rem', borderRadius: 999,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
              transition: 'all var(--transition-base)',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <Truck style={{ width: 18, height: 18 }} />
              احجز سحب عينات من المنزل
            </button>
            <button onClick={() => setActiveTab('catalog')} style={{
              background: 'rgba(255,255,255,0.15)', color: '#fff',
              fontFamily: 'var(--font-cairo)', fontWeight: 700,
              fontSize: '0.95rem', padding: '1rem 2rem', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
              transition: 'all var(--transition-base)',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              تصفح دليل التحاليل
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
