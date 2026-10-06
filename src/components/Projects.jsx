import { useRef } from 'react';

const projects = [
  {
    id: 1,
    featured: true,
    year: '01 / 2025',
    status: 'Live',
    statusClass: 'live',
    title: 'Agrigold | Agriculture Equipment Booking System',
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
    description: 'A responsive  personal portfolio built with React.js to showcase projects, skills, and experience.',
    tags: ['React.js', 'Responsive UI'],
    versions: [
      {
        label: 'Personal Portfolio',
        github: 'https://github.com/Santhosh-341/finalyearportfoliosanthosh149.git',
      },
    ],
    codeSnippet: '<Portfolio language="hi" />',
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
    versions: [
      {
        label: 'Aura Weather App',
        github: 'https://github.com/Santhosh-341/weather-final.git',
        live: 'https://weatherpredictiion.netlify.app/',
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
      <h4 className="project-subtitle">Tech stack</h4>
      <div className="tag-row">
        {project.tags.map((tag, idx) => (
          <span key={idx} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="project-access" aria-label={`${project.title} links`}>
        <h4 className="project-access-heading">Project links</h4>
        <div className="project-access-options">
          {project.versions.map((version) => (
            <div className="project-access-version" key={version.label}>
              <h4>{version.label}</h4>
              <div className="project-link-actions">
                {version.live && (
                  <a className="project-link-tile" href={version.live} target="_blank" rel="noreferrer">
                    <span className="project-link-label">Live site</span>
                    <span className="project-link-type">Open project</span>
                    <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                )}
                {version.github && (
                  <a className="project-link-tile" href={version.github} target="_blank" rel="noreferrer">
                    <span className="project-link-label">GitHub</span>
                    <span className="project-link-type">Source code</span>
                    <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
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
