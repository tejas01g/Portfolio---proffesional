import { useEffect, useState } from 'react'
import './App.css'

const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const PROJECTS = [
  {
    tag: 'Featured',
    name: 'DevSocial',
    status: 'Live — Closed Beta',
    statusType: 'live',
    year: '2025 — Present',
    desc:
      "A social platform built for developers. Real-time chat, follow graphs, coding-profile badges, and AI-powered content moderation — published to the Play Store with every Firestore rule and push notification built from scratch.",
    stack: ['React Native CLI', 'Firebase', 'Firestore', 'Groq API', 'Cloud Functions', 'TypeScript'],
    points: [
      'Real-time chat with rich post-share preview bubbles',
      'Follow/unfollow on a subcollection-based architecture',
      'Content moderation via Groq + Google Cloud Vision',
      'OTA update strategy and an IST-aware streak system',
    ],
    github: 'https://github.com/tejas01g/devsocial',
    demoVideo: 'https://drive.google.com/file/d/1QHK8-VxV00SKLDHF7Z3AxE-bw2JFO8vR/view?usp=drivesdk',
  },
  {
    tag: 'Featured',
    name: 'Expensr',
    status: 'In Build',
    statusType: 'build',
    year: '2025 — Present',
    desc:
      "An expense tracker that reads bank SMS so you never type a transaction by hand. Regex-parsed Indian banking formats, Gemini-powered categorization, and monthly budgets that carry over automatically.",
    stack: ['React Native CLI', 'Firebase', 'Gemini API', 'TypeScript', 'Zustand'],
    points: [
      'SMS-parsing engine built for Indian bank formats',
      'Gemini API auto-categorizes every transaction',
      'Per-month Firestore budget documents',
      'Fully typed service and screen layer',
    ],
    github: 'https://github.com/tejas01g/expensr',
    demoVideo: 'https://drive.google.com/file/d/YOUR_EXPENSR_FILE_ID/preview',
  },
  {
    tag: 'Web',
    name: 'Portfolio Site',
    status: 'Shipped',
    statusType: 'shipped',
    year: '2025',
    desc:
      'An earlier personal site built to get work in front of recruiters fast — glassmorphism aesthetic, deployed and iterated on in public.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    points: [
      'Vite + Tailwind build, deployed on Vercel & Netlify',
      'Framer Motion micro-interactions throughout',
      'Resolved cross-browser z-index and scroll issues',
    ],
    github: 'https://github.com/tejas01g/portfolio',
    demoVideo: 'https://drive.google.com/file/d/YOUR_PORTFOLIO_FILE_ID/preview',
  },
]

const TOOLBOX = [
  {
    group: 'AI Development',
    blurb: 'How I actually build, day to day',
    items: ['Claude Code', 'Cursor', 'Google Antigravity', 'ChatGPT', 'Prompt Engineering'],
  },
  {
    group: 'Mobile',
    blurb: 'Where most of my shipped work lives',
    items: ['React Native CLI', 'TypeScript', 'Flutter', 'Zustand', 'Redux'],
  },
  {
    group: 'Backend & Cloud',
    blurb: 'The plumbing behind every app',
    items: ['Firebase Auth', 'Firestore', 'Cloud Functions', 'FCM', 'Node.js'],
  },
  {
    group: 'AI APIs',
    blurb: 'Powering features, not just code',
    items: ['Groq API', 'Gemini API'],
  },
  {
    group: 'Web',
    blurb: 'For sites, dashboards & tools',
    items: ['React.js', 'Vite', 'Tailwind CSS'],
  },
]

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const handler = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [ids])
  return active
}

function App() {
  const active = useScrollSpy(NAV_LINKS.map((l) => l.id))
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDemo, setActiveDemo] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!activeDemo) return
    const onKey = (e) => { if (e.key === 'Escape') setActiveDemo(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeDemo])

  return (
    <>
      <header className={`topbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="topbar__inner">
          <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
            Tejasvi Garg
          </a>

          <nav className="nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                className={`navlink ${active === link.id ? 'is-active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a className="btn btn--primary btn--sm nav-cta" href="/TEJASVI-RESUME-FINAL.pdf" download>
            Resume
          </a>

          <button
            className="burger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobilemenu">
            {NAV_LINKS.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}>{link.label}</button>
            ))}
            <a className="btn btn--primary" href="/Tejasvi_Garg_Resume.docx" download>Download Resume</a>
          </div>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero__bg" aria-hidden="true" />
          <div className="hero__inner">
            <div className="hero__copy">
              <span className="badge">
                <span className="badge__dot" /> Open to work
              </span>
              <h1 className="hero__title">
                AI App Developer building
                <span className="hero__title-accent"> products that ship.</span>
              </h1>
              <p className="hero__desc">
                I'm Tejasvi — a React Native &amp; full-stack developer from Hapur, India.
                MCA 2026 graduate, promoted from intern to full-time mobile developer in
                three months. I build with AI-native tools — Claude Code, Cursor, and
                Gemini — to ship production apps faster without cutting corners.
              </p>
              <div className="hero__actions">
                <button className="btn btn--primary" onClick={() => scrollTo('work')}>
                  View my work
                </button>
                <button className="btn btn--ghost" onClick={() => scrollTo('contact')}>
                  Get in touch
                </button>
              </div>

              <div className="hero__meta">
                <div className="meta__item"><strong>Hapur, India</strong><span>Based in</span></div>
                <div className="meta__divider" />
                <div className="meta__item"><strong>github.com/tejas01g</strong><span>GitHub</span></div>
                <div className="meta__divider" />
                <div className="meta__item"><strong>@tejasviyt</strong><span>YouTube</span></div>
              </div>
            </div>

            <div className="hero__visual">
              <div className="photo-frame">
                <img src="/tejasvi.png" alt="Tejasvi Garg" />
              </div>
              <div className="floatcard floatcard--top">
                <span className="floatcard__num">3 mo</span>
                <span className="floatcard__label">Intern → Full-Time</span>
              </div>
              <div className="floatcard floatcard--bottom">
                <span className="floatcard__num">2</span>
                <span className="floatcard__label">Apps in active build</span>
              </div>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="section">
          <SectionHead eyebrow="Selected Work" title="Things I've built" desc="Three projects, from production app to personal tools." />

          <div className="projects">
            {PROJECTS.map((p) => (
              <article className="project-card" key={p.name}>
                <div className="project-card__head">
                  <span className="tag">{p.tag}</span>
                  <span className={`status status--${p.statusType}`}>
                    <span className="status__dot" /> {p.status}
                  </span>
                </div>

                <h3 className="project-card__name">{p.name}</h3>
                <p className="project-card__year">{p.year}</p>
                <p className="project-card__desc">{p.desc}</p>

                <ul className="project-card__points">
                  {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>

                <div className="project-card__stack">
                  {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>

                <div className="project-card__actions">
                  <button
                    className="btn btn--primary btn--sm project-action"
                    onClick={() => setActiveDemo(p)}
                  >
                    <PlayIcon /> Live Demo
                  </button>
                  <a
                    className="btn btn--ghost btn--sm project-action"
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon /> GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* TOOLBOX */}
        <section id="toolbox" className="section section--dark">
          <SectionHead
            eyebrow="Toolbox"
            title="How I build"
            desc="AI-native development is core to my workflow — not an afterthought."
            inverted
          />

          <div className="toolgrid">
            {TOOLBOX.map((t) => (
              <div className={`toolcard ${t.group === 'AI Development' ? 'toolcard--highlight' : ''}`} key={t.group}>
                <h4>{t.group}</h4>
                <p>{t.blurb}</p>
                <div className="toolcard__items">
                  {t.items.map((item) => <span className="chip chip--dark" key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <SectionHead eyebrow="About" title="A bit more context" />

          <div className="about">
            <div className="about__text">
              <p>
                I'm a React Native and full-stack developer based in Hapur, India —
                an MCA 2026 graduate from SRM University. I started as an intern at
                Vimovi Global Tech and was promoted to full-time Mobile App Developer
                within three months, building Pyngyn, a SaaS project-management app,
                from onboarding flows to real-time dashboards.
              </p>
              <p>
                Outside client work, I build my own products end to end — DevSocial
                and Expensr both run on Firebase architecture I designed myself,
                security rules included. I lean heavily on AI-assisted development —
                Claude Code and Cursor for implementation, prompt engineering to get
                consistent results from LLM APIs in production. I also co-authored a
                research paper on Scalable General AI (SGAI) Systems, and document
                the build process on YouTube.
              </p>
            </div>

            <div className="facts">
              <div className="fact">
                <span className="fact__icon">🎓</span>
                <div>
                  <strong>MCA, SRM University</strong>
                  <span>Class of 2026</span>
                </div>
              </div>
              <div className="fact">
                <span className="fact__icon">🚀</span>
                <div>
                  <strong>Intern → Full-Time in 3 months</strong>
                  <span>Vimovi Global Tech Pvt. Ltd.</span>
                </div>
              </div>
              <div className="fact">
                <span className="fact__icon">📄</span>
                <div>
                  <strong>Co-author, research paper</strong>
                  <span>Scalable General AI (SGAI) Systems</span>
                </div>
              </div>
              <div className="fact">
                <span className="fact__icon">🛠️</span>
                <div>
                  <strong>2 self-built apps</strong>
                  <span>In active development</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section section--cta">
          <div className="cta">
            <span className="badge badge--light">
              <span className="badge__dot" /> Open to work
            </span>
            <h2 className="cta__title">Let's build something together.</h2>
            <p className="cta__desc">
              Hiring a React Native or AI app developer? Got a product idea?
              I'd love to hear about it.
            </p>
            <a className="cta__email" href="mailto:gargtejasvi076@gmail.com">
              gargtejasvi076@gmail.com
            </a>

            <div className="cta__links">
              <a href="https://github.com/tejas01g" target="_blank" rel="noreferrer" className="iconlink">GitHub</a>
              <a href="https://linkedin.com/in/tejasvigarg" target="_blank" rel="noreferrer" className="iconlink">LinkedIn</a>
              <a href="https://youtube.com/@tejasviyt" target="_blank" rel="noreferrer" className="iconlink">YouTube</a>
              <a href="/TEJASVI-RESUME-FINAL.pdf" download className="iconlink">Resume</a>
            </div>
          </div>
        </section>
      </main>

      {activeDemo && (
        <div
          className="demo-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeDemo.name} demo video`}
          onClick={(e) => { if (e.target === e.currentTarget) setActiveDemo(null) }}
        >
          <div className="demo-modal">
            <div className="demo-modal__head">
              <div>
                <span className="demo-modal__eyebrow">Live Demo</span>
                <h3>{activeDemo.name}</h3>
              </div>
              <button
                className="demo-modal__close"
                aria-label="Close demo video"
                onClick={() => setActiveDemo(null)}
              >
                ✕
              </button>
            </div>

            <div className="demo-modal__frame">
              <iframe
                key={activeDemo.demoVideo}
                src={activeDemo.demoVideo}
                className="demo-modal__video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`${activeDemo.name} demo`}
              />
            </div>

            <div className="demo-modal__footer">
              <span>{activeDemo.year}</span>
              <a href={activeDemo.github} target="_blank" rel="noreferrer" className="iconlink iconlink--sm">
                <GithubIcon /> View source
              </a>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <span>© 2026 Tejasvi Garg</span>
        <button className="footer__top" onClick={() => scrollTo('top')}>Back to top ↑</button>
      </footer>
    </>
  )
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.96.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
    </svg>
  )
}

function SectionHead({ eyebrow, title, desc, inverted }) {
  return (
    <div className={`sectionhead ${inverted ? 'sectionhead--inverted' : ''}`}>
      <span className="sectionhead__eyebrow">{eyebrow}</span>
      <h2 className="sectionhead__title">{title}</h2>
      {desc && <p className="sectionhead__desc">{desc}</p>}
    </div>
  )
}

export default App