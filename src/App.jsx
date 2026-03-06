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

//main 3 porjects imgs
import jooba from './assets/imgs&svg/jooba.jpg';
import k8sApp from './assets/imgs&svg/K8Sapp.png';


//Project Images
import jooba2 from './assets/projects-imgs/jooba2.png';
import k8sApp2 from './assets/projects-imgs/K8S2.png';

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
    images: [walletApp],
    githubUrl: 'https://github.com/yonatanhershko/wallet-app',
    liveLabel: 'Coming Soon',
    outcome: 'Built a complete mobile wallet experience with real-time transaction tracking and intuitive financial management tools.',
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
    images: [jooba2],
    outcome: 'Built and scaled from scratch a cross-platform marketplace (iOS, Android, Web) enabling teenagers to create digital stores, trade products/services, and learn financial literacy in a safe environment.',
    technologies: ['React Native', 'Python', 'Expo', 'GCP', 'SQL', 'Firebase'],
    highlights: [
      'Cross-platform development with React Native for iOS & Android and Web ',
      'Migrated infrastructure from Firebase to GCS and SQL',
      'Delivered end-to-end features used by real users',
    ],
  },
  {
    slug: 'imod-rehabilitation',
    title: 'IMOD Rehabilitation',
    subtitle: 'Frontend Developer',
    role: 'Frontend Developer',
    year: '2025',
    images: [shikom],
    liveUrl: 'https://shikum.mod.gov.il/',
    outcome: 'Contributed to a mission-critical governmental platform serving Israel\'s veterans and their families.',
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
    images: [k8sApp2],
    githubUrl: 'https://github.com/yonatanhershko/yona-k8s-todo-app',
    liveUrl: 'https://frontend-polished-brook-6642.fly.dev/',
    outcome: 'Built and deployed a cloud-native Todo platform with Kubernetes orchestration, Dockerized services, and Fly.io infrastructure, emphasizing scalable deployment architecture.',
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
    images: [heyDay],
    githubUrl: 'https://github.com/yonatanhershko/HeyDay',
    liveLabel: 'Coming Soon',
    outcome: 'Created an engaging digital experience that pushes creative boundaries with playful interactions and polished design.',
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
