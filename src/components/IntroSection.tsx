import { useEffect, useRef } from "react";
import { Trees, Mountain, Home, Gem, Sun, Leaf } from "lucide-react";

const concepts = [
  { icon: Trees, title: "Nature Retreat", desc: "Escape the urban rush" },
  { icon: Mountain, title: "Peaceful Living", desc: "Surrounded by hills" },
  { icon: Home, title: "Family Getaway", desc: "Weekend sanctuary" },
  { icon: Gem, title: "Private Estate", desc: "Your exclusive land" },
  { icon: Sun, title: "Luxury Escape", desc: "Premium lifestyle" },
  { icon: Leaf, title: "Green Living", desc: "Eco-conscious design" },
];

const IntroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        ".intro-heading",
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: ".intro-heading", start: "top 85%", end: "top 50%", scrub: 1 },
        }
      );

      gsap.utils.toArray<HTMLElement>(".concept-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, rotation: i % 2 === 0 ? -2 : 2 },
          {
            y: 0, opacity: 1, rotation: 0, duration: 0.8,
            scrollTrigger: { trigger: card, start: "top 90%", end: "top 65%", scrub: 1 },
          }
        );
      });
    };
    loadGSAP();
  }, []);

  return (
    <section ref={sectionRef} id="project" className="section-padding cream-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="intro-heading luxury-heading text-4xl md:text-6xl lg:text-7xl text-center mb-6 text-foreground">
          Whatever type of place<br />
          <span className="gold-text italic">you have in mind</span>
        </h2>
        <p className="text-center text-muted-foreground font-body text-sm md:text-base max-w-2xl mx-auto mb-16 leading-relaxed">
          Green Glades Estate offers a canvas for your vision — from serene weekend retreats 
          to legacy luxury estates nestled in nature's embrace near Bhopal.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {concepts.map((concept) => (
            <div
              key={concept.title}
              className="concept-card luxury-card p-8 md:p-10 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-pista transition-colors duration-500 group-hover:bg-gold/20">
                <concept.icon className="w-7 h-7 text-forest-light group-hover:text-gold transition-colors duration-500" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">{concept.title}</h3>
              <p className="text-muted-foreground text-sm font-body">{concept.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
