import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import ScrollSection from "./components/ScrollSection/ScrollSection";
import Hero from "./components/Hero/Hero";
import AboutMe from "./components/AboutMe/AboutMe";
import "./styles/App.scss";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import jooba from './assets/imgs&svg/jooba.png';
import k8sApp from './assets/imgs&svg/K8Sapp.png';
import shikom from './assets/imgs&svg/shikom.png';

function App() {

  return (
    <GlobalStyle>
      <div className="app-container">
        <Header />
        <Hero id="hero" />
        <AboutMe id="about" />

        <section id="portfolio-section">
             <ScrollSection 
                title="Jooba AI" 
                subtitle="Full Stack Engineer"
                description="Former Full Stack Engineer at Jooba AI, developed scalable, high-performance solutions to create an amazing app."
                year="2024"
                imageSrc={jooba}
             />
             
             <ScrollSection 
                title="K8s Todo List" 
                subtitle="Cloud DevOps & Full Stack"
                description="Todo web app deployed to the cloud using Docker, Kubernetes, and Fly.io, featuring a React frontend with Nginx reverse proxy and a Node.js + Express backend."
                year="2025"
                imageSrc={k8sApp}
             />
             
             <ScrollSection 
                title="IMOD Rehabilitation" 
                subtitle="Frontend Developer"
                description="Worked on a large-scale governmental platform for Israel's Ministry of Defense – Rehabilitation Department, building and maintaining frontend components with Next.js and TypeScript."
                year="2025"
                imageSrc={shikom}
             />
        </section>

        <Contact id="contact"/>
      </div>
    </GlobalStyle>
  );
}

export default App;
