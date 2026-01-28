import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.scss";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const itemsRef = useRef([]);

  // Helper to add refs to the array
  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const items = itemsRef.current;

    // Initial load animation
    const tl = gsap.timeline();
    tl.fromTo(
      text,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
    ).fromTo(
      items,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: "back.out(1.7)" },
      "-=1"
    );

    // Scroll Animation
    // We want the text to shrink (scale down) and items to move away (spread out)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top", // Animate over the height of the hero
        scrub: 1,
        duration: 1,
        pin: false, 

      },
    });

    // Text gets smaller
    scrollTl.to(text, {
      scale: 0.5,
      y: 100, // Move down slightly as we scroll down
      ease: "none",
    });

    // Items move away from center
    // We can simulate this by moving them in direction of their position relative to center
    // Or just hardcode logic based on their 'class' index
    items.forEach((item, i) => {
      // Simple logic: if it's on left, move left. If right, move right. Top/Bottom etc.
      // We can use a random or preset direction vector
      const xDir = i % 2 === 0 ? -1 : 1; // Left or Right
      const yDir = i < 3 ? -1 : 1; // Top or Bottom roughly
      
      // More specific based on index to spread them nicely
      const xMove = (i === 0 || i === 2 || i === 4) ? -200 : 200;
      const yMove = (i === 0 || i === 1) ? -150 : 150;

      scrollTl.to(
        item,
        {
          x: xMove,
          y: yMove,
          scale: 1.5, // Get "farther away" often suggests shrinking in 3D, but user said "imgs... get farther (a way) from the main text". 
          // If they get farther from text, they spread out. 
          // If the perspective is "camera moving back", text getting smaller matches camera moving back.
          // If camera moves back, peripheral objects should usually move towards center strictly by perspective, 
          // BUT if we want the EFFECT of "exploding" or "spreading", we move them out.
          // Let's stick to "images... get farther (away) from the main text". -> Spread OUT.
          
          ease: "none",
        },
        "<" // Sync with text animation
      );
    });

    return () => {
        // Cleanup if needed
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="hero-container" ref={containerRef}>
      <div className="hero-content" ref={textRef}>
        <h1>Yonatan!!! THE KING</h1>
        <h2>Software Developer</h2>
      </div>

      {/* Floating Image Placeholders */}
      <div className="floating-item item-1" ref={addToRefs}>Img 1</div>
      <div className="floating-item item-2" ref={addToRefs}>Img 2</div>
      <div className="floating-item item-3" ref={addToRefs}>Img 3</div>
      <div className="floating-item item-4" ref={addToRefs}>Img 4</div>
      <div className="floating-item item-5" ref={addToRefs}>Img 5</div>
      <div className="floating-item item-6" ref={addToRefs}>Img 6</div>
    </div>
  );
};

export default Hero;
