import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import arrowIcon from '../../assets/imgs&svg/arrow.svg';
import './ScrollSection.scss';

gsap.registerPlugin(ScrollTrigger);

const ScrollSection = ({ title, subtitle, description, location, year, imageSrc }) => {
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
        toggleActions: 'play reverse play reverse',
        scrub: false,
      },
    });

    // Image & Subtitle (Info) Animation: Scale, Fade, Slide
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

    // Title Animation: Slide Only (adding opacity for clean entry)
    tl.fromTo(titleRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        "<" // Sync with previous animation
    );

  }, []);

  return (
    <section className="project-section" ref={sectionRef}>
      <div className="project-content" ref={contentRef}>
        
        {/* Title Left */}
        <h2 className="project-title" ref={titleRef}>{title}</h2>

        {/* Image Center */}
        <div className="project-image-container" ref={imageContainerRef}>
            {imageSrc ? (
                 <img src={imageSrc} alt={title} ref={imageRef} style={{opacity: 0.8}} />
            ) : (
                <div className="image-placeholder" ref={imageRef}>
                </div>
            )}
        </div>

        {/* Info Right */}
        <div className="project-info" ref={infoRef}>
             <img src={arrowIcon} alt="Arrow" className="arrow-icon" />
             <h3 className="subtitle">{subtitle}</h3>
             <p className="description">{description}</p>
             <div className="meta">
                <span>{location}</span>
                <span>{year}</span>
             </div>
        </div>

      </div>
    </section>
  );
};

export default ScrollSection;