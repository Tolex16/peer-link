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
      title: "Global Investment Reach",
      subtitle:
        "Our diversified portfolio spans North America, Europe, and Asia to maximize performance and resilience.",
      button: "Explore Markets",
      route: "/markets",
    },
    {
      img: Slide3,
      title: "Investor-Centric Approach",
      subtitle:
        "We partner with private investors, institutions, and corporations to deliver long-term capital appreciation.",
      button: "Learn More",
      route: "/about",
    },
    {
      img: Slide4,
      title: "Energy Spotlight",
      subtitle:
        "Our unique hedging and structuring strategies unlock opportunity in global energy markets.",
      button: "Energy Strategies",
      route: "/energy",
    },
    {
      img: Slide5,
      title: "Focus. Be Humble. Be Kind.",
      subtitle: "Our founding principles continue to guide every decision we make.",
      button: "Our Values",
      route: "/values",
    },
    {
      img: Slide6,
      title: "Long-Term Performance",
      subtitle:
        "We engineer solutions that create lasting capital growth and client confidence.",
      button: "Performance Reports",
      route: "/performance",
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
