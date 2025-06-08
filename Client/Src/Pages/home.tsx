import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Home, MapPin, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Dira
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Quality apartments for yeshiva students across Israel
            </p>
            <Link href="/listings">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold shadow-lg"
              >
                Find Your Dira Now
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Dira4Bucherim?
            </h2>
            <p className="text-xl text-gray-600">
              Tailored for the unique needs of yeshiva students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Student-Friendly</h3>
                <p className="text-gray-600">
                  Apartments specifically chosen for their proximity to yeshivot and learning centers
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
                <p className="text-gray-600">
                  Located in Jerusalem, Bnei Brak, and other key learning centers across Israel
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified Listings</h3>
                <p className="text-gray-600">
                  All properties are personally verified and meet our quality standards
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
