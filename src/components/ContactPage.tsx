import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const socialAccounts = [
  {
    name: "Instagram",
    handle: "@dealhub_official",
    followers: "25.2K",
    icon: FaInstagram,
    color: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500",
    url: "https://instagram.com/dealhub_official"
  },
  {
    name: "Facebook",
    handle: "DealHub Official",
    followers: "32.1K",
    icon: FaFacebook,
    color: "bg-blue-600",
    url: "https://facebook.com/dealhub"
  },
];

export function ContactPage({ onNavigate }: ContactPageProps) {
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
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Products
                </button>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-gray-900 hover:text-gray-600 transition-colors"
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Connect with us on social media or send us a message. We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>hello@dealhub.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Follow Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest deals and product reviews across all our social platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialAccounts.map((account) => {
              const IconComponent = account.icon;
              return (
                <Card key={account.name} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className={`${account.color} h-24 flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <IconComponent className="w-10 h-10 text-white relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg text-gray-900">{account.name}</h3>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {account.followers}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{account.handle}</p>
                        <Button 
                          className="w-full group-hover:scale-105 transition-transform duration-200"
                          onClick={() => window.open(account.url, '_blank')}
                        >
                          Follow
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Send us a Message
            </h2>
            <p className="text-lg text-gray-600">
              Have a question or suggestion? We'd love to hear from you.
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <Input placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input placeholder="What's this about?" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us what's on your mind..."
                      className="min-h-[120px] resize-none"
                    />
                  </div>
                  <Button size="lg" className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white">
                    Send Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 d-flex gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">hello@dealhub.com</p>
              <p className="text-sm text-gray-500 mt-2">We reply within 24 hours</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+91 98765 43210</p>
              <p className="text-sm text-gray-500 mt-2">Mon-Fri 9AM-6PM IST</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">Mumbai, India</p>
              <p className="text-sm text-gray-500 mt-2">By appointment only</p>
            </div>
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