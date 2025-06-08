// This file contains utility functions for apartment data processing
// All actual data comes from the backend API

export function formatPrice(price: number): string {
  return `₪${price.toLocaleString()}`;
}

export function formatArea(area: number | null | undefined): string {
  if (!area) return "N/A";
  return `${area} m²`;
}

export function getPriceRange(price: number): string {
  if (price < 2000) return "Under ₪2,000";
  if (price <= 3000) return "₪2,000 - ₪3,000";
  if (price <= 4000) return "₪3,000 - ₪4,000";
  return "Above ₪4,000";
}

export function getRoomDescription(rooms: number, bedrooms: number): string {
  return `${rooms} rooms • ${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`;
}

export const cities = [
  "Jerusalem",
  "Bnei Brak", 
  "Beit Shemesh",
  "Netivot",
  "Safed",
  "Ashdod",
  "Lakewood"
] as const;

export const neighborhoods = {
  Jerusalem: ["Geula", "Mea Shearim", "Talpiot", "Rechavia", "Katamon"],
  "Bnei Brak": ["Center", "Pardes Katz", "Givat Shmuel"],
  "Beit Shemesh": ["Ramat Beit Shemesh", "Old City", "Nofei HaShemesh"],
  Netivot: ["Kiryat Sanz", "Center"],
} as const;
