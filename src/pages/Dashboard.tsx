import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus, Home, Building2, MapPin, Camera, Sparkles, Info, GripVertical,
  Copy, Trash2, Eye, EyeOff, Search, ChevronDown, ArrowLeft, X,
  Bed, Bath, Maximize, DollarSign, Calendar, Tag, Layers, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

interface PropertyField {
  id: string;
  name: string;
  key: string;
  type: string;
  section: string;
  required: boolean;
  visible: boolean;
}

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  category: string;
  status: "active" | "draft" | "sold";
  beds: number;
  baths: number;
  area: string;
  description: string;
  createdAt: string;
}

const sections = [
  { id: "basics", label: "Basics", icon: Home },
  { id: "description", label: "Description & Price", icon: FileText },
  { id: "location", label: "Location", icon: MapPin },
  { id: "media", label: "Photos & Media", icon: Camera },
  { id: "amenities", label: "Amenities & Features", icon: Sparkles },
  { id: "details", label: "Building Details", icon: Info },
];

const defaultFields: PropertyField[] = [
  { id: "1", name: "Date added", key: "date_added", type: "date", section: "basics", required: false, visible: true },
  { id: "2", name: "Category", key: "category", type: "select", section: "basics", required: true, visible: true },
  { id: "3", name: "Type", key: "es_type", type: "select", section: "basics", required: true, visible: true },
  { id: "4", name: "Bedrooms", key: "bedrooms", type: "number", section: "basics", required: false, visible: true },
  { id: "5", name: "Bathrooms", key: "bathrooms", type: "number", section: "basics", required: false, visible: true },
  { id: "6", name: "Total rooms", key: "totalrooms", type: "number", section: "basics", required: false, visible: true },
  { id: "7", name: "Floors", key: "floors", type: "number", section: "details", required: false, visible: true },
  { id: "8", name: "Floor level", key: "floor_level", type: "number", section: "details", required: false, visible: true },
  { id: "9", name: "Area", key: "area", type: "text", section: "basics", required: false, visible: true },
  { id: "10", name: "Lot size", key: "lotsize", type: "text", section: "basics", required: false, visible: true },
  { id: "11", name: "Price", key: "price", type: "number", section: "description", required: true, visible: true },
  { id: "12", name: "Description", key: "description", type: "textarea", section: "description", required: true, visible: true },
  { id: "13", name: "Address", key: "address", type: "text", section: "location", required: true, visible: true },
  { id: "14", name: "City", key: "city", type: "text", section: "location", required: true, visible: true },
];

const defaultProperties: Property[] = [
  {
    id: "1", title: "Masa Centre Offices", price: "P100/m²", location: "CBD, Gaborone",
    category: "For Lease", status: "active", beds: 0, baths: 0, area: "Multi-floor",
    description: "Premium office space in the heart of Gaborone.", createdAt: "2025-03-20",
  },
  {
    id: "2", title: "Kgwebo Business Park", price: "P100/m²", location: "Kgwebo, Gaborone",
    category: "For Lease", status: "active", beds: 0, baths: 0, area: "Multi-floor",
    description: "Modern business park with excellent facilities.", createdAt: "2025-03-18",
  },
  {
    id: "3", title: "The Office Premium", price: "P171/m²", location: "Gaborone",
    category: "For Lease", status: "draft", beds: 0, baths: 0, area: "563 m²",
    description: "Premium office workspace.", createdAt: "2025-03-15",
  },
];

type DashboardTab = "properties" | "fields";

const Dashboard = () => {
  const [tab, setTab] = useState<DashboardTab>("properties");
  const [properties, setProperties] = useState<Property[]>(defaultProperties);
  const [fields, setFields] = useState<PropertyField[]>(defaultFields);
  const [activeSection, setActiveSection] = useState("basics");
  const [selectedField, setSelectedField] = useState<PropertyField | null>(null);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newField, setNewField] = useState({ name: "", key: "", type: "text", section: "basics", required: false, visible: true });

  const filteredFields = fields.filter((f) => f.section === activeSection);
  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addField = () => {
    if (!newField.name) { toast.error("Field name is required"); return; }
    const key = newField.name.toLowerCase().replace(/\s+/g, "_");
    setFields([...fields, { ...newField, id: Date.now().toString(), key }]);
    setNewField({ name: "", key: "", type: "text", section: activeSection, required: false, visible: true });
    toast.success("Field added successfully");
  };

  const deleteField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
    if (selectedField?.id === id) setSelectedField(null);
    toast.success("Field deleted");
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id));
    toast.success("Property removed");
  };

  const statusColor = (s: string) => {
    if (s === "active") return "bg-green-500/15 text-green-400 border-green-500/20";
    if (s === "sold") return "bg-primary/15 text-primary border-primary/20";
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="glass-nav px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <img src={logo} alt="MoPond" className="h-8" />
          <span className="text-foreground font-display font-semibold">Admin Dashboard</span>
        </div>
        <Button onClick={() => setShowAddProperty(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add Property
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-6 md:px-12">
        <div className="flex">
          {([
            { key: "properties" as DashboardTab, label: "Properties", icon: Building2 },
            { key: "fields" as DashboardTab, label: "Fields Builder", icon: Layers },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* PROPERTIES TAB */}
      {tab === "properties" && (
        <div className="p-6 md:p-12">
          {/* Search & filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border h-12 text-foreground"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40 bg-card border-border h-12">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property list */}
          <div className="space-y-4">
            {filteredProperties.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-display font-semibold text-foreground">{p.title}</h3>
                    <Badge className={statusColor(p.status)}>{p.status}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                    <span>{p.category}</span>
                    {p.beds > 0 && <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{p.beds} beds</span>}
                    {p.baths > 0 && <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{p.baths} baths</span>}
                    <span className="flex items-center gap-1"><Maximize className="w-3 h-3" />{p.area}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-display font-bold text-primary">{p.price}</span>
                  <Button size="sm" variant="outline" className="border-border text-foreground">Edit</Button>
                  <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => deleteProperty(p.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* FIELDS BUILDER TAB */}
      {tab === "fields" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-8rem)]">
          {/* Sections sidebar */}
          <div className="lg:col-span-2 border-r border-border p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Listing sections</h3>
            <div className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                    activeSection === s.id
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </button>
              ))}
            </div>
            <Separator className="my-4" />
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
              onClick={() => {
                const label = prompt("Section name:");
                if (label) toast.success(`Section "${label}" added`);
              }}
            >
              <Plus className="w-4 h-4 mr-1" /> Add section
            </Button>
          </div>

          {/* Fields list */}
          <div className="lg:col-span-5 border-r border-border p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Listing fields</h3>
            <div className="space-y-3">
              {filteredFields.map((f) => (
                <motion.div
                  key={f.id}
                  layout
                  onClick={() => setSelectedField(f)}
                  className={`glass-card p-4 cursor-pointer flex items-center justify-between group transition-colors ${
                    selectedField?.id === f.id ? "border-primary/30" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
                    <div>
                      <p className="font-medium text-foreground">{f.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {f.key} <Copy className="w-3 h-3" />
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); deleteField(f.id); }} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Field editor / Add field */}
          <div className="lg:col-span-5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-foreground">
                {selectedField ? "Edit field" : "Add new field"}
              </h3>
              <img src={logo} alt="MoPond" className="h-6 opacity-50" />
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Field name</label>
                <Input
                  value={selectedField?.name ?? newField.name}
                  onChange={(e) => {
                    if (selectedField) {
                      setFields(fields.map((f) => f.id === selectedField.id ? { ...f, name: e.target.value } : f));
                      setSelectedField({ ...selectedField, name: e.target.value });
                    } else {
                      setNewField({ ...newField, name: e.target.value });
                    }
                  }}
                  placeholder="New custom field"
                  className="bg-card border-border text-foreground"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Section</label>
                <Select
                  value={selectedField?.section ?? newField.section}
                  onValueChange={(v) => {
                    if (selectedField) {
                      setFields(fields.map((f) => f.id === selectedField.id ? { ...f, section: v } : f));
                      setSelectedField({ ...selectedField, section: v });
                    } else {
                      setNewField({ ...newField, section: v });
                    }
                  }}
                >
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Required field</label>
                <Switch
                  checked={selectedField?.required ?? newField.required}
                  onCheckedChange={(v) => {
                    if (selectedField) {
                      setFields(fields.map((f) => f.id === selectedField.id ? { ...f, required: v } : f));
                      setSelectedField({ ...selectedField, required: v });
                    } else {
                      setNewField({ ...newField, required: v });
                    }
                  }}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Type</label>
                <Select
                  value={selectedField?.type ?? newField.type}
                  onValueChange={(v) => {
                    if (selectedField) {
                      setFields(fields.map((f) => f.id === selectedField.id ? { ...f, type: v } : f));
                      setSelectedField({ ...selectedField, type: v });
                    } else {
                      setNewField({ ...newField, type: v });
                    }
                  }}
                >
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                    <SelectItem value="textarea">Textarea</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Visible on frontend</label>
                <Switch
                  checked={selectedField?.visible ?? newField.visible}
                  onCheckedChange={(v) => {
                    if (selectedField) {
                      setFields(fields.map((f) => f.id === selectedField.id ? { ...f, visible: v } : f));
                      setSelectedField({ ...selectedField, visible: v });
                    } else {
                      setNewField({ ...newField, visible: v });
                    }
                  }}
                />
              </div>

              {!selectedField && (
                <Button onClick={addField} className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 uppercase font-semibold tracking-wide">
                  Add Field
                </Button>
              )}

              {selectedField && (
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1 border-border text-muted-foreground" onClick={() => deleteField(selectedField.id)}>
                    Delete field
                  </Button>
                  <Button variant="outline" className="flex-1 border-border text-muted-foreground" onClick={() => {
                    const copy = { ...selectedField, id: Date.now().toString(), name: selectedField.name + " (copy)" };
                    setFields([...fields, copy]);
                    toast.success("Field duplicated");
                  }}>
                    Duplicate
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      <AnimatePresence>
        {showAddProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAddProperty(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground">Add New Property</h2>
                <button onClick={() => setShowAddProperty(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <Input placeholder="Property title" className="bg-card border-border h-12 text-foreground" />
                <Input placeholder="Price (e.g. P1,995,000)" className="bg-card border-border h-12 text-foreground" />
                <Input placeholder="Location" className="bg-card border-border h-12 text-foreground" />
                <Select>
                  <SelectTrigger className="bg-card border-border h-12">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="lease">For Lease</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-3 gap-3">
                  <Input placeholder="Beds" type="number" className="bg-card border-border h-12 text-foreground" />
                  <Input placeholder="Baths" type="number" className="bg-card border-border h-12 text-foreground" />
                  <Input placeholder="Area (m²)" className="bg-card border-border h-12 text-foreground" />
                </div>
                <Textarea placeholder="Description" rows={4} className="bg-card border-border text-foreground resize-none" />
                <Button
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    toast.success("Property added successfully!");
                    setShowAddProperty(false);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Property
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
