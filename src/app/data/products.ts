export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  scale: string;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Porsche 911 GT3 RS",
    brand: "Tarmac Works",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    category: "Sports Cars",
    scale: "1:64",
    inStock: true,
    isNew: true,
    isBestSeller: true,
    description: "Highly detailed diecast model of the iconic Porsche 911 GT3 RS with opening parts and authentic details.",
    features: ["Opening doors", "Detailed interior", "Rubber tires", "Metal body"]
  },
  {
    id: "2",
    name: "Nissan Skyline GT-R R34",
    brand: "Mini GT",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    category: "JDM",
    scale: "1:64",
    inStock: true,
    isBestSeller: true,
    description: "Legendary Japanese sports car in stunning detail with accurate livery and proportions.",
    features: ["Opening hood", "Detailed engine", "Rubber tires", "Metal chassis"]
  },
  {
    id: "3",
    name: "Ferrari F40",
    brand: "Spark Model",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae",
    category: "Super Cars",
    scale: "1:43",
    inStock: true,
    isNew: true,
    description: "Premium quality model of the legendary Ferrari F40 with exceptional detail and finish.",
    features: ["Opening doors and hood", "Full interior detail", "Detailed engine bay", "Display case included"]
  },
  {
    id: "4",
    name: "Lamborghini Aventador SVJ",
    brand: "AutoArt",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b",
    category: "Super Cars",
    scale: "1:18",
    inStock: true,
    isBestSeller: true,
    description: "Museum-grade replica of the Aventador SVJ with incredible attention to detail.",
    features: ["Full opening parts", "Leather interior", "Working suspension", "Steerable wheels"]
  },
  {
    id: "5",
    name: "Honda NSX Type R",
    brand: "Inno64",
    price: 64.99,
    originalPrice: 79.99,
    discount: 19,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
    category: "JDM",
    scale: "1:64",
    inStock: true,
    description: "Classic Honda NSX Type R in Championship White with authentic details.",
    features: ["Opening doors", "Detailed interior", "Rubber tires", "Metal body"]
  },
  {
    id: "6",
    name: "BMW M3 E30",
    brand: "Mini GT",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1617531653520-bd466ee81a1d",
    category: "Classic",
    scale: "1:64",
    inStock: true,
    isNew: true,
    description: "Iconic BMW M3 E30 in classic livery with racing details.",
    features: ["Racing livery", "Detailed interior", "Rubber tires", "Metal chassis"]
  },
  {
    id: "7",
    name: "McLaren P1",
    brand: "TSM Model",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60",
    category: "Hyper Cars",
    scale: "1:18",
    inStock: true,
    isBestSeller: true,
    description: "Stunning McLaren P1 hypercar with working active aerodynamics.",
    features: ["Active rear wing", "Opening doors", "Full interior", "Carbon fiber details"]
  },
  {
    id: "8",
    name: "Toyota Supra A80",
    brand: "Tarmac Works",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302",
    category: "JDM",
    scale: "1:64",
    inStock: true,
    description: "Legendary Toyota Supra A80 with authentic styling and details.",
    features: ["Opening parts", "Detailed engine", "Rubber tires", "Metal body"]
  },
  {
    id: "9",
    name: "Audi R8 V10 Plus",
    brand: "Maisto",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1610768764270-790fbec18178",
    category: "Sports Cars",
    scale: "1:24",
    inStock: true,
    description: "Detailed Audi R8 V10 Plus with distinctive styling and proportions.",
    features: ["Opening doors", "Detailed interior", "Rubber tires", "Metal body"]
  },
  {
    id: "10",
    name: "Mercedes-AMG GT Black Series",
    brand: "Spark Model",
    price: 134.99,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
    category: "Sports Cars",
    scale: "1:43",
    inStock: true,
    isNew: true,
    description: "Latest Mercedes-AMG GT Black Series with aggressive aerodynamics.",
    features: ["Opening parts", "Interior detail", "Display case", "Limited edition"]
  },
  {
    id: "11",
    name: "Ford Mustang GT500",
    brand: "Shelby Collectibles",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1584345604476-8ec5f8098e26",
    category: "Muscle Cars",
    scale: "1:18",
    inStock: false,
    description: "Classic American muscle with detailed engine bay and interior.",
    features: ["Opening hood and doors", "Detailed V8 engine", "Fabric seatbelts", "Metal body"]
  },
  {
    id: "12",
    name: "Mazda RX-7 FD",
    brand: "Inno64",
    price: 72.99,
    originalPrice: 89.99,
    discount: 19,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
    category: "JDM",
    scale: "1:64",
    inStock: true,
    isBestSeller: true,
    description: "Iconic rotary-powered sports car with sleek design.",
    features: ["Opening doors", "Detailed interior", "Rubber tires", "Metal chassis"]
  }
];

export const categories = [
  "All",
  "Sports Cars",
  "JDM",
  "Super Cars",
  "Hyper Cars",
  "Classic",
  "Muscle Cars"
];

export const scales = [
  "All",
  "1:18",
  "1:24",
  "1:43",
  "1:64"
];

export const brands = [
  "All",
  "Tarmac Works",
  "Mini GT",
  "Spark Model",
  "AutoArt",
  "Inno64",
  "TSM Model",
  "Maisto",
  "Shelby Collectibles"
];
