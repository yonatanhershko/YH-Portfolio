import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollSection.scss';

gsap.registerPlugin(ScrollTrigger);

const ScrollSection = ({ title, subtitle, description, location, year, imageSrc }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    // Animation Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%', // Trigger when top of section is at 60% viewport
        end: 'bottom 40%',
        toggleActions: 'play reverse play reverse', // Play on enter, reverse on leave, play on re-enter back, reverse on leave back
        scrub: false, // User requested "fade in... and when scroll down dissaper and when scroll up again shows", implies trigger based not scrubbing
      },
    });

    // Content Scale & Fade In
    tl.fromTo(content,
      {
        scale: 0.2,
        opacity: 0,
        transformOrigin: "center center"
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );
    
    // Ensure Image ends at 0.8 opacity if requested, but main wrapper 1
    // If we want separate control:
    if(image) {
        // We can add a tween for the image specifically if needed, 
        // e.g. if the parent opacity:1 makes image opacity:1, but we want 0.8
        // We can just set CSS opacity 0.8 for image.
    }

  }, []);

  return (
    <section className="project-section" ref={sectionRef}>
      <div className="project-content" ref={contentRef}>
        
        {/* Title Left */}
        <h2 className="project-title">{title}</h2>

        {/* Image Center */}
        <div className="project-image-container">
            {imageSrc ? (
                 <img src={imageSrc} alt={title} ref={imageRef} style={{opacity: 0.8}} />
            ) : (
                <div className="image-placeholder" ref={imageRef}>
                    {title} Image
                </div>
            )}
        </div>

        {/* Info Right */}
        <div className="project-info">
             <div className="arrow-icon">↗</div>
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