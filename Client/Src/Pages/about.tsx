import { Card, CardContent } from "@/components/ui/card";
import { Home, Users, Award, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Dira4Bucherim</h1>
          <p className="text-xl text-blue-100">
            Connecting yeshiva students with quality housing across Israel since 2024
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Dira4Bucherim was founded to address the unique housing needs of yeshiva students in Israel. 
              We understand that finding suitable accommodation near learning centers can be challenging, 
              especially for students who are new to the country or unfamiliar with local housing markets.
            </p>
          </div>
          
          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              Our platform specializes in connecting students with verified, quality apartments that are 
              strategically located near major yeshivot and learning centers throughout Israel. We believe 
              that having a comfortable, safe place to live is essential for successful learning and personal growth.
            </p>
            
            <p>
              Every property on our platform is personally inspected and verified to ensure it meets our 
              standards for cleanliness, safety, and amenities. We work closely with property owners who 
              understand and appreciate the yeshiva community.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-none shadow-sm">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                <p className="text-gray-600">
                  Every property is personally inspected and verified to meet our high standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-sm">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Focus</h3>
                <p className="text-gray-600">
                  We understand the unique needs of the yeshiva community and cater specifically to them.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-sm">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-gray-600">
                  Clear pricing, honest descriptions, and no hidden fees or surprises.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-sm">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Personal Service</h3>
                <p className="text-gray-600">
                  Dedicated support to help you find the perfect dira for your learning journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            To make finding quality housing simple and stress-free for yeshiva students, 
            so they can focus on what matters most - their learning and spiritual growth.
          </p>
          
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              "Creating a home away from home for every student"
            </h3>
            <p className="text-gray-600">
              We believe that every student deserves a comfortable, safe place to call home 
              while pursuing their studies in the Holy Land.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
