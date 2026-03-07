import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import walletApp from '../../assets/imgs&svg/walletApp.png';
import shikom from '../../assets/imgs&svg/shikom.png';
import k8sApp from '../../assets/imgs&svg/K8Sapp.png';
import jooba from '../../assets/imgs&svg/jooba.jpg';
import heyDay from '../../assets/imgs&svg/HeyDay.png';

import "./Hero.scss";

gsap.registerPlugin(ScrollTrigger);

const heroItems = [
  { img: walletApp, alt: "Wallet App", slug: "wallet-app", className: "item-1" },
  { img: jooba, alt: "Jooba", slug: "jooba", className: "item-2" },
  { img: shikom, alt: "Shikom", slug: "imod-rehabilitation", className: "item-3" },
  { img: k8sApp, alt: "K8S App", slug: "k8s-todo", className: "item-4" },
  { img: heyDay, alt: "HeyDay", slug: "heyday", className: "item-6" },
];

const Hero = ({ id }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const itemsRef = useRef([]);

  //Add refs to the array
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
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        duration: 1,
        pin: false, 

      },
    });

    // Text gets smaller
    scrollTl.to(text, {
      scale: 0.5,
      y: 100,
      ease: "none",
    });

    // Items move away from center
    items.forEach((item, i) => {
      const xMove = (i === 0 || i === 2 || i === 4) ? -200 : 200;
      const yMove = (i === 0 || i === 1) ? -150 : 150;

      scrollTl.to(
        item,
        {
          x: xMove,
          y: yMove,
          scale: 1.5, 
          ease: "none",
        },
        "<"
      );
    });

    return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="hero-container" ref={containerRef} id={id}>
      <div className="hero-content" ref={textRef}>
        <h1>Yonatan</h1>
        <h2>Software Developer</h2>
      </div>

      {heroItems.map((item) => (
        <div
          key={item.slug}
          className={`floating-item ${item.className}`}
          ref={addToRefs}
        >
          <div
            className="floating-item-inner"
            onClick={() => navigate(`/project/${item.slug}`)}
          >
            <img src={item.img} alt={item.alt} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
