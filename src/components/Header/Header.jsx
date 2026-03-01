import { useState, useEffect, useRef } from "react";
import "./Header.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import burgerMenuIcon from "../../assets/imgs&svg/burger-menu.svg";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Header() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDarkBg, setIsDarkBg] = useState(false);
    const isManualScroll = useRef(false);

    const sections = [
        { id: "hero", label: "Home" },
        { id: "about", label: "About" },
        { id: "portfolio-section", label: "Work" },
        { id: "contact", label: "Contact" },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            isManualScroll.current = true;
            setActiveSection(id);
            setIsDarkBg(id === "about");
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);

            gsap.to(window, {
                duration: 1,
                scrollTo: { y: element, offsetY: 0, autoKill: false },
                ease: "power2.inOut",
                onComplete: () => {
                    isManualScroll.current = false;
                    ScrollTrigger.refresh();
                },
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            sections.forEach((section) => {
                ScrollTrigger.create({
                    trigger: `#${section.id}`,
                    start: "top 70%",
                    end: "bottom 90%",
                    onEnter: () => {
                        if (!isManualScroll.current)
                            setActiveSection(section.id);
                    },
                    onEnterBack: () => {
                        if (!isManualScroll.current)
                            setActiveSection(section.id);
                    },
                });
            });

            // Separate trigger for header color on dark sections
            ScrollTrigger.create({
                trigger: "#about",
                start: "top top",
                end: "bottom top",
                onEnter: () => setIsDarkBg(true),
                onLeave: () => setIsDarkBg(false),
                onEnterBack: () => setIsDarkBg(true),
                onLeaveBack: () => setIsDarkBg(false),
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <header className={`header-container ${scrolled ? "scrolled" : ""} ${isDarkBg ? "dark-section" : ""}`}>
            <div className="logo" onClick={() => scrollToSection("hero")}>
                YH
            </div>

            <nav className="desktop-nav">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className={`nav-link ${activeSection === section.id ? "active" : ""}`}
                        onClick={() => scrollToSection(section.id)}
                    >
                        {section.label}
                    </div>
                ))}
            </nav>

            <div className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img
                    src={burgerMenuIcon}
                    alt="Menu"
                    className={isMenuOpen ? "active" : ""}
                />
            </div>

            <div className={`mobile-menu-overlay ${isMenuOpen ? "open" : ""}`}>
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className={`mobile-nav-link ${activeSection === section.id ? "active" : ""}`}
                        onClick={() => scrollToSection(section.id)}
                    >
                        {section.label}
                    </div>
                ))}
            </div>
        </header>
    );
}
