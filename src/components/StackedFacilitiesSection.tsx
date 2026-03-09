import { useEffect, useRef } from "react";
import { facilityCards } from "@/data/media";

const StackedFacilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        // Heading reveal
        gsap.fromTo(
          ".stacked-heading",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: ".stacked-heading",
              start: "top 88%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );

        // Stacked Cards Logic (Matching real-estate-building.html)
        const cards = gsap.utils.toArray<HTMLElement>(".stack-facility-item");

        cards.forEach((card, i) => {
          const nextCard = cards[i + 1];
          if (nextCard) {
            gsap.to(card.querySelector(".stack-facility-card"), {
              scale: 0.9,
              opacity: 0.4,
              ease: "none",
              scrollTrigger: {
                trigger: nextCard,
                start: "top bottom",
                end: "top 10vh",
                scrub: true,
              },
            });
          }
        });
      }, sectionRef);

      cleanup = () => ctx.revert();
    };

    loadGSAP();
    return () => cleanup?.();
  }, []);

  return (
    <section ref={sectionRef} id="facilities-stack" className="py-24 bg-[#b9cbb5] text-[#1a1a1a]">
      <div className="text-center mb-20 px-6">
        <div className="text-xs uppercase tracking-widest mb-4 opacity-70 font-body">Estate Facilities</div>
        <h2 className="stacked-heading font-heading font-light tracking-[0.02em] text-5xl md:text-7xl text-[#4A3B2C]">
          <span className="font-medium text-[#4A3B2C]">AMENITIES</span>{' '}
          <span className="text-[#c8a44b] font-medium italic">IN</span>{' '}
          <span className="font-medium text-[#4A3B2C]">LAYERS</span>
        </h2>
      </div>

      <div className="stacked-cards-shell relative pb-[10vh] w-full max-w-[1400px] mx-auto min-h-[100vh]">
        {facilityCards.map((card, index) => (
          <div 
            key={card.title} 
            className="stack-facility-item flex items-center justify-center w-full min-h-[70vh] md:min-h-[70vh] mb-[15vh] sticky top-[5vh] md:top-[15vh]" 
            style={{ zIndex: index + 1 }}
          >
            <div className="stack-facility-card w-[95%] md:w-[90%] h-auto md:h-[70vh] max-h-[85vh] md:max-h-none bg-[#0a0a0a] border-2 border-[#E7BC7E]/40 relative overflow-y-auto overflow-x-hidden md:overflow-hidden flex flex-col md:grid md:grid-cols-[1fr_1.2fr] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] will-change-transform rounded-2xl group">
              <div className="stack-card-img-wrap relative w-full shrink-0 h-[35vh] md:h-full order-first md:order-last overflow-hidden">
                <img src={card.src} alt={card.alt} className="stack-card-img w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" loading="lazy" decoding="async" />
              </div>
              
              <div className="stack-card-content bg-cream text-foreground p-6 md:p-12 lg:p-16 flex flex-col justify-between border-r-0 md:border-r border-[#E7BC7E]/20 rounded-b-2xl md:rounded-b-none md:rounded-l-2xl z-10 order-last md:order-first">
                <div>
                  <div className="font-heading text-5xl md:text-6xl mb-1 md:mb-2 text-[#c8a44b] font-bold">0{index + 1}.</div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-forest-deep">{card.title}</h3>
                  <p className="text-[10px] md:text-sm mt-2 md:mt-4 text-forest-deep/60 uppercase tracking-widest font-body">Facility</p>
                </div>
                <div className="text-foreground/80 font-light text-xs md:text-sm leading-relaxed max-w-sm font-body space-y-3 md:space-y-4 my-4 md:my-0">
                  <p>{card.copy}</p>
                  <p className="hidden md:block">Discover an environment crafted with meticulous attention to detail. Our spaces are thoughtfully designed to foster both relaxation and dynamic social encounters, enveloped in timeless luxury and elegance.</p>
                </div>
                <button className="text-left text-[#E7BC7E] font-bold uppercase tracking-widest text-[10px] md:text-xs border-b border-[#E7BC7E]/50 pb-1 md:pb-2 w-max hover:text-forest-deep hover:border-forest-deep transition-colors font-body mt-2 md:mt-8">
                  Explore Facility
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StackedFacilitiesSection;
