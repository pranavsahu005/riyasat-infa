import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LuxuryFooter from "@/components/LuxuryFooter";
import { galleryImages } from "@/data/media";

const GalleryPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Setup lenis smooth scroll
    const setupLenis = async () => {
      window.scrollTo(0, 0);
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

    // GSAP scroll reveals
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Page fade in
      gsap.fromTo(
        ".gallery-page-hero",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
      );

      // Staggered image reveal
      gsap.utils.toArray<HTMLElement>(".gallery-page-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: (i % 4) * 0.05,
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
            },
          }
        );
      });
    };

    loadGSAP();

    return () => { cleanupLenis?.(); };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Gallery Hero Header */}
      <div className="gallery-page-hero pt-32 pb-12 px-6 md:px-12 text-center bg-background">
        <button
          onClick={() => navigate("/")}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-body hover:text-gold transition-colors mb-8 flex items-center gap-2 mx-auto"
        >
          <span>←</span> Back to Estate
        </button>
        <h1 className="luxury-heading text-5xl md:text-7xl mb-4">
          Full <span className="gold-text italic">Gallery</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto">
          Forty curated frames of villas, landscapes, amenities, and estate life at Riyasat Estate.
        </p>
        <div className="gold-divider mx-auto mt-8" />
      </div>

      {/* Full masonry gallery */}
      <section ref={sectionRef} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 [column-fill:_balance]">
            {galleryImages.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="gallery-page-item break-inside-avoid mb-5 group"
              >
                <div
                  className="relative overflow-hidden rounded-2xl border border-gold/15 bg-pista/30"
                  style={{ aspectRatio: String(item.ratio) }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={index < 12 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/72 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute left-4 right-4 bottom-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-cream text-lg font-heading leading-none">{item.title}</p>
                    <p className="text-cream/70 text-xs uppercase tracking-[0.2em] font-body mt-2">{item.meta}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="gold-divider mx-auto mt-8" />
      <LuxuryFooter />
    </div>
  );
};

export default GalleryPage;
