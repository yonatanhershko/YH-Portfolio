import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutMe.scss';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = ({ id }) => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const image = imageRef.current;
        const text = textRef.current;
        
        let ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop Animation
            mm.add("(min-width: 769px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%", 
                        end: "top 30%",
                        scrub: 1.5, 
                    }
                });

                tl.fromTo(image, 
                    { x: -100, opacity: 0 }, 
                    { x: 0, opacity: 1, duration: 1.5 }
                );

                // Text moves to left with fade in (joined with previous)
                tl.fromTo(text, 
                    { x: 100, opacity: 0 }, 
                    { x: 0, opacity: 1, duration: 1.5 }, 
                   
                );
            });
            
            // Mobile without animation
            mm.add("(max-width: 768px)", () => {
                 gsap.set([image, text], { clearProps: "all" });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-me-section" ref={sectionRef} id={id}>
            <div className="about-content">
                <div className="image-container" ref={imageRef}>
                    Image Placeholder
                </div>
                <div className="text-container" ref={textRef}>
                    <h2>hi, I'm yonatan</h2>
                    <p>
                        I'm a software developer working across web, mobile, and interactive platforms. 
                        My work focuses on creating seamless user experiences and robust architectures.
                    </p>
                    <p>
                        I've worked with various startups and established companies, building projects 
                        that range from complex dashboards to immersive portfolio sites.
                    </p>
                    
                     <div className="contact-info">
                        <h3>contact at:</h3>
                        <a href="mailto:contact@yonatan.com">contact@yonatan.com</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
