import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 200, suffix: "K+", label: "Sq. Ft. Under Development" },
  { value: 50, suffix: "+", label: "Premium Estate Plots" },
  { value: 60, suffix: "ft", label: "Wide Internal Roads" },
  { value: 100, suffix: "%", label: "Gated & Secure Estate" },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-heading text-5xl md:text-7xl gold-text">
      {count}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="section-padding bg-[#EAE8E4] relative overflow-hidden text-[#1a1a1a]">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-heading text-[12rem] md:text-[20rem] text-[#1a1a1a]/[0.02] font-light whitespace-nowrap select-none">
          RIYASAT
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pb-16 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="stat-item relative rounded-2xl overflow-hidden group h-64 md:h-80">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80" alt="The Green Glades" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <h3 className="text-white font-heading text-xl md:text-2xl mb-2">The Grove</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">10,000 Sqft</span>
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">4 Bed</span>
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">Nature View</span>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="stat-item relative rounded-2xl overflow-hidden group h-64 md:h-80 lg:mt-12">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80" alt="Meadow View" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <h3 className="text-white font-heading text-xl md:text-2xl mb-2">Meadow Villa</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">6,000 Sqft</span>
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">Lake Access</span>
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">Investment</span>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="stat-item relative rounded-2xl overflow-hidden group h-64 md:h-80">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" alt="Resort Club" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <h3 className="text-white font-heading text-xl md:text-2xl mb-2">Resort Clubhouse</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">Amenities</span>
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">Pool</span>
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">Lounge</span>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="stat-item relative rounded-2xl overflow-hidden group h-64 md:h-80 lg:mt-12">
            <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80" alt="Layout" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <h3 className="text-white font-heading text-xl md:text-2xl mb-2">Master Avenue</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">Wide Roads</span>
                <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-1 rounded backdrop-blur-md">Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
