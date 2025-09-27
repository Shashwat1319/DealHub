import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { ProductsPage } from "./components/ProductPage";
import { ContactPage } from "./components/ContactPage";
import { AddProductPage } from "./components/AddProductPage";

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  amazonUrl: string;
  offer: string;
  category: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: "₹2,999",
    image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBibGFja3xlbnwxfHx8fDE3NTg4NDE0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amazonUrl: "#",
    offer: "20% OFF",
    category: "Audio"
  },
  {
    id: 2,
    title: "Premium Smartphone Case",
    price: "₹1,299",
    image: "https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU4ODI0MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amazonUrl: "#",
    offer: "Deal of the Day",
    category: "Accessories"
  },
  {
    id: 3,
    title: "Gaming Laptop Ultra Thin",
    price: "₹65,999",
    image: "https://images.unsplash.com/photo-1754928864131-21917af96dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMG1vZGVybnxlbnwxfHx8fDE3NTg3NzQ0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amazonUrl: "#",
    offer: "Limited Stock",
    category: "Computing"
  },
  {
    id: 4,
    title: "Smart Fitness Tracker Watch",
    price: "₹4,599",
    image: "https://images.unsplash.com/photo-1665860455418-017fa50d29bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhY2tlciUyMHdhdGNofGVufDF8fHx8MTc1ODgwMTc2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amazonUrl: "#",
    offer: "15% OFF",
    category: "Wearables"
  },
  {
    id: 5,
    title: "Portable Bluetooth Speaker",
    price: "₹3,199",
    image: "https://images.unsplash.com/photo-1674303324806-7018a739ed11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVldG9vdGglMjBzcGVha2VyJTIwcG9ydGFibGV8ZW58MXx8fHwxNzU4ODUwNDkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amazonUrl: "#",
    offer: "Deal of the Day",
    category: "Audio"
  },
  {
    id: 6,
    title: "Gaming Mouse & Keyboard Set",
    price: "₹8,999",
    image: "https://images.unsplash.com/photo-1629429408719-a64b3ae484e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMGtleWJvYXJkfGVufDF8fHx8MTc1ODg2OTY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amazonUrl: "#",
    offer: "25% OFF",
    category: "Gaming"
  },
  {
    id: 7,
    title: "Wireless Earbuds Pro",
    price: "₹3,999",
    image: "https://images.unsplash.com/photo-1755182529034-189a6051faae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjB3aGl0ZXxlbnwxfHx8fDE3NTg4MDE0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amazonUrl: "#",
    offer: "30% OFF",
    category: "Audio"
  },
  {
    id: 8,
    title: "10-inch Tablet Ultra",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1610664840481-10b7b43c9283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBjb21wdXRlciUyMG1vZGVybnxlbnwxfHx8fDE3NTg4Njc3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amazonUrl: "#",
    offer: "Limited Stock",
    category: "Computing"
  },
  {
    id: 9,
    title: "Fast Wireless Charger",
    price: "₹1,899",
    image: "https://images.unsplash.com/photo-1731616103600-3fe7ccdc5a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHBob25lJTIwY2hhcmdlcnxlbnwxfHx8fDE3NTg4NzU1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amazonUrl: "#",
    offer: "40% OFF",
    category: "Accessories"
  },
  {
    id: 10,
    title: "Professional Camera Lens",
    price: "₹12,999",
    image: "https://images.unsplash.com/photo-1681142313427-f9dba591ecbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBsZW5zJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU4Nzg4ODMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amazonUrl: "#",
    offer: "Deal of the Day",
    category: "Photography"
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (currentPage === 'products') {
    return <ProductsPage onNavigate={handleNavigate} products={products} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'add-product') {
    return <AddProductPage onNavigate={handleNavigate} products={products} setProducts={setProducts} />;
  }

  return <HomePage onNavigate={handleNavigate} products={products} />;
}