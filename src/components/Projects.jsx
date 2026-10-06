import { useRef } from 'react';

const projects = [
  {
    id: 1,
    featured: true,
    year: '01 / 2025',
    status: 'Live',
    statusClass: 'live',
    title: 'Agrigo | Agriculture Equipment Booking',
    description: 'A full-stack booking platform for farmers to reserve tractors and equipment, with owner dashboards, calendar scheduling, and role-based flow management.',
    tags: ['MERN', 'MySQL', 'REST APIs', 'Dashboard'],
    versions: [
      {
        label: 'Farmer side',
        live: 'https://agrigo-user.netlify.app/',
        github: 'https://github.com/Santhosh-341/agrigo-project-user',
      },
      {
        label: 'Owner side',
        live: 'https://agrigo-owner-project.netlify.app/',
        github: 'https://github.com/Santhosh-341/agrigo-project-owner',
      },
    ],
    codeSnippet: 'const booking = await createBooking({\n  userId, equipmentId, slot\n});',
    glyph: '🚜',
  },
  {
    id: 2,
    featured: false,
    year: '03 / 2024',
    status: 'Live',
    statusClass: 'live',
    title: 'Personal Portfolio',
    description: 'A responsive portfolio site built with semantic HTML, CSS, and vanilla JavaScript, focused on motion, clarity, and strong presentation.',
    tags: ['HTML', 'CSS', 'JS', 'Responsive'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/Santhosh-341/finalyearportfoliosanthosh149.git',
      },
    ],
    codeSnippet: '<section class="hero">',
    glyph: '💼',
  },
  {
    id: 3,
    featured: false,
    year: '04 / 2023',
    status: 'Live',
    statusClass: 'live',
    title: 'Aura | Live Atmospheric Engine',
    description: 'A weather app that brings live atmospheric conditions to a clean, location-aware interface.',
    tags: ['Weather', 'Live Data', 'JavaScript', 'UI'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/Santhosh-341/weather-final.git',
      },
      {
        label: 'Live site',
        href: 'https://weatherpredictiion.netlify.app/',
      },
    ],
    codeSnippet: 'fetchWeather(city)',
    glyph: '🌤️',
  },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);

    const rx = (y / rect.height - 0.5) * -8;
    const ry = (x / rect.width - 0.5) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = '';
  };

  return (
    <article
      ref={cardRef}
      className={`project-card reveal ${project.featured ? 'featured' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-top">
        <span className="project-year">{project.year}</span>
        <span className={`status ${project.statusClass}`}>
          <span className="dot"></span>
          {project.status}
        </span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-row">
        {project.tags.map((tag, idx) => (
          <span key={idx} className="tag">
            {tag}
          </span>
        ))}
      </div>
      {project.versions ? (
        <details className="project-access">
          <summary>Open project links</summary>
          <div className="project-access-options">
            {project.versions.map((version) => (
              <div className="project-access-version" key={version.label}>
                <h4>{version.label}</h4>
                <a href={version.live} target="_blank" rel="noreferrer">
                  Live site <span className="arrow">→</span>
                </a>
                <a href={version.github} target="_blank" rel="noreferrer">
                  GitHub <span className="arrow">→</span>
                </a>
              </div>
            ))}
          </div>
        </details>
      ) : project.links ? (
        <div className="project-link-group">
          {project.links.map((link) => (
            <a className="project-link" href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              {link.label} <span className="arrow">→</span>
            </a>
          ))}
        </div>
      ) : (
        <a className="project-link" href={project.link}>
          {project.linkText} <span className="arrow">→</span>
        </a>
      )}
      <div className="project-visual">
        <div className="code-snippet">{project.codeSnippet}</div>
        <div className="glyph">{project.glyph}</div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="container" id="projects">
      <h2 className="section-title word-reveal">
        Selected work
      </h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
