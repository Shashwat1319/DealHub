import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Save, Eye, ArrowLeft, Plus, Upload, X, Image as ImageIcon } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  amazonUrl: string;
  offer: string;
  category: string;
}

interface AddProductPageProps {
  onNavigate: (page: string) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const categories = [
  "Audio",
  "Accessories", 
  "Computing",
  "Wearables",
  "Gaming",
  "Photography",
  "Home & Kitchen",
  "Electronics",
  "Sports & Fitness",
  "Books"
];

const offerTypes = [
  "20% OFF",
  "25% OFF", 
  "30% OFF",
  "40% OFF",
  "15% OFF",
  "Deal of the Day",
  "Limited Stock",
  "Best Seller",
  "New Launch"
];

export function AddProductPage({ onNavigate, setProducts }: AddProductPageProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    title: "",
    price: "",
    image: "",
    amazonUrl: "",
    offer: "",
    category: ""
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof Omit<Product, 'id'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatPrice = (price: string) => {
    // Remove any existing ₹ symbol and format
    const cleanPrice = price.replace(/[₹,]/g, '');
    if (cleanPrice && !isNaN(Number(cleanPrice))) {
      return `₹${Number(cleanPrice).toLocaleString('en-IN')}`;
    }
    return price;
  };

  const handlePriceChange = (value: string) => {
    const formatted = formatPrice(value);
    handleInputChange('price', formatted);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        handleInputChange('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setImagePreview("");
    handleInputChange('image', "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !imagePreview) {
      return alert("Fill all required fields");
    }

    const newProduct = {
      id: Date.now(),
      ...formData,
      image: imagePreview, // base64 image
    };

    setProducts(prev => [newProduct, ...prev]); // save locally

    // Reset
    setFormData({ 
      title: "", 
      price: "", 
      image: "",
      amazonUrl: "", 
      offer: "", 
      category: "" 
    });
    setSelectedFile(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    alert('Product added successfully!');
  };

  const isFormValid = formData.title && formData.price && imagePreview && 
                     formData.amazonUrl && formData.offer && formData.category;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('home')}
                className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                DealHub
              </button>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Admin Panel
              </Badge>
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
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Products
                </button>
                <button 
                  onClick={() => onNavigate('add-product')}
                  className="text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Add Product
                </button>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill in the details below to add a new product to DealHub</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Wireless Bluetooth Headphones"
                    maxLength={60}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.title.length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <Input
                    value={formData.price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    placeholder="e.g., 2999"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {/* Upload area */}
                  {!selectedFile ? (
                    <div 
                      onClick={triggerFileSelect}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">Upload Product Image</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Click to browse or drag and drop your image here
                      </p>
                      <p className="text-xs text-gray-400">
                        Supports: JPG, PNG, WebP (Max 5MB, Min 400x400px)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Image preview */}
                      <div className="relative border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="w-full h-48 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeSelectedFile}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* File info */}
                      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <ImageIcon className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                            <p className="text-xs text-gray-500">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={triggerFileSelect}
                          className="text-xs"
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amazon Product URL
                  </label>
                  <Input
                    value={formData.amazonUrl}
                    onChange={(e) => handleInputChange('amazonUrl', e.target.value)}
                    placeholder="https://amazon.in/dp/..."
                    type="url"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Offer/Deal Tag
                    </label>
                    <Select value={formData.offer} onValueChange={(value) => handleInputChange('offer', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select offer type" />
                      </SelectTrigger>
                      <SelectContent>
                        {offerTypes.map(offer => (
                          <SelectItem key={offer} value={offer}>
                            {offer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="flex-1 bg-[#FF9900] hover:bg-[#FF9900]/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
                <p className="text-sm text-gray-600">
                  This is how your product will appear on the website
                </p>
              </CardHeader>
              <CardContent>
                {isFormValid ? (
                  <Card className="group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                    <CardContent className="p-0 relative">
                      <div className="aspect-square overflow-hidden rounded-t-lg">
                        {(imagePreview || formData.image) ? (
                          <img
                            src={imagePreview || formData.image}
                            alt={formData.title || "Product preview"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        {formData.offer && (
                          <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-600 text-white text-xs px-2 py-1">
                            {formData.offer}
                          </Badge>
                        )}
                        {formData.category && (
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="text-xs px-2 py-1 bg-white/90 text-gray-700">
                              {formData.category}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
                          {formData.title || "Product title will appear here"}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                          {formData.price || "₹0"}
                        </p>
                        <Button className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white border-0">
                          Buy on Amazon
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Plus className="w-8 h-8" />
                    </div>
                    <p>Fill in the form to see preview</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-3">💡 Tips for Better Products</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Upload high-quality, clear product images (400x400px minimum)</li>
                  <li>• Keep titles concise but descriptive (under 60 characters)</li>
                  <li>• Include accurate pricing information in ₹</li>
                  <li>• Choose appropriate offer tags to attract customers</li>
                  <li>• Verify Amazon URLs are working correctly</li>
                  <li>• Image files should be under 5MB for best performance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}