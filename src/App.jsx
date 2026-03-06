import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import ScrollSection from "./components/ScrollSection/ScrollSection";
import Hero from "./components/Hero/Hero";
import AboutMe from "./components/AboutMe/AboutMe";
import "./styles/App.scss";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import ProjectPage from "./components/ProjectPage/ProjectPage";

import { ScrollTrigger } from 'gsap/ScrollTrigger';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [pathname]);
  return null;
}
import jooba from './assets/imgs&svg/jooba.jpg';
import k8sApp from './assets/imgs&svg/K8Sapp.png';
import shikom from './assets/imgs&svg/shikom.png';
import walletApp from './assets/imgs&svg/walletApp.png';
import heyDay from './assets/imgs&svg/HeyDay.png';

const projects = [
  {
    slug: 'wallet-app',
    title: 'Wallet App',
    subtitle: 'Mobile Finance',
    role: 'Full Stack Developer',
    year: '2024',
    images: [walletApp, walletApp],
    outcome: 'Built a complete mobile wallet experience with real-time transaction tracking and intuitive financial management tools.',
    challenge: 'Users needed a simple, clean way to manage personal finances without the complexity of traditional banking apps.',
    approach: 'Designed a minimalist mobile-first interface with real-time data syncing, focusing on speed and usability across all interaction points.',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    highlights: [
      'Real-time transaction tracking',
      'Intuitive budget visualization',
      'Secure authentication flow',
    ],
  },
  {
    slug: 'jooba',
    title: 'Jooba AI',
    subtitle: 'Full Stack Engineer',
    role: 'Full Stack Engineer',
    year: '2024',
    images: [jooba, jooba],
    outcome: 'Delivered scalable, high-performance features that powered an AI-driven platform serving thousands of users.',
    challenge: 'The platform needed to handle complex AI workflows while maintaining a fast, responsive user experience at scale.',
    approach: 'Developed end-to-end features with a focus on performance optimization, clean architecture, and seamless integration between frontend and backend systems.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AI/ML Integration'],
    highlights: [
      'Scalable architecture for AI workloads',
      'High-performance frontend optimization',
      'End-to-end feature delivery',
    ],
  },
  {
    slug: 'imod-rehabilitation',
    title: 'IMOD Rehabilitation',
    subtitle: 'Frontend Developer',
    role: 'Frontend Developer',
    year: '2025',
    images: [shikom, shikom],
    outcome: 'Contributed to a mission-critical governmental platform serving Israel\'s veterans and their families.',
    challenge: 'A large-scale government system required modern, accessible, and maintainable frontend components to serve diverse user needs.',
    approach: 'Built and maintained production-grade frontend components using Next.js and TypeScript, following strict governmental standards for accessibility and security.',
    technologies: ['Next.js', 'TypeScript', 'React', 'SCSS'],
    highlights: [
      'Large-scale governmental platform',
      'Accessibility-first component design',
      'Production-grade TypeScript architecture',
    ],
  },
  {
    slug: 'k8s-todo',
    title: 'K8s Todo List',
    subtitle: 'Cloud DevOps & Full Stack',
    role: 'DevOps & Full Stack Developer',
    year: '2025',
    images: [k8sApp, k8sApp],
    outcome: 'Deployed a fully containerized web application to the cloud, demonstrating end-to-end DevOps and development capabilities.',
    challenge: 'Needed to demonstrate cloud-native deployment skills with a real application using industry-standard container orchestration.',
    approach: 'Built a React frontend with Nginx reverse proxy and a Node.js + Express backend, containerized with Docker and orchestrated with Kubernetes on Fly.io.',
    technologies: ['Docker', 'Kubernetes', 'React', 'Node.js', 'Nginx', 'Fly.io'],
    highlights: [
      'Full Docker containerization',
      'Kubernetes orchestration on Fly.io',
      'Nginx reverse proxy configuration',
    ],
  },
  {
    slug: 'heyday',
    title: 'HeyDay',
    subtitle: 'Creative Project',
    role: 'Developer',
    year: '2024',
    images: [heyDay, heyDay],
    outcome: 'Created an engaging digital experience that pushes creative boundaries with playful interactions and polished design.',
    challenge: 'Wanted to explore creative web development beyond traditional application patterns.',
    approach: 'Focused on expressive animations, unique visual design, and delightful micro-interactions to create a memorable user experience.',
    technologies: ['React', 'GSAP', 'CSS Animations'],
    highlights: [
      'Creative animation design',
      'Expressive micro-interactions',
      'Unique visual identity',
    ],
  },
];

function HomePage() {
  return (
    <>
      <Header />
      <Hero id="hero" projects={projects} />
      <AboutMe id="about" />

      <section id="portfolio-section">
        <ScrollSection
          title="Jooba AI"
          subtitle="Full Stack Engineer"
          description="Former Full Stack Engineer at Jooba AI, developed scalable, high-performance solutions to create an amazing app."
          year="2024"
          imageSrc={jooba}
          slug="jooba"
        />

        <ScrollSection
          title="K8s Todo List"
          subtitle="Cloud DevOps & Full Stack"
          description="Todo web app deployed to the cloud using Docker, Kubernetes, and Fly.io, featuring a React frontend with Nginx reverse proxy and a Node.js + Express backend."
          year="2025"
          imageSrc={k8sApp}
          slug="k8s-todo"
        />

        <ScrollSection
          title="IMOD Rehabilitation"
          subtitle="Frontend Developer"
          description="Worked on a large-scale governmental platform for Israel's Ministry of Defense – Rehabilitation Department, building and maintaining frontend components with Next.js and TypeScript."
          year="2025"
          imageSrc={shikom}
          slug="imod-rehabilitation"
        />
      </section>

      <Contact id="contact" />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalStyle>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:slug" element={<ProjectPage projects={projects} />} />
          </Routes>
        </div>
      </GlobalStyle>
    </BrowserRouter>
  );
}

export default App;
