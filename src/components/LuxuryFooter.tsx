import { Facebook, Instagram, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";
import footerLogo from "@/assets/footerlogo.png";

const LuxuryFooter = () => {
  return (
    <footer className="bg-forest-deep text-cream font-body relative pt-24 overflow-hidden selection:bg-gold selection:text-forest-deep border-t border-gold/40 group">
      {/* Huge Background Text - Visible only on hover for premium feel */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-heading text-[24vw] text-transparent font-light whitespace-nowrap leading-none tracking-tighter transition-all duration-[1500ms] ease-out group-hover:text-gold/[0.15] group-hover:scale-105 drop-shadow-sm">
          RIYASAT
        </span>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Logo & Description */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <img src={footerLogo} alt="Riyasat" className="h-12 md:h-16 object-contain" />
            </div>
            <p className="text-gold/60 text-[15px] leading-relaxed max-w-[280px]">
              Architecting the void. We build for the next century, using the materials of the past. Based in Bhopal.
            </p>
          </div>
          
          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-gold font-bold mb-1 uppercase tracking-widest text-[11px] md:text-[12px]">Estate</h4>
              <div className="flex flex-col gap-3">
                <Link to="/about" className="text-gold/60 hover:text-gold transition-colors text-[14px]">About Project</Link>
                <Link to="/gallery" className="text-gold/60 hover:text-gold transition-colors text-[14px]">Full Gallery</Link>
                <Link to="/master-layout" className="text-gold/60 hover:text-gold transition-colors text-[14px]">Master Layout</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-gold font-bold mb-1 uppercase tracking-widest text-[11px] md:text-[12px]">Lifestyle</h4>
              <div className="flex flex-col gap-3">
                <Link to="/amenities" className="text-gold/60 hover:text-gold transition-colors text-[14px]">Amenities & Facilities</Link>
                <Link to="/location" className="text-gold/60 hover:text-gold transition-colors text-[14px]">Location & Connectivity</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-gold font-bold mb-1 uppercase tracking-widest text-[11px] md:text-[12px]">Acquisition</h4>
              <div className="flex flex-col gap-3">
                <Link to="/investment" className="text-gold/60 hover:text-gold transition-colors text-[14px]">Investment Details</Link>
                <Link to="/book-visit" className="text-gold/60 hover:text-gold transition-colors text-[14px]">Book an Appointment</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-gold font-bold mb-1 uppercase tracking-widest text-[11px] md:text-[12px]">Riyasat Infra</h4>
              <div className="flex flex-col gap-3">
                <Link to="/developer" className="text-gold/60 hover:text-gold transition-colors text-[14px]">The Developer</Link>
                <Link to="/contact" className="text-gold/60 hover:text-gold transition-colors text-[14px]">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons matching Velos layout */}
        <div className="flex justify-center gap-6 mb-24 relative z-10">
          <a href="#" className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold/80 hover:text-forest-deep hover:bg-gold hover:border-gold hover:scale-110 shadow-[0_0_15px_rgba(200,164,75,0.1)] hover:shadow-[0_0_20px_rgba(200,164,75,0.4)] transition-all duration-500">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold/80 hover:text-forest-deep hover:bg-gold hover:border-gold hover:scale-110 shadow-[0_0_15px_rgba(200,164,75,0.1)] hover:shadow-[0_0_20px_rgba(200,164,75,0.4)] transition-all duration-500">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold/80 hover:text-forest-deep hover:bg-gold hover:border-gold hover:scale-110 shadow-[0_0_15px_rgba(200,164,75,0.1)] hover:shadow-[0_0_20px_rgba(200,164,75,0.4)] transition-all duration-500">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold/80 hover:text-forest-deep hover:bg-gold hover:border-gold hover:scale-110 shadow-[0_0_15px_rgba(200,164,75,0.1)] hover:shadow-[0_0_20px_rgba(200,164,75,0.4)] transition-all duration-500">
            <Facebook className="w-5 h-5" />
          </a>
        </div>

        {/* Middle Divider & Compact Links */}
        <div className="border-t border-gold/40 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gold/60 text-[11px] uppercase tracking-wider font-semibold">
          <p>© 2026 MADE BY PRANAV SAHU | FOUNDER OF HEXATOM | AI AND AGENTIC FULL STACK DEVELOPER TEAM</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <Link to="/sitemap" className="hover:text-gold transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* DEVELOPER IDENTITY FOOTER — PRANAV SAHU | HEXATOM (As requested in ref) */}
      <div className="bg-[#0a201c] border-t border-gold/40 pt-12 pb-8 px-6 md:px-12 mt-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gold/20 items-start">
            
            {/* Developer Identity */}
            <div>
              <div className="text-[10px] font-semibold text-gold tracking-[0.12em] uppercase mb-3">Designed & Built by</div>
              <div className="text-[18px] font-semibold text-cream tracking-tight mb-1">Pranav Sahu</div>
              <div className="text-[13px] text-cream/70 leading-relaxed">Full Stack Developer & Digital Architect</div>
            </div>

            {/* Brands */}
            <div>
              <div className="text-[10px] font-semibold text-gold tracking-[0.12em] uppercase mb-3">Ventures</div>
              <div className="flex flex-col gap-2">
                <a href="https://www.instagram.com/the_hexatom/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-cream/60 hover:text-cream transition-colors group">
                  <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" /> Hexatom
                </a>
                <a href="https://www.instagram.com/wear_tome/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-cream/60 hover:text-cream transition-colors group">
                  <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" /> Wear Tome
                </a>
                <span className="flex items-center gap-2 text-[13px] text-cream/60 cursor-default">
                  <span className="w-1 h-1 rounded-full bg-gold/50" /> ARONAR <span className="text-[9px] text-cream/40 border border-gold/20 px-1.5 py-0.5 rounded-[3px] tracking-wide ml-1">COMING SOON</span>
                </span>
              </div>
            </div>

            {/* Social Links Formatted */}
            <div>
              <div className="text-[10px] font-semibold text-gold tracking-[0.12em] uppercase mb-3 text-glow-gold">Connect</div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/pranav-sahu-bb86b8234/" },
                  { icon: Instagram, href: "https://www.instagram.com/the_hexatom/" },
                  { icon: Instagram, href: "https://www.instagram.com/wear_tome/" },
                  { icon: Github, href: "https://github.com/pranavsahu005" },
                  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100078424104712" },
                  { icon: Instagram, href: "https://www.instagram.com/the_future_of_explainer/" },
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-[38px] h-[38px] rounded-lg border border-gold/40 flex items-center justify-center text-gold/80 hover:border-gold hover:text-forest-deep hover:bg-gold hover:-translate-y-0.5 shadow-[0_0_10px_rgba(200,164,75,0.15)] hover:shadow-[0_0_20px_rgba(200,164,75,0.5)] transition-all">
                    <social.icon className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 flex-wrap gap-3">
            <span className="text-[11px] text-gold/60 tracking-wide">© 2026 Pranav Sahu. All rights reserved.</span>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-forest-deep transition-all shadow-[0_0_15px_rgba(200,164,75,0.15)] hover:-translate-y-1"
                aria-label="Back to top"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </button>

              <a href="https://pranav005-portfolio.netlify.app" target="_blank" rel="noopener noreferrer" className="text-[11px] text-gold hover:text-gold-light transition-colors uppercase tracking-widest flex items-center gap-1.5 drop-shadow-[0_0_8px_rgba(200,164,75,0.4)]">
                Portfolio <span className="text-lg leading-none">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;
