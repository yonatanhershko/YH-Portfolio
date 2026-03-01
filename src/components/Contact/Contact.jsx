import React, { useEffect, useRef, useState } from "react";
import "./Contact.scss";
import githubIcon from "../../assets/imgs&svg/github.svg";
import linkedinIcon from "../../assets/imgs&svg/linkedin.svg";
import emailIcon from "../../assets/imgs&svg/email.svg";
import arrowIcon from "../../assets/imgs&svg/arrow.svg";
import gsap from "gsap";
import me2 from '../../assets/imgs&svg/me2.png';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ id }) {
    const contactRef = useRef(null);
    const contentRef = useRef(null);
    const [lines, setLines] = useState([]);

    useEffect(() => {
        const calculateLines = () => {
            if (!contactRef.current) return;
            const height = contactRef.current.offsetHeight;
            const lineCount = Math.ceil(height / 30);
            setLines(new Array(lineCount).fill(0));
        };

        // Delay calculation slightly to ensure layout is ready or use ResizeObserver
        const timeout = setTimeout(calculateLines, 100);

        window.addEventListener("resize", calculateLines);
        return () => {
            window.removeEventListener("resize", calculateLines);
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (lines.length === 0) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: contactRef.current,
                    start: "top 80%", // Start when top of section hits 80% of viewport
                    end: "bottom bottom",
                },
            });

            // 1. Animate lines appearing
            tl.to(".bg-line", {
                scaleX: 1,
                duration: 0.6,
                stagger: 0.1, // 0.1s wait between each line
                ease: "circ.out",
            })
                // 2. Fade in content after background is mostly done
                .to(
                    contentRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    ">+=0.3", // 1 second after lines finish
                );
        }, contactRef);

        return () => ctx.revert();
    }, [lines]);

    const socialLinks = [
        {
            id: "github",
            icon: githubIcon,
            link: "https://github.com/yonatanhershko",
            alt: "GitHub",
        },
        {
            id: "linkedin",
            icon: linkedinIcon,
            link: "https://www.linkedin.com/in/yonatan-hershko-022718255/",
            alt: "LinkedIn",
        },
        {
            id: "email",
            icon: emailIcon,
            link: "mailto:yonher8@gmail.com",
            alt: "Email",
        },
    ];

    return (
        <section className="contact-section" ref={contactRef} id={id}>
            <div className="bg-lines-container">
                {lines.map((_, i) => (
                    <div key={i} className="bg-line"></div>
                ))}
            </div>

            <div
                className="content-wrapper"
                ref={contentRef}
                style={{ opacity: 0, transform: "translateY(20px)" }}
            >
                <div className="contact-header">
                    <img src={me2} alt="Me" />
                    <h2 className="contact-title">Lets talk</h2>
                </div>
                <div className="social-links-container">
                    {socialLinks.map((social) => (
                        <a
                            key={social.id}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-circle"
                        >
                            <div className="icon-slider">
                                <div className="icon-wrapper">
                                    <img src={social.icon} alt={social.alt} />
                                </div>
                                <div className="icon-wrapper">
                                    <img
                                        src={arrowIcon}
                                        alt="Go"
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                        }}
                                    />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                    <div className="footer-copyright">
                &copy; {new Date().getFullYear()} Yonatan Hershko. All rights reserved.
            </div>
            </div>
        </section>
    );
}
