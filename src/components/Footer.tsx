import { Facebook, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border py-16 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <img src={logo} alt="MoPond Real Estate Agency" className="h-10 mb-4" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Botswana's premier real estate agency. Backed by the Mogobe Incorporated Group.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li><a href="/#properties" className="hover:text-primary transition-colors">Properties</a></li>
            <li><a href="/#services" className="hover:text-primary transition-colors">Services</a></li>
            <li><a href="/#about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="/#contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>Property Sales</li>
            <li>Property Rentals</li>
            <li>Property Management</li>
            <li>Real Estate Advisory</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} MoPond Real Estate Agency. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
