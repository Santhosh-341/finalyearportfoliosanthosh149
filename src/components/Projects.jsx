import { useRef } from 'react';

const projects = [
  {
    id: 1,
    featured: true,
    year: '01 / 2025',
    status: 'Live',
    statusClass: 'live',
    title: 'Agriculture Equipment Booking System',
    description: 'A full-stack booking platform for farmers to reserve tractors and equipment, with owner dashboards, calendar scheduling, and role-based flow management.',
    tags: ['MERN', 'MySQL', 'REST APIs', 'Dashboard'],
    link: '#contact',
    linkText: 'Explore the build',
    codeSnippet: 'const booking = await createBooking({\n  userId, equipmentId, slot\n});',
    glyph: '🚜',
  },
  {
    id: 2,
    featured: false,
    year: '02 / 2024',
    status: 'Beta',
    statusClass: 'beta',
    title: 'Notes API',
    description: 'A clean Node.js and Express API with MySQL persistence for CRUD operations, tested with Postman and designed for straightforward app integration.',
    tags: ['Node.js', 'Express', 'MySQL', 'Postman'],
    link: '#contact',
    linkText: 'View details',
    codeSnippet: 'GET /notes/:id',
    glyph: '📝',
  },
  {
    id: 3,
    featured: false,
    year: '03 / 2024',
    status: 'Live',
    statusClass: 'live',
    title: 'Personal Portfolio',
    description: 'A responsive portfolio site built with semantic HTML, CSS, and vanilla JavaScript, focused on motion, clarity, and strong presentation.',
    tags: ['HTML', 'CSS', 'JS', 'Responsive'],
    link: '#contact',
    linkText: 'Open case study',
    codeSnippet: '<section class="hero">',
    glyph: '💼',
  },
  {
    id: 4,
    featured: false,
    year: '04 / 2023',
    status: 'Archived',
    statusClass: 'archived',
    title: 'Weather App',
    description: 'A lightweight JavaScript app that fetches real-time weather data and displays location-based conditions with a tidy interface.',
    tags: ['JavaScript', 'Fetch API', 'UI', 'Geolocation'],
    link: '#contact',
    linkText: 'See concept',
    codeSnippet: 'fetchWeather(city)',
    glyph: '🌤️',
  },
  {
    id: 5,
    featured: false,
    year: '05 / 2024',
    status: 'Beta',
    statusClass: 'beta',
    title: 'Task Manager',
    description: 'A practical task management app connecting a React frontend with a Node.js and Express backend and MySQL data layer.',
    tags: ['React', 'Node.js', 'Express', 'MySQL'],
    link: '#contact',
    linkText: 'Read more',
    codeSnippet: 'todos.map(task => ...)',
    glyph: '✅',
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
      <a className="project-link" href={project.link}>
        {project.linkText} <span className="arrow">→</span>
      </a>
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
