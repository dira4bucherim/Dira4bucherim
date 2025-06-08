import { apartments, users, type Apartment, type InsertApartment, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Apartment methods
  getApartment(id: number): Promise<Apartment | undefined>;
  getApartments(): Promise<Apartment[]>;
  searchApartments(query: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    rooms?: number;
    bedrooms?: number;
    city?: string;
  }): Promise<Apartment[]>;
  createApartment(apartment: InsertApartment): Promise<Apartment>;
  updateApartment(id: number, apartment: Partial<InsertApartment>): Promise<Apartment | undefined>;
  deleteApartment(id: number): Promise<boolean>;
  getFeaturedApartments(): Promise<Apartment[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getApartment(id: number): Promise<Apartment | undefined> {
    const [apartment] = await db.select().from(apartments).where(eq(apartments.id, id));
    return apartment || undefined;
  }

  async getApartments(): Promise<Apartment[]> {
    return await db.select().from(apartments).where(eq(apartments.isAvailable, true));
  }

  async searchApartments(query: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    rooms?: number;
    bedrooms?: number;
    city?: string;
  }): Promise<Apartment[]> {
    const baseQuery = db.select().from(apartments).where(eq(apartments.isAvailable, true));
    // For this demo, we'll filter the results after fetching
    const allApartments = await baseQuery;
    
    return allApartments.filter(apartment => {
      if (query.location && !apartment.location.toLowerCase().includes(query.location.toLowerCase()) &&
          !apartment.neighborhood.toLowerCase().includes(query.location.toLowerCase()) &&
          !apartment.city.toLowerCase().includes(query.location.toLowerCase())) {
        return false;
      }
      if (query.minPrice && apartment.price < query.minPrice) return false;
      if (query.maxPrice && apartment.price > query.maxPrice) return false;
      if (query.rooms && apartment.rooms !== query.rooms) return false;
      if (query.bedrooms && apartment.bedrooms !== query.bedrooms) return false;
      if (query.city && apartment.city.toLowerCase() !== query.city.toLowerCase()) return false;
      
      return true;
    });
  }

  async createApartment(apartment: InsertApartment): Promise<Apartment> {
    const [newApartment] = await db
      .insert(apartments)
      .values(apartment)
      .returning();
    return newApartment;
  }

  async updateApartment(id: number, apartmentData: Partial<InsertApartment>): Promise<Apartment | undefined> {
    const [updatedApartment] = await db
      .update(apartments)
      .set(apartmentData)
      .where(eq(apartments.id, id))
      .returning();
    return updatedApartment || undefined;
  }

  async deleteApartment(id: number): Promise<boolean> {
    const result = await db.delete(apartments).where(eq(apartments.id, id));
    return result.rowCount > 0;
  }

  async getFeaturedApartments(): Promise<Apartment[]> {
    const allApartments = await this.getApartments();
    return allApartments
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 6);
  }
}

export const storage = new DatabaseStorage();
