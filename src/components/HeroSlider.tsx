import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, ShieldCheck, Award, Clock, Truck, FlaskConical, Sparkles, Play, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SlideItem {
  id: string;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  highlightText: string;
  ctaText: string;
  ctaAction: string;
}

export const HeroSlider: React.FC<{ openBookingModal: () => void }> = ({ openBookingModal }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const slides: SlideItem[] = [
    {
      id: 'slide-1',
      image: '/photo/modern_lab_equipment.jpg',
      badge: 'معتمد ISO 15189 · دقة تشخيصية متناهية',
      title: 'معمل الميدان للتحاليل الطبية',
      subtitle: 'أحدث التجهيزات والتقنيات المخبرية لمعايرة سحب التحاليل وإظهار النتائج بدقة فائقة وفق المعايير الدولية.',
      highlightText: 'دقة وتكنولوجيا تضاهي المعامل العالمية',
      ctaText: 'احجز سحب عينات منزلي 🚑',
      ctaAction: 'booking'
    },
    {
      id: 'slide-2',
      image: '/photo/doctor_microscope.jpg',
      badge: 'فحوصات ميكروسكوبية ودقيقة 🔬',
      title: 'استشاريون متخصصون في التشخيص الطبي',
      subtitle: 'فحص ميكروسكوبي وتوثيق بواسطة نخبة من كبار أطباء واستشاريي تحاليل الأنسجة وأمراض الدم في مصر.',
      highlightText: 'اعتماد ومراجعة ثلاثية للنتائج الطبية',
      ctaText: 'دليل التحاليل الكامل 📑',
      ctaAction: 'catalog'
    },
    {
      id: 'slide-3',
      image: '/photo/nurse_home_collection.jpg',
      badge: 'سحب عينات منزلية مجاناً 🚑',
      title: 'عنايتك تصلك حتى باب المنزل في 30 دقيقة',
      subtitle: 'طاقم تمريض مؤهل بسنانير معقمة جاهز للوصول إليك في كافة مناطق القاهرة والجيزة وسحب العينات بسلامة كاملة.',
      highlightText: 'خدمة سريعة في مكانك بكل راحة وأمان',
      ctaText: 'احجز زيارة منزلية الآن 🚑',
      ctaAction: 'booking'
    },
    {
      id: 'slide-4',
      image: '/photo/lab_specialist.jpg',
      badge: 'أحدث أجهزة الكيمياء والهرمونات 🧪',
      title: 'نتائج فورية جاهزة بـ PDF خلال ساعات',
      subtitle: 'ربط مباشر بأحدث أجهزة التحليل الرقمي بالكمبيوتر لضمان ظهور نتيجتك بسرعة فائقة مع التحميل المباشر للتقرير.',
      highlightText: 'استلام النتيجة فوراً عبر أكونتك الخاص',
      ctaText: 'استعلام نتيجتك 📑',
      ctaAction: 'portal'
    },
    {
      id: 'slide-5',
      image: '/photo/lab_photo_3.jpg',
      badge: 'خصومات مميزة وحزم تحاليل شاملة 💳',
      title: 'باقات الفحص الدوري الشامل للعائلة',
      subtitle: 'وفر حتى 40% على بوب فحص السكر والدهون والوظائف الحيوية واطمئن على صحتك وصحة أسرتك.',
      highlightText: 'أفضل أسعار التحاليل الطبية في مصر',
      ctaText: 'استعرض دليل الأسعار والباقات',
      ctaAction: 'catalog'
    }
  ];

  // Auto transition timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleCtaClick = (action: string) => {
    if (action === 'booking') {
      openBookingModal();
    } else if (action === 'catalog') {
      navigate('/catalog');
    } else if (action === 'portal') {
      navigate('/patient-portal');
    }
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext(); // swipe left (next in RTL)
    if (diff < -50) handlePrev(); // swipe right (prev in RTL)
    touchStartX.current = null;
  };

  return (
    <div 
      className="hero-slider-container"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(380px, 70vw, 560px)',
        borderRadius: 'var(--radius-2xl, 1.5rem)',
        overflow: 'hidden',
        boxShadow: '0 20px 50px -15px rgba(0,0,0,0.18), 0 8px 24px rgba(225,29,72,0.12)',
        border: '1px solid rgba(225,29,72,0.15)',
        background: '#0f172a',
        fontFamily: 'var(--font-tajawal)'
      }}
    >
      <style>{`
        .slider-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.35);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
        @media (min-width: 640px) {
          .slider-arrow-btn {
            width: 44px;
            height: 44px;
          }
        }
        .slider-arrow-btn:hover {
          background: #e11d48;
          transform: translateY(-50%) scale(1.08);
        }
        .slide-text-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .slide-text-clamp {
            -webkit-line-clamp: 3;
          }
        }
      `}</style>

      {/* Slides images and content */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              visibility: isActive ? 'visible' : 'hidden',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s ease',
              transform: isActive ? 'scale(1)' : 'scale(1.04)',
              zIndex: isActive ? 2 : 1
            }}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />

            {/* Dark & Crimson Gradient Overlays */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(130deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.65) 50%, rgba(225,29,72,0.3) 100%)'
            }} />

            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.3) 50%, transparent 100%)'
            }} />

            {/* Slide Content Box */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(1rem, 5vw, 3.5rem)',
              paddingBottom: 'clamp(3rem, 7vw, 4.5rem)',
              maxWidth: '48rem',
              color: '#fff',
              zIndex: 10
            }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: 'linear-gradient(135deg, rgba(225,29,72,0.92), rgba(190,18,60,0.98))',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '999px',
                padding: '0.35rem 0.85rem',
                fontSize: 'clamp(0.68rem, 1.8vw, 0.78rem)',
                fontWeight: 800,
                fontFamily: 'var(--font-cairo)',
                boxShadow: '0 4px 15px rgba(225,29,72,0.4)',
                width: 'fit-content',
                marginBottom: '0.75rem',
                animation: isActive ? 'fadeInUp 0.6s ease' : 'none'
              }}>
                <Sparkles style={{ width: 13, height: 13, color: '#fef08a' }} />
                <span>{slide.badge}</span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: 'var(--font-cairo)',
                fontWeight: 900,
                fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
                lineHeight: 1.25,
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                margin: '0 0 0.5rem',
                animation: isActive ? 'fadeInUp 0.7s ease' : 'none'
              }}>
                {slide.title}
              </h2>

              {/* Subtitle */}
              <p className="slide-text-clamp" style={{
                fontSize: 'clamp(0.78rem, 1.8vw, 1rem)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
                fontWeight: 500,
                marginBottom: '1.25rem',
                maxWidth: '38rem',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                animation: isActive ? 'fadeInUp 0.8s ease' : 'none'
              }}>
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '0.65rem', alignItems: 'center',
                animation: isActive ? 'fadeInUp 0.9s ease' : 'none'
              }}>
                <button
                  onClick={() => handleCtaClick(slide.ctaAction)}
                  className="btn-primary"
                  style={{
                    fontSize: 'clamp(0.78rem, 2vw, 0.92rem)',
                    padding: '0.65rem 1.25rem',
                    boxShadow: '0 8px 25px rgba(225,29,72,0.45)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {slide.ctaText}
                </button>

                <button
                  onClick={() => navigate('/catalog')}
                  className="btn-secondary"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.8vw, 0.88rem)',
                    padding: '0.65rem 1.1rem',
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(10px)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  دليل الفحوصات 🔬
                </button>
              </div>

            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="slider-arrow-btn"
        style={{ insetInlineEnd: '0.75rem' }}
      >
        <ChevronRight style={{ width: 18, height: 18 }} />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="slider-arrow-btn"
        style={{ insetInlineStart: '0.75rem' }}
      >
        <ChevronLeft style={{ width: 18, height: 18 }} />
      </button>

      {/* Pagination Dots & Controls */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(15,23,42,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '0.35rem 0.75rem',
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.18)'
      }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              height: 6,
              width: idx === currentSlide ? 22 : 6,
              borderRadius: 999,
              background: idx === currentSlide ? '#e11d48' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0
            }}
          />
        ))}

        <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)', margin: '0 0.15rem' }} />

        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', display: 'flex', padding: 0 }}
        >
          {isAutoPlaying ? <Pause style={{ width: 12, height: 12 }} /> : <Play style={{ width: 12, height: 12 }} />}
        </button>
      </div>

    </div>
  );
};

