import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    subtitle: "Exclusive Listing",
    title: "Where Luxury\nMeets the Landscape",
    location: "Mogobe Plaza, Gaborone",
    price: "P1,995,000",
    badge: "Only 2 units left",
  },
  {
    image: hero2,
    subtitle: "Premium Commercial",
    title: "Invest in\nBotswana's Future",
    location: "CBD, Gaborone",
    price: "P100/m²",
    badge: "High demand area",
  },
  {
    image: hero3,
    subtitle: "Signature Residences",
    title: "Live Beyond\nExpectation",
    location: "Independence Place, Gaborone",
    price: "P3,500,000",
    badge: "Selling fast — 80% sold",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              {/* FOMO badge */}
              <div className="fomo-badge mb-6">
                <Clock className="w-3 h-3" />
                {slide.badge}
              </div>

              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">{slide.subtitle}</p>

              <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight whitespace-pre-line mb-6">
                {slide.title}
              </h1>

              <div className="flex items-center gap-6 text-muted-foreground mb-2">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />{slide.location}</span>
              </div>
              <p className="text-2xl font-display font-semibold text-primary mb-8">
                <TrendingUp className="w-5 h-5 inline mr-2" />From {slide.price}
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">View Property</Button>
                <Button size="lg" variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground/5">Explore All</Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-10 right-10 z-20 flex items-center gap-4">
        <button onClick={prev} className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-foreground font-display text-sm">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <button onClick={next} className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30 z-20">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-primary"
        />
      </div>
    </section>
  );
};

export default HeroSlider;
