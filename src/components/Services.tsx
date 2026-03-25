import { motion } from "framer-motion";
import { Home, Key, Building2, LineChart, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Home,
    number: "01",
    title: "Property Sales",
    description: "Buy or sell property confidently with MOPOND. Our team guides you through the entire process — from valuation to transfer.",
  },
  {
    icon: Key,
    number: "02",
    title: "Property Rentals",
    description: "Whether it's a studio flat or office block, we'll help you find the perfect space to rent — or lease out your own property.",
  },
  {
    icon: Building2,
    number: "03",
    title: "Property Management",
    description: "We manage residential and commercial properties with care, ensuring maximum occupancy and minimal stress.",
  },
  {
    icon: LineChart,
    number: "04",
    title: "Real Estate Advisory",
    description: "Get expert insight on Botswana's real estate market. We offer tailored advice and strategic property guidance.",
  },
];

const Services = () => (
  <section id="services" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">What We Do</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Services With Distinction</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 hover-lift group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-6">
              <service.icon className="w-8 h-8 text-primary" />
              <span className="text-muted-foreground/30 font-display text-3xl font-bold">{service.number}</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-3">{service.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
            <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
