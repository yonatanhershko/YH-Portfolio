import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import ScrollSection from "./components/ScrollSection/ScrollSection";
import Hero from "./components/Hero/Hero";
import AboutMe from "./components/AboutMe/AboutMe";
import "./styles/App.scss";
//add three.js 

function App() {
  // logic moved to Hero component

  return (
    <GlobalStyle>
      <div className="app-container">
        <Hero />
        <AboutMe />

        <section id="portfolio-section">
             <ScrollSection 
                title="Black Star Ville" 
                subtitle="Conexión Cósmica"
                description="Villa Estrella Negra fusiona historia y elegancia en una joya arquitectónica donde la distribución de los espacios refleja la transformación."
                location="Sayulita, MX"
                year="2024"
             />
             
             <ScrollSection 
                title="Urban Oasis" 
                subtitle="Sustainable Living"
                description="A modern approach to urban living, seamlessly blending green spaces with concrete structures for a breathable city experience."
                location="Tel Aviv, IL"
                year="2023"
             />
             
             <ScrollSection 
                title="Neon Dreams" 
                subtitle="Nightlife Reimagined"
                description="An immersive light installation that transforms ordinary streets into a vibrant, pulsating canvas of color and motion."
                location="Tokyo, JP"
                year="2025"
             />
        </section>
      </div>
    </GlobalStyle>
  );
}

export default App;
