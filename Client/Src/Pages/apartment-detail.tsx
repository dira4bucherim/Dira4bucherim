import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageGallery from "@/components/image-gallery";
import Map from "@/components/map";
import { 
  ArrowLeft, 
  Star, 
  Bed, 
  Bath, 
  Home, 
  Wifi, 
  Snowflake, 
  Utensils, 
  Tv, 
  Car,
  Book,
  Shield,
  MapPin
} from "lucide-react";
import type { Apartment } from "@shared/schema";

const amenityIcons: Record<string, any> = {
  "WiFi": Wifi,
  "Air Conditioning": Snowflake,
  "Full Kitchen": Utensils,
  "TV": Tv,
  "Washing Machine": Home,
  "Study Area": Book,
  "Parking": Car,
};

export default function ApartmentDetail() {
  const [match, params] = useRoute("/apartment/:id");
  const apartmentId = params?.id;

  const { data: apartment, isLoading, error } = useQuery<Apartment>({
    queryKey: ["/api/apartments", apartmentId],
    queryFn: async () => {
      const response = await fetch(`/api/apartments/${apartmentId}`);
      if (!response.ok) throw new Error("Failed to fetch apartment");
      return response.json();
    },
    enabled: !!apartmentId,
  });

  if (!match || !apartmentId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">Invalid apartment ID</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">
              Failed to load apartment details. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || !apartment) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Image Gallery Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Skeleton className="w-full h-96 rounded-2xl" />
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-8" />
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-20 rounded-xl" />
                    ))}
                  </div>
                  <Skeleton className="h-20 mb-8" />
                  <Skeleton className="h-64" />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-32 mb-6" />
                  <Skeleton className="h-40 mb-6" />
                  <Skeleton className="h-12" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/listings">
          <Button variant="ghost" className="flex items-center text-gray-600 hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to listings
          </Button>
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <ImageGallery images={apartment.images} title={apartment.title} />
      </div>

      {/* Apartment Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-8">
                {/* Title and Rating */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{apartment.title}</h1>
                    <div className="flex items-center text-lg text-gray-600">
                      <MapPin className="h-5 w-5 mr-1" />
                      {apartment.location}, {apartment.city}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold ml-1">{apartment.rating}</span>
                    <span className="text-gray-500 ml-1">({apartment.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Bed className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">{apartment.bedrooms} Bedrooms</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Bath className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">{apartment.bathrooms} Bathroom{apartment.bathrooms > 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Home className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">{apartment.rooms} Rooms</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Wifi className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Free WiFi</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {apartment.furnished && <Badge variant="secondary">Furnished</Badge>}
                  {apartment.parking && <Badge variant="secondary">Parking</Badge>}
                  {apartment.petFriendly && <Badge variant="secondary">Pet Friendly</Badge>}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">About this place</h3>
                  <p className="text-gray-600 leading-relaxed">{apartment.description}</p>
                </div>

                {/* Amenities */}
                {apartment.amenities.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {apartment.amenities.map((amenity, index) => {
                        const IconComponent = amenityIcons[amenity] || Home;
                        return (
                          <div key={index} className="flex items-center">
                            <IconComponent className="h-5 w-5 text-primary mr-3" />
                            <span>{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Nearby Yeshivot */}
                {apartment.nearbyYeshivot.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Nearby Yeshivot</h3>
                    <div className="flex flex-wrap gap-2">
                      {apartment.nearbyYeshivot.map((yeshiva, index) => (
                        <Badge key={index} variant="outline">{yeshiva}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <Map 
                    latitude={apartment.latitude || undefined}
                    longitude={apartment.longitude || undefined}
                    title={`${apartment.neighborhood}, ${apartment.city}`}
                    className="h-64 mb-4"
                  />
                  <p className="text-gray-600">
                    Located in {apartment.neighborhood}, this apartment is in {apartment.city} with good access to nearby yeshivot and essential services.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border border-gray-200 sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    ₪{apartment.price.toLocaleString()}
                  </div>
                  <div className="text-gray-500">per month</div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Move-in Date
                    </label>
                    <Input type="date" className="rounded-xl" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lease Duration
                    </label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">1 year</SelectItem>
                        <SelectItem value="24">2 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full py-4 rounded-xl font-semibold">
                    Contact Owner
                  </Button>
                </form>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monthly Rent</span>
                    <span>₪{apartment.price.toLocaleString()}</span>
                  </div>
                  {apartment.securityDeposit && (
                    <div className="flex justify-between">
                      <span>Security Deposit</span>
                      <span>₪{apartment.securityDeposit.toLocaleString()}</span>
                    </div>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total to Pay</span>
                    <span>
                      ₪{(apartment.price + (apartment.securityDeposit || 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm text-gray-700">Verified by Dira4Bucherim</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
