import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { ProductsPage } from "./components/ProductPage";
import { ContactPage } from "./components/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (currentPage === 'products') {
    return <ProductsPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage onNavigate={handleNavigate} />;
  }

  return <HomePage onNavigate={handleNavigate} />;
}