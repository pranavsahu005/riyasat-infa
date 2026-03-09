import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LuxuryFooter from "@/components/LuxuryFooter";
import { facilityCards } from "@/data/media";

const AmenitiesPage = () => {
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
        ".amenity-hero",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
      );

      gsap.utils.toArray<HTMLElement>(".amenity-section-reveal").forEach((item) => {
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
    };

    loadGSAP();
    return () => { cleanupLenis?.(); };
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#b9cbb5] text-[#1a1a1a]">
      <Navbar />

      {/* Hero Header */}
      <div className="amenity-hero pt-32 pb-16 px-6 md:px-12 text-center bg-[#b9cbb5]">
        <button
          onClick={() => navigate("/")}
          className="text-xs uppercase tracking-[0.3em] font-body hover:text-forest-deep transition-colors mb-8 flex items-center gap-2 mx-auto text-forest-deep/60"
        >
          <span>←</span> Back to Estate
        </button>
        <span className="text-xs uppercase tracking-[0.3em] font-body font-bold text-[#c8a44b] mb-4 block">Resort Level</span>
        <h1 className="luxury-heading text-5xl md:text-7xl mb-6 text-[#4A3B2C]">
          Amenities & <span className="text-[#c8a44b] italic">Facilities</span>
        </h1>
        <p className="font-body text-sm max-w-2xl mx-auto leading-relaxed text-forest-deep/80">
          Curated spaces designed to elevate your everyday living. From wellness studios to expansive grand lawns, every facility is woven seamlessly into the estate's natural fabric.
        </p>
        <div className="gold-divider mx-auto mt-10" />
      </div>

      {/* Facilities Flex Layout */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto space-y-32">
        {facilityCards.map((card, index) => {
          const reverse = index % 2 === 1;
          return (
            <div key={index} className={`amenity-section-reveal flex flex-col md:flex-row gap-12 items-center ${reverse ? "md:flex-row-reverse" : ""}`}>
              <div className="w-full md:w-[55%] relative overflow-hidden rounded-3xl border border-[#c8a44b]/30 shadow-xl group">
                <div className="aspect-[4/3] relative">
                  <img src={card.src} alt={card.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]" />
                  <div className="absolute inset-0 bg-forest-deep/10 mix-blend-overlay"></div>
                </div>
              </div>

              <div className="w-full md:w-[45%] flex flex-col justify-center px-4 md:px-0">
                <div className="relative mb-8">
                  <div className="absolute -top-14 -left-6 md:-left-10 text-[140px] md:text-[180px] font-heading font-black text-[#4A3B2C]/[0.07] leading-none select-none z-0 tracking-tighter">
                    0{index + 1}.
                  </div>
                  <h3 className="relative text-4xl md:text-5xl text-[#4A3B2C] font-heading font-bold z-10 mt-10">
                    {card.title}
                  </h3>
                </div>
                <div className="w-20 h-[1px] bg-[#c8a44b] mb-8 z-10" />
                <p className="text-[#3A433A] font-body text-base md:text-lg leading-relaxed mb-8 z-10 relative">
                  {card.copy}
                </p>
                <div className="text-xs uppercase tracking-[0.2em] text-[#c8a44b] font-bold z-10 relative">
                  Resort Included
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <div className="py-20"></div>
      <LuxuryFooter />
    </div>
  );
};

export default AmenitiesPage;
