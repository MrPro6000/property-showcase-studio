import { motion } from "framer-motion";
import { MapPin, Bed, Maximize, Clock, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const properties = [
  {
    image: property1,
    title: "Masa Centre Offices",
    location: "CBD, Gaborone",
    price: "P100/m²",
    beds: 0,
    area: "Multiple floors",
    category: "For Lease",
    fomo: "3 enquiries today",
    views: 1203,
    featured: true,
  },
  {
    image: property2,
    title: "Kgwebo Business Park",
    location: "Kgwebo, Gaborone",
    price: "P100/m²",
    beds: 0,
    area: "Multi-floor",
    category: "For Lease",
    fomo: "High demand",
    views: 847,
    featured: true,
  },
  {
    image: property3,
    title: "The Office Premium",
    location: "Gaborone",
    price: "P171/m²",
    beds: 0,
    area: "563 m²",
    category: "For Lease",
    fomo: "Only 2 left",
    views: 562,
    featured: false,
  },
];

const FeaturedProperties = () => (
  <section id="properties" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Featured Listings</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Handpicked Properties</h2>
        </motion.div>
        <Button variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          View All Properties <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, i) => (
          <motion.div
            key={property.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card overflow-hidden hover-lift group"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-primary text-primary-foreground">{property.category}</Badge>
                {property.featured && (
                  <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                )}
              </div>

              {/* FOMO */}
              <div className="absolute bottom-4 left-4">
                <span className="fomo-badge"><Clock className="w-3.5 h-3.5" />{property.fomo}</span>
              </div>

              {/* Views */}
              <div className="absolute top-4 right-4 fomo-badge-brand">
                <Eye className="w-3.5 h-3.5" />{property.views} views
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <MapPin className="w-4 h-4 text-primary" />{property.location}
              </div>

              <h3 className="text-xl font-display font-semibold text-foreground mb-3">{property.title}</h3>

              <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                {property.beds > 0 && (
                  <span className="flex items-center gap-1"><Bed className="w-4 h-4" />{property.beds} beds</span>
                )}
                <span className="flex items-center gap-1"><Maximize className="w-4 h-4" />{property.area}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xl font-display font-bold text-primary">{property.price}</span>
                <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">Details</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProperties;
