import { useState } from 'react';

const experiences = [
  {
    id: 'csc',
    role: 'MERN Stack Intern',
    company: 'Council for Skills and Competencies (CSC India)',
    date: 'May 4, 2026 — June 27, 2026',
    summary: 'Selected for a prestigious virtual MERN Stack internship under the joint AICTE-APSCHE Student Internship Initiative. Gained exposure to industry-relevant tools and hands-on experience under the guidance of expert mentors. Developed robust full-stack features using MongoDB, Express.js, React, and Node.js, focused on implementing practical learning concepts and modular project solutions.',
    bullets: [
      'Gained hands-on experience in full-stack architecture using the MERN Stack (MongoDB, Express, React, Node).',
      'Modeled database schemas and built secure REST APIs under the AICTE-APSCHE Student Initiative guidelines.',
      'Developed and connected modular React components with server-side database endpoints.',
      'Guided by expert industry mentors through structured learning modules and code review workflows.',
      'Completed practical assignments and earned official certification from CSC India.'
    ],
    mediaType: 'pdf',
    pdf: '/assets/csc_india_offer.pdf',
    badge: 'AICTE - APSCHE Student Internship Program Verified'
  },
  {
    id: 'elevate',
    role: 'Web Development Intern',
    company: 'Elevate Labs',
    date: 'May 28, 2026 — July 15, 2026',
    summary: 'Demonstrated high proficiency in front-end design, working closely with the development team to ship production-grade user interfaces. Contributed actively to designing responsive layouts and modular website structures while implementing user-friendly elements using HTML, CSS, JavaScript, and React. Consistently maintained a high level of accountability, resulting in being awarded the Best Performer title for outstanding output.',
    bullets: [
      'Developed and optimized front-end features using HTML5, CSS3, JavaScript, and React.',
      'Built clean, responsive web layouts using mobile-first grid and flexbox methodologies.',
      'Collaborated with senior developers on real-time projects and interface refactoring.',
      'Earned a "Best Performer" accolade for dedication and contribution to Web Development projects.',
      'Verified and accepted official Offer Letter and Completion Certificate under MSME / Skill India standards.'
    ],
    mediaType: 'pdf',
    pdf: '/assets/elevate_credentials.pdf',
    badge: 'Best Performer Award Recipient & Government of India MSME/Skill India Verified'
  },
  {
    id: 'hackathon',
    role: 'Hackathon Selection Winner',
    company: 'Audisankara University Hackathon',
    date: 'August 8, 2026',
    summary: 'Participated in the prestigious National-Level Hackathon at Audisankara University, Nellore. Selected during this intensive competitive hacking sprint by the executive panel of SkyWeb IT Solutions Private Limited, who participated as jury members. Recognized for outstanding programming skills, algorithmic thinking, and dynamic team participation, securing an immediate internship offer.',
    bullets: [
      'Competed in a high-pressure National-Level Hackathon against technical teams.',
      'Designed and pitched an innovative full-stack project prototype within the timed sprint.',
      'Selected directly by the SkyWeb IT Solutions executive panel (Jury Members) for a professional internship.',
      'Honored for exceptional technical performance, teamwork, and quick problem-solving abilities.',
      'Acquired a direct invitation to join SkyWeb\'s 3-month Internship and Training program.'
    ],
    mediaType: 'pdf',
    pdf: '/assets/skyweb_offer.pdf',
    badge: 'Direct Placement Offer via Jury Board Selection'
  },
  {
    id: 'skyweb',
    role: 'Web Developer Intern & Trainee',
    company: 'SkyWeb IT Solutions Pvt Ltd',
    date: 'Sept 17, 2026 — Dec 19, 2026',
    summary: 'Completed a comprehensive 3-month unpaid internship and training program, undergoing 42 scheduled days of practical, industry-oriented learning. Worked extensively on technical modules, weekly assignments, and real-time live projects. Gained hands-on experience under professional industry guidance, focusing on backend API reliability, relational database systems (MySQL), and MERN stack features.',
    bullets: [
      'Undertook 42 days of intensive, professional-led web training sessions (3 days/week).',
      'Designed and implemented live projects using relational database schemas and API integrations.',
      'Gained hands-on expertise in backend modeling, MySQL databases, and secure RESTful servers.',
      'Followed corporate professional conduct guidelines and worked on real-world team codebases.',
      'Verified through a signed Acceptance Offer Letter and eligible for professional job referrals.'
    ],
    mediaType: 'pdf',
    pdf: '/assets/skyweb_offer.pdf',
    badge: '42 Scheduled Days of Industry Training & Relational Database Live Projects'
  }
];

export default function Experience() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (id) => {
    setActiveModal(id);
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset'; // Unlock background scrolling
  };

  const currentExp = experiences.find(e => e.id === activeModal);

  return (
    <section className="container" id="experience">
      <h2 className="section-title word-reveal">
        Professional Journey
      </h2>
      
      <div className="experience-map-container">
        {/* Glowing map timeline path */}
        <div className="timeline-path"></div>
        
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-map-item">
            {/* Timeline dot/node */}
            <div className={`map-node ${activeModal === exp.id ? 'active' : ''}`}></div>
            
            <div className="experience-card-wrap reveal">
              <div className="experience-card-header">
                <h3>{exp.role}</h3>
                <span className="date-badge">{exp.date}</span>
              </div>
              <span className="experience-card-company">{exp.company}</span>
              <p className="experience-card-summary">{exp.summary}</p>
              <button className="btn-more" onClick={() => openModal(exp.id)}>
                More... <span style={{ fontSize: '0.9rem' }}>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox details modal overlay */}
      {activeModal && currentExp && (
        <div className="experience-modal-overlay" onClick={closeModal}>
          <div className="experience-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">✕</button>
            
            {/* Left Column: Text description, list details, metadata badges */}
            <div className="modal-details-col">
              <div>
                <span className="experience-card-company" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{currentExp.company}</span>
                <h2 style={{ margin: '0 0 16px 0', fontSize: '1.8rem', fontWeight: '800', color: '#ffffff' }}>{currentExp.role}</h2>
                <span className="date-badge" style={{ display: 'inline-block' }}>{currentExp.date}</span>
              </div>

              <div>
                <h4 style={{ margin: '0 0 10px 0', color: 'var(--cyan)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Project Overview</h4>
                <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: '1.7', fontSize: '0.95rem' }}>{currentExp.summary}</p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 12px 0', color: 'var(--cyan)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Core Activities & Achievements</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '10px' }}>
                  {currentExp.bullets.map((b, i) => (
                    <li key={i} style={{ color: 'var(--text-soft)', lineHeight: '1.6', fontSize: '0.95rem' }}>{b}</li>
                  ))}
                </ul>
              </div>

              {currentExp.badge && (
                <div style={{
                  background: 'rgba(34, 211, 238, 0.04)',
                  border: '1px dashed rgba(34, 211, 238, 0.25)',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: 'auto'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🏆</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: '600', lineHeight: '1.4' }}>{currentExp.badge}</span>
                </div>
              )}
            </div>

            {/* Right Column: Media view (images or scrollable PDF iframe!) */}
            <div className="modal-media-col">
              {currentExp.mediaType === 'images' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                  {currentExp.images.map((img, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-soft)', fontWeight: '600' }}>
                        {i === 0 ? 'Official Offer Letter' : 'Completion Certificate'}
                      </span>
                      <img src={img} alt={`${currentExp.company} Document`} className="media-frame-img" />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-soft)', fontWeight: '600' }}>
                    Internship Offer Letter & Terms
                  </span>
                  <iframe
                    src={`${currentExp.pdf}#toolbar=0`}
                    title={`${currentExp.company} PDF Document`}
                    className="media-iframe-pdf"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
