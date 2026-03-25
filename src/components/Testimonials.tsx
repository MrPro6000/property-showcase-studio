import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Moalosi Moesi",
    role: "Property Investor",
    text: "Mopond Real Estate Agency is a professional agency with experienced realtors that are highly motivated. Mopond boasts a wealth of properties owned by the larger group called Mogobe Incorporated.",
    rating: 5,
  },
  {
    name: "Praveen Sridharan",
    role: "Homeowner",
    text: "I found my dream home with Mopond! From the moment I reached out, their team was incredibly responsive, friendly, and professional. The process was smooth and everything felt fast and reliable.",
    rating: 5,
  },
  {
    name: "Kealeboga Modise",
    role: "Business Owner",
    text: "The commercial leasing process was seamless. Their knowledge of the Gaborone market is unmatched. We found the perfect office space within our budget in just two weeks.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12">Trusted by Hundreds</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-10 md:p-16"
          >
            <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-display text-foreground italic leading-relaxed mb-8">
              "{t.text}"
            </blockquote>
            <p className="text-foreground font-semibold text-lg">{t.name}</p>
            <p className="text-muted-foreground text-sm">{t.role}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
