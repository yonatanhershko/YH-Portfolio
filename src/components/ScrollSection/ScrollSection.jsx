import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { track } from "@vercel/analytics";
import './ScrollSection.scss';

gsap.registerPlugin(ScrollTrigger);

const handleNavigate = (navigate, slug) => {
  if (!slug) return;
  track('Project Clicked', { project: slug, section: 'works' });
  document.body.scrollTop = 0;
  navigate(`/project/${slug}`);
};

const ScrollSection = ({ title, subtitle, description, year, imageSrc, slug }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const imageContainerRef = useRef(null);
  const infoRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    // Ensure parent is visible if SCSS has it hidden
    gsap.set(contentRef.current, { opacity: 1 });

    // Animation Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        toggleActions: 'play none none reverse',
        scrub: false,
      },
    });

    tl.fromTo([imageContainerRef.current, infoRef.current],
      {
        x: -100,
        opacity: 0,
        scale: 0.4,
      },
      {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );

    tl.fromTo(titleRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        "<" // Sync with previous animation
    );

  }, []);

  return (
    <section className="project-section" ref={sectionRef}>
      <div className="project-content" ref={contentRef}>
        
        <div className="project-left" ref={imageContainerRef}>
          <h2 className="project-title" ref={titleRef}>{title}</h2>
          <div className="project-image-container">
            {imageSrc ? (
                 <img src={imageSrc} alt={title} ref={imageRef}/>
            ) : (
                <div className="image-placeholder" ref={imageRef}>
                </div>
            )}
          </div>
        </div>

        <div className="project-info" ref={infoRef}>
             <div
               className="arrow-mask"
               onClick={() => handleNavigate(navigate, slug)}
             />
             <h3 className="subtitle">{subtitle}</h3>
             <p className="description">{description}</p>
             {slug && (
               <span
                 className="mobile-check-link"
                 onClick={() => handleNavigate(navigate, slug)}
               >
                 Check it out →
               </span>
             )}
             <div className="meta">
                <span>{year}</span>
             </div>
        </div>

      </div>
    </section>
  );
};

export default ScrollSection;