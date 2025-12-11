import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import OurPartners from "./OurPartners";
import logo from "../assets/icon.png";

const Footer = () => {
  const navLinks = [
    { path: "/strategies", label: "STRATEGIES" },
    { path: "/insights", label: "INSIGHTS" },
    { path: "/about", label: "ABOUT" },
    { path: "/who-we-serve", label: "WHO WE SERVE" },
  ];

  return (
    <footer className="bg-white text-black pt-20 pb-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= GRID ================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* LOGO + ADDRESS (like Stone Ridge) */}
          <div className="space-y-6">
            <img
              src={logo}
              alt="DCG Logo"
              className="w-30 h-30 bg-black"
            />

            <div className="space-y-1 text-gray-700">
              <p className="font-semibold">DIGI CAP GROUP</p>
              <p>Gustav Mahlerlaan 2, 1082 MA</p>
              <p>Amsterdam, Netherlands</p>
              <p>EU</p>
            </div>
          </div>

          {/* COLUMN 2 — STRATEGIES / LINK GROUP */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide text-gray-800">
              Strategies
            </h3>

            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="block text-gray-600 hover:text-green-600
                             transition-all duration-300 hover:translate-x-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 3 — CONTACT */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Contact</h3>

            <div className="space-y-4 text-gray-600">
              <a
                href="mailto:info@digicapgroup.org"
                className="flex items-center gap-2 hover:text-green-600 transition"
              >
                <FaEnvelope className="text-green-600" />
                info@digicapgroup.org
              </a>

              <a
                href="tel:+31649903861"
                className="flex items-center gap-2 hover:text-green-600 transition"
              >
                <FaPhoneAlt className="text-green-600" />
                +31 (649) 903-861
              </a>
            </div>
          </div>

          {/* COLUMN 4 — NEWSLETTER (your original animation kept) */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Stay Updated</h3>

            <form className="relative group">
              <div className="relative w-full">

                {/* Glow animation */}
                <div className="absolute -inset-1 bg-gradient-to-r
                  from-green-400 to-green-600 rounded-3xl blur opacity-20
                  group-hover:opacity-40 transition-all duration-300"
                />

                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full backdrop-blur-sm rounded-3xl px-6 py-4
                  text-lg focus:outline-none border border-gray-300
                  focus:ring-2 focus:ring-green-600 pr-28 placeholder-gray-800"
                />

                <button
                  className="absolute right-2 top-2 bg-green-600 text-white 
                  px-6 py-2 rounded-2xl font-medium text-lg
                  hover:scale-105 flex items-center gap-2 transition-all"
                >
                  Join
                  <FiArrowRight className="h-5 w-5" />
                </button>

              </div>
            </form>
          </div>
        </div>

        {/* PARTNERS */}
        <OurPartners />

        {/* COPYRIGHT */}
        <div className="border-t border-gray-300 mt-12 pt-6 text-center">
          <p className="text-gray-700 text-sm">
            © {new Date().getFullYear()} DCG. All Rights Reserved | Digi Cap Group
          </p>
        </div>

        {/* ========= DISCLOSURES (styled like screenshot) ========= */}
        <div className="mt-12 space-y-4 text-gray-600 text-sm leading-relaxed">

          <p>
            The information presented on this website is intended solely for
            general informational purposes. Nothing contained on digicapgroup.org
            should be interpreted as an offer, solicitation, recommendation, or
            advice to purchase or sell any financial product, digital asset,
            security, or investment instrument.
          </p>

          <p>
            Visitors should independently evaluate all information and consult
            qualified financial, tax, and legal professionals before making any
            investment decisions. Digital asset markets — including bitcoin and
            other cryptocurrencies — are historically volatile and may not be
            suitable for all investors.
          </p>

          <p>
            Past performance is not indicative of future results, and
            diversification, while valuable, does not eliminate the risk of loss.
            Market conditions and investment technologies may change at any time.
          </p>

          <p>
            DIGI CAP GROUP and DCG are registered trademarks. Additional regulatory
            details and disclosures are available upon request.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
