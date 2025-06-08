import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all apartments
  app.get("/api/apartments", async (req, res) => {
    try {
      const apartments = await storage.getApartments();
      res.json(apartments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch apartments" });
    }
  });

  // Get featured apartments
  app.get("/api/apartments/featured", async (req, res) => {
    try {
      const apartments = await storage.getFeaturedApartments();
      res.json(apartments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured apartments" });
    }
  });

  // Search apartments
  app.get("/api/apartments/search", async (req, res) => {
    try {
      const searchSchema = z.object({
        location: z.string().optional(),
        minPrice: z.string().transform(val => val ? parseInt(val) : undefined).optional(),
        maxPrice: z.string().transform(val => val ? parseInt(val) : undefined).optional(),
        rooms: z.string().transform(val => val ? parseInt(val) : undefined).optional(),
        bedrooms: z.string().transform(val => val ? parseInt(val) : undefined).optional(),
        city: z.string().optional(),
      });

      const query = searchSchema.parse(req.query);
      const apartments = await storage.searchApartments(query);
      res.json(apartments);
    } catch (error) {
      res.status(400).json({ message: "Invalid search parameters" });
    }
  });

  // Get single apartment
  app.get("/api/apartments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid apartment ID" });
      }

      const apartment = await storage.getApartment(id);
      if (!apartment) {
        return res.status(404).json({ message: "Apartment not found" });
      }

      res.json(apartment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch apartment" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        message: z.string().min(1, "Message is required"),
        apartmentId: z.number().optional(),
      });

      const contactData = contactSchema.parse(req.body);
      
      // In a real app, you would send an email or save to database
      console.log("Contact form submission:", contactData);
      
      res.json({ message: "Contact form submitted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
