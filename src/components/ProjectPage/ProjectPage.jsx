import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectPage.scss';

gsap.registerPlugin(ScrollTrigger);

const ProjectPage = ({ projects }) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const outcomeRef = useRef(null);
    const storyCardsRef = useRef([]);
    const highlightsRef = useRef(null);
    const detailImageRef = useRef(null);
    const techRef = useRef(null);
    const backBtnRef = useRef(null);

    const project = projects.find(p => p.slug === slug);

    const addToStoryCards = (el) => {
        if (el && !storyCardsRef.current.includes(el)) {
            storyCardsRef.current.push(el);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        storyCardsRef.current = [];
    }, [slug]);

    useEffect(() => {
        if (!project) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(backBtnRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 }
            );
            tl.fromTo(heroRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.8 },
                '<0.1'
            );
            tl.fromTo(outcomeRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                '-=0.3'
            );

            storyCardsRef.current.forEach((card) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 80%',
                    onEnter: () => {
                        gsap.fromTo(card,
                            { y: 60, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
                        );
                    },
                    once: true,
                });
            });

            if (highlightsRef.current) {
                ScrollTrigger.create({
                    trigger: highlightsRef.current,
                    start: 'top 80%',
                    onEnter: () => {
                        gsap.fromTo(highlightsRef.current,
                            { y: 50, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
                        );
                        gsap.fromTo('.highlight-item',
                            { y: 30, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out', delay: 0.2 }
                        );
                    },
                    once: true,
                });
            }

            if (techRef.current) {
                ScrollTrigger.create({
                    trigger: techRef.current,
                    start: 'top 85%',
                    onEnter: () => {
                        gsap.fromTo(techRef.current,
                            { y: 40, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
                        );
                    },
                    once: true,
                });
            }

        }, pageRef);

        return () => ctx.revert();
    }, [project]);

    if (!project) {
        return (
            <div className="project-page">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <span className="arrow-back"></span> Back
                </button>
                <div className="project-hero-section">
                    <p>Project not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="project-page" ref={pageRef}>
            {/* Fixed Back Button */}
            <button className="back-btn" ref={backBtnRef} onClick={() => navigate('/')}>
                <span className="arrow-back">←</span> Back
            </button>

            {/* Hero — Title + Meta */}
            <div className="project-hero-section" ref={heroRef}>
                <div className="hero-meta">
                    <span className="meta-label">{project.role}</span>
                    <span className="meta-divider">·</span>
                    <span className="meta-label">{project.year}</span>
                </div>
                <h1 className="hero-title">{project.title}</h1>
                <p className="hero-subtitle">{project.subtitle}</p>

                {(project.githubUrl || project.liveUrl || project.liveLabel) && (
                    <div className="project-links">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link github-link"
                            >
                                View Code
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link live-link"
                            >
                                Live App
                            </a>
                        )}
                        {project.liveLabel && !project.liveUrl && (
                            <span className="project-link coming-soon-link">
                                {project.liveLabel}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Lead with Outcome */}
            <div className="outcome-section" ref={outcomeRef}>
                <div className="outcome-inner">
                    <span className="section-label">Outcome</span>
                    <p className="outcome-text">{project.outcome}</p>
                </div>
            </div>

            {/* Full-width hero image */}
            <div className="full-image-section" ref={detailImageRef}>
                <img src={project.images[0]} alt={project.title} className="full-image" />
            </div>


            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
                <div className="highlights-section" ref={highlightsRef}>
                    <span className="section-label">Key Highlights</span>
                    <div className="highlights-grid">
                        {project.highlights.map((item, i) => (
                            <div key={i} className="highlight-item">
                                <span className="highlight-number">0{i + 1}</span>
                                <p className="highlight-text">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tech Stack */}
            {project.technologies && project.technologies.length > 0 && (
                <div className="tech-section" ref={techRef}>
                    <span className="section-label">Technologies</span>
                    <div className="tech-tags">
                        {project.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectPage;
