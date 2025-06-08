import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, MapPin, Home, Bath, Bed } from "lucide-react";
import type { Apartment } from "@shared/schema";

interface ApartmentCardProps {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  const mainImage = apartment.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";

  return (
    <Card className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-full">
      <Link href={`/apartment/${apartment.id}`}>
        <a className="block">
          <div className="relative">
            <img 
              src={mainImage}
              alt={apartment.title}
              className="w-full h-48 object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 h-8 w-8 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle favorite functionality
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
            {apartment.furnished && (
              <Badge className="absolute bottom-3 left-3 bg-accent text-white">
                Furnished
              </Badge>
            )}
          </div>
          
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg truncate">{apartment.title}</h3>
              <div className="flex items-center ml-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{apartment.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{apartment.location}, {apartment.city}</span>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-1" />
                <span>{apartment.rooms} rooms</span>
              </div>
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{apartment.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{apartment.bathrooms}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xl font-bold text-gray-900">
                  ₪{apartment.price.toLocaleString()}
                </span>
                <span className="text-sm font-normal text-gray-500">/month</span>
              </div>
            </div>
          </CardContent>
        </a>
      </Link>
    </Card>
  );
}
