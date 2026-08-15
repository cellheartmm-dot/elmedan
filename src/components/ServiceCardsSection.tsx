import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Activity, Dna, FileText, Heart, Building2, ChevronLeft, Sparkles } from 'lucide-react';

export const ServiceCardsSection: React.FC<{ openBookingModal: () => void }> = ({ openBookingModal }) => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'home-sampling',
      title: 'سحب منزلي',
      fullTitle: 'سحب العينات من المنزل',
      badge: '24/7',
      icon: <Truck className="icon-mini-animate" style={{ width: 22, height: 22, color: '#e11d48' }} />,
      bg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
      borderColor: '#fecdd3',
      accentColor: '#e11d48',
      route: '/home-booking',
      actionType: 'modal'
    },
    {
      id: 'comprehensive-checkup',
      title: 'فحص شامل',
      fullTitle: 'تحاليل الفحص الشامل',
      badge: 'خصم 40%',
      icon: <Activity className="icon-mini-animate" style={{ width: 22, height: 22, color: '#059669' }} />,
      bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      borderColor: '#a7f3d0',
      accentColor: '#059669',
      route: '/services/comprehensive-checkup',
      actionType: 'route'
    },
    {
      id: 'hormones-markers',
      title: 'هرمونات ودلالات',
      fullTitle: 'تحاليل الهرمونات والدلالات',
      badge: 'ECLIA',
      icon: <Dna className="icon-mini-animate" style={{ width: 22, height: 22, color: '#9333ea' }} />,
      bg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
      borderColor: '#e9d5ff',
      accentColor: '#9333ea',
      route: '/services/hormones-markers',
      actionType: 'route'
    },
    {
      id: 'digital-reports',
      title: 'تقارير رقمية',
      fullTitle: 'النتائج والتقارير الرقمية',
      badge: 'QR PDF',
      icon: <FileText className="icon-mini-animate" style={{ width: 22, height: 22, color: '#2563eb' }} />,
      bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      borderColor: '#bfdbfe',
      accentColor: '#2563eb',
      route: '/services/digital-reports',
      actionType: 'route'
    },
    {
      id: 'elderly-care',
      title: 'كبار السن',
      fullTitle: 'رعاية كبار السن والحالات الخاصة',
      badge: 'بدون ألم',
      icon: <Heart className="icon-mini-animate" style={{ width: 22, height: 22, color: '#d97706' }} />,
      bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      borderColor: '#fde68a',
      accentColor: '#d97706',
      route: '/services/elderly-care',
      actionType: 'route'
    },
    {
      id: 'corporate-services',
      title: 'فحوصات شركات',
      fullTitle: 'فحوصات وتعاقدات الشركات',
      badge: 'تعاقدات',
      icon: <Building2 className="icon-mini-animate" style={{ width: 22, height: 22, color: '#0284c7' }} />,
      bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderColor: '#bae6fd',
      accentColor: '#0284c7',
      route: '/services/corporate',
      actionType: 'route'
    }
  ];

  const handleCardClick = (srv: typeof services[0]) => {
    if (srv.actionType === 'modal') {
      openBookingModal();
    } else {
      navigate(srv.route);
    }
  };

  return (
    <div style={{ marginTop: '1.5rem', marginBottom: '2.5rem', fontFamily: 'var(--font-tajawal)' }}>
      <style>{`
        .service-icon-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.65rem;
        }

        @media (min-width: 768px) {
          .service-icon-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 0.85rem;
          }
        }

        .service-icon-pill {
          position: relative;
          background: #ffffff;
          border-radius: 1.15rem;
          border: 1.5px solid var(--slate-200);
          padding: 0.85rem 0.5rem 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        @media (min-width: 640px) {
          .service-icon-pill {
            padding: 1rem 0.75rem 0.85rem;
            border-radius: 1.35rem;
          }
        }

        .service-icon-pill:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 25px -5px rgba(225, 29, 72, 0.15);
          border-color: var(--pill-accent, var(--red-400));
        }

        .service-icon-pill:active {
          transform: scale(0.97);
        }

        .service-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.45rem;
          transition: all 0.25s ease;
          position: relative;
        }

        @media (min-width: 640px) {
          .service-icon-circle {
            width: 50px;
            height: 50px;
            margin-bottom: 0.55rem;
          }
        }

        .service-icon-pill:hover .service-icon-circle {
          transform: scale(1.1) rotate(-4deg);
        }

        .service-icon-name {
          font-family: var(--font-cairo);
          font-weight: 800;
          font-size: 0.78rem;
          color: #0f172a;
          line-height: 1.25;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        @media (min-width: 640px) {
          .service-icon-name {
            font-size: 0.88rem;
          }
        }

        .service-icon-badge {
          font-family: var(--font-cairo);
          font-size: 0.6rem;
          font-weight: 800;
          padding: 0.12rem 0.45rem;
          border-radius: 999px;
          margin-top: 0.3rem;
          line-height: 1.2;
          display: inline-block;
        }

        @media (min-width: 640px) {
          .service-icon-badge {
            font-size: 0.65rem;
            padding: 0.15rem 0.55rem;
          }
        }
      `}</style>

      {/* Section Header Title & Badge */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
          border: '1px solid #fecdd3', borderRadius: 999,
          padding: '0.3rem 0.9rem', fontSize: '0.75rem', fontWeight: 800,
          color: '#e11d48', fontFamily: 'var(--font-cairo)',
          marginBottom: '0.35rem', boxShadow: '0 2px 8px rgba(225,29,72,0.06)'
        }}>
          <Sparkles style={{ width: 13, height: 13 }} />
          خدمات معمل الميدان الطبية
        </div>
      </div>

      {/* Compact Mini-Icon Grid */}
      <div className="service-icon-grid">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="service-icon-pill"
            style={{ '--pill-accent': srv.accentColor } as React.CSSProperties}
            onClick={() => handleCardClick(srv)}
            title={srv.fullTitle}
          >
            {/* Circular Icon Bubble */}
            <div
              className="service-icon-circle"
              style={{
                background: srv.bg,
                border: `1.5px solid ${srv.borderColor}`,
                boxShadow: `0 3px 10px ${srv.accentColor}18`
              }}
            >
              {srv.icon}
            </div>

            {/* Title */}
            <div className="service-icon-name">
              {srv.title}
            </div>

            {/* Small Badge */}
            <span
              className="service-icon-badge"
              style={{
                background: srv.bg,
                color: srv.accentColor,
                border: `1px solid ${srv.borderColor}`
              }}
            >
              {srv.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};


