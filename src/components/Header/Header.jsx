import { useState, useEffect, useRef } from "react";
import "./Header.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import burgerMenuIcon from "../../assets/imgs&svg/burger-menu.svg";
import themeCircleImg from "../../assets/imgs&svg/themeCircle.png";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const themes = [
    { main: '#81B29A', secondary: '#F4F1DE', third: '#211C19' },
    { main: '#E07A5F', secondary: '#F8FAFC', third: '#264653' },
    { main: '#E9C46A', secondary: '#FAF9F6', third: '#264653' },
    { main: '#A3B18A', secondary: '#1A1C18', third: '#CCD6F6' },
];

function applyTheme(index) {
    const theme = themes[index];
    const root = document.documentElement;
    root.style.setProperty('--main-color', theme.main);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--third-color', theme.third);
}

export default function Header() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDarkBg, setIsDarkBg] = useState(false);
    const [themeIndex, setThemeIndex] = useState(0);
    const circleRef = useRef(null);
    const mobileCircleRef = useRef(null);
    const isManualScroll = useRef(false);
    const isAnimating = useRef(false);

    const sections = [
        { id: "hero", label: "Home" },
        { id: "about", label: "About" },
        { id: "portfolio-section", label: "Work" },
        { id: "contact", label: "Contact" },
    ];

    // Load saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved !== null) {
            const idx = parseInt(saved, 10);
            if (idx >= 0 && idx < themes.length) {
                setThemeIndex(idx);
                applyTheme(idx);
                // Set initial rotation to match saved theme (no animation)
                const rotation = idx * -90;
                if (circleRef.current) gsap.set(circleRef.current, { rotation });
                if (mobileCircleRef.current) gsap.set(mobileCircleRef.current, { rotation });
            }
        }
    }, []);

    const cycleTheme = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const nextIndex = (themeIndex + 1) % themes.length;
        setThemeIndex(nextIndex);
        applyTheme(nextIndex);
        localStorage.setItem('theme', nextIndex.toString());

        // Rotation animation
        const targets = [circleRef.current, mobileCircleRef.current].filter(Boolean);
        if (targets.length) {
            gsap.to(targets, {
                rotation: '-=90',
                duration: 0.5,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    setTimeout(() => { isAnimating.current = false; }, 300);
                },
            });
        } else {
            setTimeout(() => { isAnimating.current = false; }, 300);
        }
    };

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
                <img
                    className="theme-circle"
                    ref={circleRef}
                    src={themeCircleImg}
                    alt="Change theme"
                    onClick={cycleTheme}
                    title="Change theme"
                />
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
                <img
                    className="theme-circle mobile-theme-circle"
                    ref={mobileCircleRef}
                    src={themeCircleImg}
                    alt="Change theme"
                    onClick={cycleTheme}
                    title="Change theme"
                />
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
