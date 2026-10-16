/**
 * IBRAHIM ENTERPRISE - VERIFIED PRODUCT DATA
 * Strictly using verified client information without fabricated specifications.
 */

const DEFAULT_PRODUCTS = [
  {
    id: "hing-asafoetida",
    slug: "hing-asafoetida",
    name: "Pure Hing / Asafoetida",
    category: "Spices",
    tradeType: "Import",
    tagline: "Directly imported raw aromatic resin from Afghanistan",
    origin: "Afghanistan",
    reportedVolume: "20 MT / month reported import capacity",
    image: "assets/images/hing-afghanistan.jpg",
    shortDesc: "Premium natural Asafoetida (Hing) tears and lumps directly sourced from Afghanistan, renowned for intense aroma and purity.",
    description: "Ibrahim Enterprise imports authentic, high-grade Asafoetida (Hing) directly from the mountainous harvest regions of Afghanistan. Available in pure raw resin tears, crystalline chunks, and processed grades, our Hing caters to spice manufacturers, food processing enterprises, and institutional culinary buyers across international markets.",
    highlights: [
      "Authentic Afghanistan Sourcing",
      "Reported Volume: 20 Metric Tons / Month",
      "Pure Natural Gum Oleoresin",
      "Raw Tears, Lumps & Compounded Options",
      "Export & Domestic Bulk Packaging"
    ],
    packaging: "Standard export multi-layer moisture-barrier bags, sealed food-grade drums, or customized buyer bulk packaging.",
    applications: "Seasonings, spice blends, culinary preparations, food manufacturing, and traditional formulations.",
    relatedSlugs: ["black-pepper", "cardamom", "onion-powder"]
  },
  {
    id: "basmati-rice",
    slug: "basmati-rice",
    name: "Basmati Rice",
    category: "Rice & Food Ingredients",
    tradeType: "Export",
    tagline: "Aromatic extra-long grain export quality Basmati rice",
    origin: "India",
    reportedVolume: "Part of ~100 export containers/month portfolio",
    image: "assets/images/basmati-rice.jpg",
    shortDesc: "Finely aged, naturally fragrant, extra-long grain Basmati rice processed and graded for global culinary markets.",
    description: "Our export Basmati rice offers slender grain elongation, fluffy non-sticky texture after cooking, and distinctive natural aroma. We supply premium traditional, 1121, and golden sella varieties to wholesalers, food distributors, and packaging brands across Asia, the Middle East, the UK, Europe, and the USA.",
    highlights: [
      "Exceptional Grain Elongation",
      "Pure Natural Aroma & Taste",
      "Meticulously Cleaned & Sorted",
      "Available in Raw, Steam & Golden Sella",
      "Customised Private Label Packaging Available"
    ],
    packaging: "1kg, 5kg, 10kg, 20kg, 25kg, and 50kg in PP bags, BOPP printed bags, or non-woven breathable sacks.",
    applications: "Fine dining restaurants, retail distribution, catering services, and food service suppliers.",
    relatedSlugs: ["coconut-powder", "onion-powder", "fresh-vegetables"]
  },
  {
    id: "black-pepper",
    slug: "black-pepper",
    name: "Black Pepper",
    category: "Spices",
    tradeType: "Export",
    tagline: "Bold Tellicherry & Malabar whole black peppercorns",
    origin: "India",
    reportedVolume: "Export container consignments",
    image: "assets/images/black-pepper.jpg",
    shortDesc: "Sun-dried whole black peppercorns with high piperine content, robust pungency, and rich essential oils.",
    description: "Sourced from the fertile coastal and western ghat spice estates of South India, our black pepper is sun-cured and mechanically graded. The peppercorns feature high essential oil retention, deep dark coloration, and intense heat, meeting strict international phyto-sanitary standards.",
    highlights: [
      "High Piperine & Natural Essential Oils",
      "Bold Berries (Tellicherry / Malabar Graded)",
      "Machine Cleaned & Density Graded",
      "Low Moisture Content for Extended Shelf Life",
      "Compliant with International Import Standards"
    ],
    packaging: "25kg or 50kg multi-ply paper bags or high-density poly woven export bags with inner liner.",
    applications: "Industrial spice milling, meat and savory processing, extracts, and gourmet food retail.",
    relatedSlugs: ["cardamom", "hing-asafoetida", "onion-powder"]
  },
  {
    id: "cardamom",
    slug: "cardamom",
    name: "Green Cardamom",
    category: "Spices",
    tradeType: "Export",
    tagline: "Vibrant whole green cardamom pods with intense sweet aroma",
    origin: "India",
    reportedVolume: "Export consignments to Middle East & Global Markets",
    image: "assets/images/cardamom.jpg",
    shortDesc: "Hand-picked whole green cardamom pods, carefully shade-cured to lock in emerald hue and aromatic oils.",
    description: "Known globally as the queen of spices, our green cardamom is harvested at optimal maturity to ensure plump seeds, high volatile oil concentration, and vibrant natural color. Widely exported to traditional tea, coffee, and confectionary markets across the Middle East, Europe, and Southeast Asia.",
    highlights: [
      "Vibrant Green Natural Shell",
      "Plump Pods with High Seed Count",
      "Rich Volatile Oil & Cineole Profile",
      "Carefully Sorted by Pod Diameter",
      "Aroma-Preserving Export Packaging"
    ],
    packaging: "5kg and 10kg aroma-sealed cartons with vacuum food-grade inner foil pouches, or master cartons.",
    applications: "Traditional Arabic gahwa coffee, confectionery, bakery, spice seasonings, and herbal infusions.",
    relatedSlugs: ["black-pepper", "hing-asafoetida", "basmati-rice"]
  },
  {
    id: "coconut-powder",
    slug: "coconut-powder",
    name: "Desiccated Coconut Powder",
    category: "Rice & Food Ingredients",
    tradeType: "Export",
    tagline: "Pure shredded and dried coconut without artificial additives",
    origin: "India",
    reportedVolume: "Export container consignments",
    image: "assets/images/coconut-powder.jpg",
    shortDesc: "Finely grated, hygienically dried pure coconut meat retaining natural sweetness, texture, and aroma.",
    description: "Manufactured from fresh mature coconuts, our desiccated coconut powder is processed under stringent food-safety protocols. Available in fine and medium grades, it provides balanced fat content, pure snow-white appearance, and authentic tropical coconut flavor.",
    highlights: [
      "100% Pure Natural Coconut Meat",
      "No Chemical Bleach or Added Sugar",
      "Fine & Medium Particle Classifications",
      "Controlled Moisture for High Stability",
      "Hygienic Continuous Dehydration"
    ],
    packaging: "10kg, 25kg, and 50kg multi-wall kraft paper bags with inner polyethylene heat-sealed liners.",
    applications: "Bakery goods, chocolate, confectionery, curry bases, dairy products, and ready-to-eat foods.",
    relatedSlugs: ["onion-powder", "basmati-rice", "cardamom"]
  },
  {
    id: "onion-powder",
    slug: "onion-powder",
    name: "Dehydrated Onion Powder & Flakes",
    category: "Rice & Food Ingredients",
    tradeType: "Export",
    tagline: "Pungent and consistent dehydrated white and red onion products",
    origin: "India",
    reportedVolume: "Bulk export shipments",
    image: "assets/images/onion-powder.jpg",
    shortDesc: "Dehydrated white and red onion powder, flakes, and granules delivering authentic pungent flavor and easy rehydration.",
    description: "Processed from carefully selected high-solid onion crops, our dehydrated onion range includes fine powder, minced granules, and chopped kibbled flakes. It provides long shelf-life, consistent taste, and zero preparation labor for commercial food processors.",
    highlights: [
      "Available in White & Red Onion Varieties",
      "Pure Dehydrated Product without Fillers",
      "High Rehydration Ratio & Consistent Pungency",
      "Microbiologically Tested & Metal-Detected",
      "Granules, Flakes, Minced & Powder Meshes"
    ],
    packaging: "14kg, 20kg, or 25kg corrugated master cartons with sealed poly liners.",
    applications: "Dry soup mixes, seasoning blends, snack food seasonings, sauces, and institutional catering.",
    relatedSlugs: ["coconut-powder", "black-pepper", "fresh-vegetables"]
  },
  {
    id: "fresh-vegetables",
    slug: "fresh-vegetables",
    name: "Fresh Agricultural Produce & Vegetables",
    category: "Vegetables",
    tradeType: "Export",
    tagline: "Fresh harvest vegetables for cold-chain international shipments",
    origin: "India",
    reportedVolume: "Perishable container exports across Southeast Asia & Gulf",
    image: "assets/images/fresh-vegetables.jpg",
    shortDesc: "Farm-fresh export vegetables including red onions, green chillies, okra, drumsticks, and seasonal greens.",
    description: "Ibrahim Enterprise handles temperature-controlled perishable vegetable exports with expedited dockside transfers and reefer container routing. We supply fresh onions, shallots, green chillies, okra, and specialty vegetables to retail chains and wholesale terminal markets in Sri Lanka, Malaysia, Singapore, and the Middle East.",
    highlights: [
      "Direct Farm Harvesting & Packhouse Sorting",
      "Immediate Pre-Cooling & Cold Chain Maintenance",
      "Reefer Container (Controlled Atmosphere) Loading",
      "Quick Transit to Asian & Gulf Ports",
      "Strict Quality & Pest Inspections"
    ],
    packaging: "Corrugated ventilated telescopic cartons, breathable mesh bags, or crate packings suited for reefer transport.",
    applications: "Fresh supermarket produce sections, wholesale terminal markets, and institutional kitchens.",
    relatedSlugs: ["onion-powder", "basmati-rice", "seafood"]
  },
  {
    id: "seafood",
    slug: "seafood",
    name: "Export Marine Seafood",
    category: "Seafood",
    tradeType: "Export",
    tagline: "Fresh frozen coastal fish, prawns, and marine commodities",
    origin: "India",
    reportedVolume: "Reefer container shipments to international seafood buyers",
    image: "assets/images/seafood.jpg",
    shortDesc: "Hygienically processed, blast-frozen marine seafood including Vannamei prawns, cuttlefish, ribbon fish, and sea bass.",
    description: "Operating in close proximity to major Indian coastal landing ports, Ibrahim Enterprise exports prime frozen seafood consignments. Processed in certified coastal freezing plants with rapid IQF (Individually Quick Frozen) and block freezing, our seafood reaches buyers in China, Southeast Asia, the Middle East, and Europe.",
    highlights: [
      "Coastal Dockside Sourcing from Sustainable Catches",
      "Rapid Blast & IQF Freezing at -40°C",
      "Glazing & Net Weight Integrity",
      "Temperature-Logged Reefer Container Shipments",
      "Strict Traceability & Microbiological Controls"
    ],
    packaging: "10kg / 20kg master cartons containing 1kg or 2kg inner blocks or polybags.",
    applications: "Commercial seafood importers, hotel chains, restaurant supply chains, and food processing.",
    relatedSlugs: ["fresh-vegetables", "basmati-rice", "black-pepper"]
  }
];

function getStoredProducts() {
  try {
    const raw = localStorage.getItem('ibrahim_custom_products');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read custom products from localStorage:', e);
  }
  return DEFAULT_PRODUCTS;
}

const PRODUCTS = getStoredProducts();

const CATEGORIES = ["All", "Spices", "Rice & Food Ingredients", "Vegetables", "Seafood"];

// Helper functions
function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

function getProductsByCategory(category) {
  if (!category || category === "All") return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

function getRelatedProducts(relatedSlugs) {
  if (!relatedSlugs || !relatedSlugs.length) return PRODUCTS.slice(0, 3);
  return PRODUCTS.filter(p => relatedSlugs.includes(p.slug));
}
