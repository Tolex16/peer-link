import React, { useState, useEffect } from "react";
import Style from "./Hero.module.css";
import { useNavigate } from "react-router-dom";

// Import slides
import Slide1 from "../../assets/slide1.jpeg";
import Slide2 from "../../assets/slide2.jpeg";
import Slide3 from "../../assets/slide3.jpg";
import Slide4 from "../../assets/slide4.jpeg";
import Slide5 from "../../assets/slide5.jpg";
import Slide6 from "../../assets/slide6.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      img: Slide1,
      title: "True Alternatives",
      subtitle:
        "We identify and structure alternative investments that generate persistent value unrelated to traditional markets.",
      button: "View Strategies",
      route: "/strategies",
    },

    {
      img: Slide2,
      title: "Alternative Lending Insights",
      subtitle:
        "Access deep market intelligence across private credit, debt structuring, and alternative lending instruments.",
      button: "Explore Lending",
      route: "/insights/alternative-lending",
    },

    {
      img: Slide3,
      title: "Energy Strategies",
      subtitle:
        "Our unique hedging and structuring strategies unlock opportunity in global energy markets.",
      button: "Energy Programs",
      route: "/strategies/energy",
    },

    {
      img: Slide4,
      title: "Who We Serve",
      subtitle:
        "We work alongside advisors, investors, and institutions to deliver long-term value and intelligent capital growth.",
      button: "Advisors & Investors",
      route: "/who-we-serve/investors",
    },

    {
      img: Slide5,
      title: "Company & Values",
      subtitle:
        "Focus. Be Humble. Be Kind. Our principles guide every decision we make as a firm.",
      button: "Our Company",
      route: "/about/company",
    },

    {
      img: Slide6,
      title: "Blockchain & Digital Strategy",
      subtitle:
        "We engineer advanced blockchain and multi-strategy systems that create lasting performance and resilience.",
      button: "Blockchain Solutions",
      route: "/strategies/blockchain-solutions",
    },
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className={Style.heroSlider}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${Style.slide} ${
            index === currentIndex ? Style.active : ""
          }`}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className={Style.overlay} />

          {index === currentIndex && (
            <div className={Style.content}>
              <h1 className={Style.title}>{slide.title}</h1>
              <p className={Style.subtitle}>{slide.subtitle}</p>

              <button
                className={Style.cta}
                onClick={() => navigate(slide.route)}
              >
                {slide.button} →
              </button>
            </div>
          )}
        </div>
      ))}

      {/* indicators */}
      <div className={Style.indicators}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${Style.indicator} ${
              index === currentIndex ? Style.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
