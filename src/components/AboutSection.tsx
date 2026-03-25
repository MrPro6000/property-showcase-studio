import { motion } from "framer-motion";
import { Shield, Award, Users, Zap } from "lucide-react";

const features = [
  { icon: Shield, title: "Trusted & Secure", desc: "Backed by Mogobe Incorporated Group" },
  { icon: Award, title: "Award-Winning", desc: "Top agency in Botswana" },
  { icon: Users, title: "Expert Team", desc: "Licensed professionals at your service" },
  { icon: Zap, title: "Fast Closings", desc: "Streamlined process, quick results" },
];

const AboutSection = () => (
  <section id="about" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">About MOPOND</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
          Your Dream Property. <br /> Our Passion.
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          Welcome to <strong className="text-foreground">MOPOND Real Estate Agency</strong>, your trusted partner in Botswana's dynamic property market. Backed by the Mogobe Incorporated Group, we specialize in buying, selling, leasing, and managing properties with unmatched professionalism and insight.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          With partnerships across industry leaders such as Time Projects, RDC, Letlole La Rona, Turnstar, and Applebys — we deliver results that exceed expectations.
        </p>
        <div className="fomo-badge-brand text-sm">🔥 Over P50M+ in property transactions this year alone</div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 text-center hover-lift"
          >
            <f.icon className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
