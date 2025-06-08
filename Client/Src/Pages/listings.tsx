import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ApartmentCard from "@/components/apartment-card";
import { Search, Filter } from "lucide-react";
import type { Apartment } from "@shared/schema";

export default function Listings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: apartments, isLoading, error } = useQuery<Apartment[]>({
    queryKey: ["/api/apartments/search", searchTerm, priceRange, roomCount],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("location", searchTerm);
      if (priceRange && priceRange !== "all") {
        const [min, max] = priceRange.split("-");
        if (min) params.append("minPrice", min);
        if (max && max !== "plus") params.append("maxPrice", max);
      }
      if (roomCount && roomCount !== "all") params.append("rooms", roomCount);

      const response = await fetch(`/api/apartments/search?${params}`);
      if (!response.ok) throw new Error("Failed to fetch apartments");
      return response.json();
    },
  });

  const handleSearch = () => {
    setSearchTerm(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">
              Failed to load apartments. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by location, yeshiva, or neighborhood..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 pr-4 py-3 rounded-full border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="px-4 py-3 rounded-full min-w-[140px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-2000">Under ₪2,000</SelectItem>
                  <SelectItem value="2000-3000">₪2,000 - ₪3,000</SelectItem>
                  <SelectItem value="3000-4000">₪3,000 - ₪4,000</SelectItem>
                  <SelectItem value="4000-plus">Above ₪4,000</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={roomCount} onValueChange={setRoomCount}>
                <SelectTrigger className="px-4 py-3 rounded-full min-w-[120px]">
                  <SelectValue placeholder="Rooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Rooms</SelectItem>
                  <SelectItem value="1">1-2 Rooms</SelectItem>
                  <SelectItem value="3">3-4 Rooms</SelectItem>
                  <SelectItem value="5">5+ Rooms</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={handleSearch} className="px-6 py-3 rounded-full">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Apartments</h2>
            {apartments && (
              <p className="text-gray-600">
                Showing {apartments.length} {apartments.length === 1 ? 'property' : 'properties'}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="h-[320px]">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-2" />
                    <Skeleton className="h-3 w-2/3 mb-3" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : apartments && apartments.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {apartments.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <p className="text-gray-600">
                  No apartments found matching your criteria. Try adjusting your search.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
