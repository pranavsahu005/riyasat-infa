import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LuxuryFooter from "@/components/LuxuryFooter";
import bhopalMap from "@/assets/bhopal-city-map.jpg";

const LocationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const setupLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      });
      lenis.scrollTo(0, { immediate: true });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      return () => lenis.destroy();
    };

    let cleanupLenis: (() => void) | undefined;
    setupLenis().then((cleanup) => { cleanupLenis = cleanup; });

    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".location-hero",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
      );

      gsap.utils.toArray<HTMLElement>(".loc-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
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
    };

    loadGSAP();
    return () => { cleanupLenis?.(); };
  }, []);

  return (
    <div className="overflow-x-hidden bg-background">
      <Navbar />

      <div className="location-hero pt-32 pb-16 px-6 md:px-12 text-center bg-background">
        <button
          onClick={() => navigate("/")}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-body hover:text-gold transition-colors mb-8 flex items-center gap-2 mx-auto"
        >
          <span>←</span> Back to Estate
        </button>
        <span className="text-xs uppercase tracking-[0.3em] font-body font-bold text-[#c8a44b] mb-4 block">Access & Geography</span>
        <h1 className="luxury-heading text-5xl md:text-7xl mb-6">
          Location & <span className="gold-text italic">Connectivity</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm max-w-2xl mx-auto leading-relaxed">
          Strategically positioned away from the chaos but tightly connected to Bhopal's core. Discover the geographical advantage of Green Glades Estate.
        </p>
        <div className="gold-divider mx-auto mt-10" />
      </div>

      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="loc-reveal flex flex-col md:flex-row shadow-[0_30px_60px_rgba(0,0,0,0.4)] rounded-3xl overflow-hidden border border-gold/30 bg-forest-deep">
          {/* Aesthetic Map Side */}
          <div className="w-full md:w-[60%] h-[400px] md:h-[600px] relative overflow-hidden group">
             <img 
               src={bhopalMap} 
               alt="Bhopal City Map" 
               className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-forest-deep/20 pointer-events-none"></div>
             
             {/* Map Markers */}
             <div className="absolute top-[38%] left-[52%] flex flex-col items-center drop-shadow-2xl">
               <div className="w-6 h-6 rounded-full bg-gold animate-pulse shadow-[0_0_20px_rgba(200,164,75,1)]"></div>
               <div className="bg-forest-deep/90 backdrop-blur-md text-gold font-heading px-4 py-2 mt-3 rounded-md border border-gold/50 text-sm tracking-wide">
                 Green Glades Estate
               </div>
             </div>
          </div>

          {/* Details Side */}
          <div className="w-full md:w-[40%] p-10 md:p-14 flex flex-col justify-center bg-forest-deep/90 border-l border-gold/10">
             <h3 className="text-gold font-heading text-2xl md:text-3xl mb-8">Travel Distances</h3>
             
             <div className="space-y-8">
               <div className="border-b border-gold/10 pb-4">
                 <div className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Bhopal Airport</div>
                 <div className="text-cream font-body">25 Minutes | Smooth highway transit</div>
               </div>
               
               <div className="border-b border-gold/10 pb-4">
                 <div className="text-xs uppercase tracking-widest text-gold font-bold mb-1">City Center / CBD</div>
                 <div className="text-cream font-body">30 Minutes | Direct 4-lane approach</div>
               </div>

               <div className="border-b border-gold/10 pb-4">
                 <div className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Key Hospitals</div>
                 <div className="text-cream font-body">15 Minutes | Immediate medical access</div>
               </div>

               <div className="pt-2">
                 <div className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Upcoming Infrastructure</div>
                 <div className="font-body text-sm text-cream/70 leading-relaxed">Proximate to the upcoming outer ring road connecting major highways directly to the estate's arrival zone.</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      <div className="py-20"></div>
      <LuxuryFooter />
    </div>
  );
};

export default LocationPage;
