import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/mock-data";
import { Button } from "@/components/ui/button";

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl h-[280px] sm:h-[360px] lg:h-[440px] shadow-soft-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16 max-w-xl">
            <motion.span
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-2"
            >
              Limited Time Offer
            </motion.span>
            <motion.h2
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 font-display leading-tight"
            >
              {slide.title}
            </motion.h2>
            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-white/80 mb-8"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.55 }}>
              <Button size="lg" className="rounded-xl font-semibold px-8 shadow-lg">
                {slide.cta}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 bg-foreground/10 backdrop-blur-sm rounded-full px-3 py-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-400 ${i === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={() => setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-all border border-white/10">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={() => setCurrent((p) => (p + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-all border border-white/10">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
