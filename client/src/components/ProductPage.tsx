import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useState } from "react";

interface ProductsPageProps {
  onNavigate: (page: string) => void;
}

export function ProductsPage({ onNavigate }: ProductsPageProps) {
    const [allproducts, setallproducts] = useState<any[]>([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        fetch("https://dealhub.onrender.com/api/products")
          .then(res => res.json())
          .then(data => {
            setallproducts(data);
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      }, []);
    
      if (loading) return <p className="text-center mt-20">Loading...</p>;
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate('home')}
                className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                DealHub
              </button>
            </div>
            <nav className="hidden md:block">
              <div className="flex items-center space-x-8">
                <button 
                  onClick={() => onNavigate('home')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => onNavigate('products')}
                  className="text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Products
                </button>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </button>
              </div>
            </nav>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-900 hover:text-gray-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing deals on trending products from top brands
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {allproducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <CardContent className="p-0 relative">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-600 text-white text-xs px-2 py-1">
                      {product.offer}
                    </Badge>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="text-xs px-2 py-1 bg-white/90 text-gray-700">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {product.price}
                    </p>
                    <Button 
                      className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white border-0"
                      onClick={() => window.open(product.amazonUrl, '_blank')}
                    >
                      Buy on Amazon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © 2025 DealHub. 
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}