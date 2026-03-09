import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LuxuryFooter from "@/components/LuxuryFooter";
import { galleryImages } from "@/data/media";

// GSAP types are handled via the dynamic import inside initScrolling

const brochureLinks = [
  "cOeQQ0nZOJB",
  "cOeQQ0nZOJg",
  "cOeQQ0nZOJk",
  "cOeQQ0nZOJp",
  "cOeQQ0nZOJC",
  "cOeQQ0nZOJ5",
  "cOeQQ0nZOJE",
  "cOeQQ0nZOJG"
];

const AboutPage = () => {
  const navigate = useNavigate();
  const brochureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const initScrolling = async () => {
      const [LenisModule, gsapModule, scrollTriggerModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      const Lenis = LenisModule.default;
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
        lerp: 0.1,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".about-hero",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
        );

        gsap.utils.toArray<HTMLElement>(".about-section-reveal").forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              },
            }
          );
        });

        // Stacked Cards Logic for Brochure (EXACT 1:1 MATCH with Amenities)
        const cards = gsap.utils.toArray<HTMLElement>(".brochure-card-item");
        cards.forEach((card, i) => {
          const innerCard = card.querySelector(".brochure-card-inner");
          const nextCard = cards[i + 1];
          
          if (nextCard && innerCard) {
            gsap.to(innerCard, {
              scale: 0.9,
              opacity: 0.4,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: nextCard,
                start: "top bottom",
                end: "top 10vh",
                scrub: true,
              },
            });
          }
        });

        ScrollTrigger.refresh();
      }, brochureRef.current);

      return { lenis, ctx, tickerCallback, gsap };
    };

    interface ScrollHandler {
      lenis: { destroy: () => void; raf: (time: number) => void };
      ctx: { revert: () => void };
      tickerCallback: (time: number) => void;
      gsap: { ticker: { remove: (fn: (time: number) => void) => void } };
    }

    let scrollHandler: {
      lenis: { destroy: () => void; raf: (time: number) => void };
      ctx: { revert: () => void };
      tickerCallback: (time: number) => void;
      gsap: { ticker: { remove: (fn: (time: number) => void) => void } };
    } | undefined;
    
    initScrolling().then(instance => {
      scrollHandler = instance;
    });
    
    return () => { 
      scrollHandler?.ctx.revert();
      scrollHandler?.lenis.destroy();
      if (scrollHandler?.gsap && scrollHandler?.tickerCallback) {
        scrollHandler.gsap.ticker.remove(scrollHandler.tickerCallback);
      }
    };
  }, []);

  return (
    <div className="overflow-x-hidden bg-background">
      <Navbar />

      {/* Hero Header */}
      <div className="about-hero pt-32 pb-16 px-6 md:px-12 text-center bg-background">
        <button
          onClick={() => navigate("/")}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-body hover:text-gold transition-colors mb-8 flex items-center gap-2 mx-auto"
        >
          <span>←</span> Back to Estate
        </button>
        <span className="text-xs uppercase tracking-[0.3em] font-body font-bold text-[#c8a44b] mb-4 block">The Vision</span>
        <h1 className="luxury-heading text-5xl md:text-7xl mb-6">
          About The <span className="gold-text italic">Project</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm max-w-2xl mx-auto leading-relaxed">
          Green Glades Estate, situated near the pristine landscapes of Bhopal, is a sanctuary for those who seek the perfect balance between nature's tranquility and uncompromising luxury.
        </p>
        <div className="gold-divider mx-auto mt-10" />
      </div>

      {/* Content Sections */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
        {/* Section 1 */}
        <div className="about-section-reveal grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#c8a44b]/20">
            <img src={galleryImages[18].src} alt="Gated Community" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-forest-deep/10 mix-blend-overlay"></div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-heading text-4xl md:text-5xl text-forest-deep mb-6">Masterful <span className="text-[#c8a44b] italic">Land Planning</span></h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Our approach to land planning ensures that the natural topography is respected and enhanced. Wide internal avenues, carefully positioned plots, and dedicated green reserves create an environment where luxury seamlessly integrates with the earth.
            </p>
            <div className="w-16 h-px bg-[#c8a44b]/50" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="about-section-reveal grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl text-forest-deep mb-6">A True <span className="text-[#c8a44b] italic">Gated Community</span></h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Security and privacy are the cornerstones of the Riyasat philosophy. The estate is fortified with a monumental entry gate, 24/7 surveillance, and an exclusive community of like-minded individuals who share your appreciation for fine living.
            </p>
            <div className="w-16 h-px bg-[#c8a44b]/50" />
          </div>
          <div className="relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#c8a44b]/20">
            <img src={galleryImages[16].src} alt="Nature Integration" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-forest-deep/10 mix-blend-overlay"></div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="about-section-reveal grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#c8a44b]/20">
            <img src={galleryImages[26].src} alt="Long Term Value" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-forest-deep/10 mix-blend-overlay"></div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-heading text-4xl md:text-5xl text-forest-deep mb-6">Long-Term <span className="text-[#c8a44b] italic">Value</span></h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Acquiring a piece of Riyasat Estate is more than buying land; it is cementing a legacy. Real estate rooted in nature, developed with premier infrastructure, naturally commands long-term appreciation for generations to come.
            </p>
            <div className="w-16 h-px bg-[#c8a44b]/50" />
          </div>
        </div>
      </section>

      {/* Project Brochure - Stacked Cards */}
      <section ref={brochureRef} className="bg-forest-deep text-cream py-24">
        <div className="text-center mb-16 px-6">
          <div className="text-xs uppercase tracking-widest mb-4 opacity-70 font-body text-[#c8a44b]">Project Details</div>
          <h2 className="font-heading font-light tracking-[0.02em] text-4xl md:text-6xl text-[#F5E6CA]">
            Project <span className="text-[#c8a44b] font-medium italic">Brochure</span>
          </h2>
        </div>

        <div className="relative pb-[10vh] w-full max-w-[1400px] mx-auto min-h-[100vh]">
          {brochureLinks.map((linkId, index) => (
            <div 
              key={index} 
              className="brochure-card-item flex items-center justify-center w-full min-h-[70vh] md:min-h-[85vh] mb-[15vh] sticky top-[5vh] md:top-[10vh]" 
              style={{ zIndex: index + 1 }}
            >
              <div className="brochure-card-inner w-[95%] md:w-[92%] h-[60vh] md:h-[80vh] bg-[#1B4332] border-2 md:border-4 border-[#E7BC7E] shadow-[0_45px_90px_-20px_rgba(0,0,0,0.9)] will-change-transform rounded-3xl overflow-hidden flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
                
                {/* Scroll mask to prevent iframe from stalling the page scroll */}
                <div className="absolute inset-0 z-[15] pointer-events-none md:group-hover:pointer-events-auto"></div>

                {/* Embed Player */}
                <div className="w-full h-full relative z-0 flex items-center justify-center bg-[#051C14]">
                  <iframe 
                    style={{ width: "100%", height: "100%", border: 0 }} 
                    scrolling="no" 
                    src={`https://go.screenpal.com/player/${linkId}?ff=0&ahc=1&dcc=0&tl=0&bg=transparent&share=0&download=0&embed=1&cl=0&ap=0&muted=1&showTitle=0&loop=1`} 
                    allow="autoplay; fullscreen"
                    allowFullScreen={true}
                    className="w-full h-full pointer-events-none md:pointer-events-auto"
                  >
                  </iframe>
                  {/* Invisible scroll mask for mobile specifically */}
                  <div className="absolute inset-0 z-[1] md:hidden"></div>
                </div>
                
                {/* Luxury Label */}
                <div className="absolute top-6 left-6 z-20 bg-[#c8a44b] px-4 py-2 rounded-lg border border-white/20 shadow-xl">
                  <span className="text-[12px] text-white uppercase tracking-[0.2em] font-bold">BROCHURE PAGE 0{index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Presentation Section */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-forest-deep mb-4">Visual <span className="text-[#c8a44b] italic">Walkthrough</span></h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">Immerse yourself in carefully curated luxury. Watch our comprehensive presentation on the Green Glades Estate.</p>
        </div>
        
        <div className="w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-[#c8a44b]/30 bg-[#111]">
          <div className="sp-embed-player" data-id="cOeQiPnZOy0" data-aspect-ratio="1.777778" data-padding-top="56.250000%" style={{position: "relative", width: "100%", paddingTop: "56.250000%", height: 0}}>
            <iframe 
              style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0}} 
              scrolling="no" 
              src="https://go.screenpal.com/player/cOeQiPnZOy0?ff=0&ahc=1&dcc=0&tl=0&bg=transparent&share=0&download=0&embed=1&cl=0&ap=1&muted=1&showTitle=0&loop=1" 
              allow="autoplay; fullscreen"
              allowFullScreen={true}>
            </iframe>
          </div>
        </div>
      </section>

      <div className="py-20"></div>
      <LuxuryFooter />
    </div>
  );
};

export default AboutPage;
