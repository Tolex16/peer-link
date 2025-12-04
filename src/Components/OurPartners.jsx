import React from "react";
import grayscale from "../assets/grayscale.jpeg";
import shares from "../assets/21shares.jpeg";
import doge from "../assets/doge.jpeg";
import protoncapital from "../assets/protoncapital.png";
import digiltd from "../assets/digiltd.jpeg";
import digianalytica from "../assets/digianalytica.png";

const partners = [
  { name: "Grayscale", src: grayscale, href: "" },
  { name: "21 shares", src: shares, href: " " },
  { name: "Doge", src: doge, href: " " },
  { name: "Proton Capital", src: protoncapital, href: " " },
  { name: "Digi Limited", src: digiltd, href: " " },
  { name: "Digi Analytica", src: digianalytica, href: " " },
];

const OurPartners = () => {
  return (
    <section
      aria-label="Our partners"
      className="mt-8 bg-inherit pt-6 mx-auto items-center justify-center"
    >
      <div className="mx-auto max-w-7xl px-4">
        <h3 className="text-green-700 text-4xl mb-8 text-center">
          Our Partners
        </h3>
        <ul className="grid items-center gap-x-4 gap-y-9 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {partners.map((p) => (
            <li
              key={p.name}
              className="relative group flex justify-center cursor-pointer"
            >
              <a href={p.href} aria-label={p.name} className="inline-flex ">
                <img
                  src={p.src}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="h-8 md:h-13 w-auto object-contain animate-pulseZoom opacity-75 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </a>

              {/* Tooltip */}
              <span
                className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                   whitespace-nowrap rounded px-2 py-1 text-md font-medium
                   text-black
                   opacity-0 transition-opacity duration-200
                   group-hover:opacity-100 group-focus-within:opacity-100 z-10"
              >
                {p.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurPartners;
