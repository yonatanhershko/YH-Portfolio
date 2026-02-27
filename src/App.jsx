import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import ScrollSection from "./components/ScrollSection/ScrollSection";
import Hero from "./components/Hero/Hero";
import AboutMe from "./components/AboutMe/AboutMe";
import "./styles/App.scss";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";

function App() {

  return (
    <GlobalStyle>
      <div className="app-container">
        <Header />
        <Hero id="hero" />
        <AboutMe id="about" />

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

        <Contact id="contact"/>
      </div>
    </GlobalStyle>
  );
}

export default App;
