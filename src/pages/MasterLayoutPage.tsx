import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LuxuryFooter from "@/components/LuxuryFooter";
import { galleryImages } from "@/data/media";

const MasterLayoutPage = () => {
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
        ".master-hero",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
      );
      
      gsap.fromTo(
        ".master-image-reveal",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
    };

    loadGSAP();
    return () => { cleanupLenis?.(); };
  }, []);

  return (
    <div className="overflow-x-hidden bg-background">
      <Navbar />

      <div className="master-hero pt-32 pb-12 px-6 md:px-12 text-center bg-background">
        <button
          onClick={() => navigate("/")}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-body hover:text-gold transition-colors mb-8 flex items-center gap-2 mx-auto"
        >
          <span>←</span> Back to Estate
        </button>
        <h1 className="luxury-heading text-5xl md:text-7xl mb-4">
          Master <span className="gold-text italic">Layout</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto">
          Explore the master plan of Riyasat Estate. Designed to maximize privacy, connectivity, and integration with the native landscape.
        </p>
        <div className="gold-divider mx-auto mt-8" />
      </div>

      <section className="py-12 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="master-image-reveal relative w-full h-[60vh] md:h-[80vh] rounded-3xl overflow-hidden border-2 border-[#c8a44b]/30 shadow-2xl group group-hover:cursor-zoom-in">
          {/* We'll use the masterplan aerial image */}
          <img 
            src={galleryImages[3].src} 
            alt="Estate Master Plan Layout" 
            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 pointer-events-none">
            <h3 className="text-white font-heading text-2xl md:text-4xl drop-shadow-lg mb-2">Phase I Development</h3>
            <p className="text-[#F5E6CA] font-body text-sm max-w-sm drop-shadow-md">
              Highlighting the grand entrance, central clubhouse resort, winding primary avenues, and the prominent water bodies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-4xl text-[#c8a44b] font-heading mb-2">200K+</div>
              <div className="text-xs uppercase tracking-widest text-forest-deep/70 font-bold mb-2">Sq. Ft. Area</div>
              <p className="text-sm font-body text-muted-foreground">Vast pristine acreage reserved for exclusive luxury estates.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#c8a44b] font-heading mb-2">60ft</div>
              <div className="text-xs uppercase tracking-widest text-forest-deep/70 font-bold mb-2">Wide Avenues</div>
              <p className="text-sm font-body text-muted-foreground">Tree-lined massive arterial roads for smooth arrival.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#c8a44b] font-heading mb-2">10+</div>
              <div className="text-xs uppercase tracking-widest text-forest-deep/70 font-bold mb-2">Resort Amenities</div>
              <p className="text-sm font-body text-muted-foreground">World-class facilities centralized at the clubhouse.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#c8a44b] font-heading mb-2">100%</div>
              <div className="text-xs uppercase tracking-widest text-forest-deep/70 font-bold mb-2">Vastu Compliant</div>
              <p className="text-sm font-body text-muted-foreground">Thoughtfully oriented plots for harmonious living.</p>
            </div>
        </div>
      </section>

      <div className="py-12"></div>
      <LuxuryFooter />
    </div>
  );
};

export default MasterLayoutPage;
