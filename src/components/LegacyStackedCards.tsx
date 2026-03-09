import { useEffect, useRef } from "react";

const stackData = [
  {
    num: "01",
    title: "Legacy",
    desc: "200K+ Square feet currently under meticulous development.",
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0dccab47-16b0-4716-9e1a-b97f124e3031_1600w.webp"
  },
  {
    num: "02",
    title: "Resort",
    desc: "Exclusive clubhouse with dining, gym, and infinity pool for unparalleled leisure.",
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/952269bf-60f5-48dc-afce-13953bead1eb_1600w.webp"
  },
  {
    num: "03",
    title: "Nature",
    desc: "Lush plantation landscaping and tranquil water bodies enveloping your sanctuary.",
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/aa5ed4de-1a7e-4bb7-b0ea-1a4c511663df_1600w.webp"
  }
];

const LegacyStackedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".legacy-card-item");

        cards.forEach((card, i) => {
          const nextCard = cards[i + 1];
          if (nextCard) {
            gsap.to(card.querySelector(".legacy-card-inner"), {
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
      }, containerRef);

      cleanup = () => ctx.revert();
    };

    loadGSAP();
    return () => cleanup?.();
  }, []);

  return (
    <section ref={containerRef} className="py-[10vh] bg-[#111] text-[#E3E1DC] relative overflow-hidden">


      <div className="w-full max-w-[1400px] mx-auto relative pb-[10vh]">
        {stackData.map((card, index) => (
          <div 
            key={card.num} 
            className="legacy-card-item flex items-center justify-center w-full min-h-[70vh] md:h-[80vh] mb-[5vh] sticky top-[5vh] md:top-[10vh]"
            style={{ zIndex: index + 1 }}
          >
            <div className="legacy-card-inner w-[95%] md:w-[90%] h-auto md:h-full max-h-[85vh] md:max-h-none bg-[#1a1a1a] border-2 border-[#E7BC7E]/40 relative overflow-y-auto overflow-x-hidden md:overflow-hidden flex flex-col md:grid md:grid-cols-[1fr_1.2fr] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] group will-change-transform rounded-2xl md:rounded-3xl">
              
              <div className="relative w-full shrink-0 h-[35vh] md:h-full overflow-hidden order-first md:order-last">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/40 md:via-transparent to-transparent opacity-90" />
              </div>

              <div className="p-6 md:p-16 flex flex-col justify-between bg-[#1a1a1a] z-10 order-last md:order-first">
                <div>
                  <div className="text-5xl md:text-6xl font-heading mb-2 md:mb-4 text-[#E3E1DC] opacity-30 font-bold">{card.num}</div>
                  <h3 className="text-3xl md:text-4xl font-bold font-heading mb-2 md:mb-4 text-[#E7BC7E]">{card.title}</h3>
                  <div className="w-12 h-px bg-[#E7BC7E]/50 mb-4 md:mb-6" />
                </div>
                <div className="text-gray-400 font-light font-body text-sm md:text-lg leading-relaxed mix-blend-screen my-4 md:my-0">
                  {card.desc}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default LegacyStackedCards;
