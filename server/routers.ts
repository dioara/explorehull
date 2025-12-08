import { eq } from "drizzle-orm";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { findClosestMatch, COMMON_SEARCH_TERMS } from "./spellcheck";
import { z } from "zod";
import * as db from "./db";
import { getAllAttractions, getAllEvents, getAllRestaurants } from "./db";
import { attractions, restaurants, accommodations } from "../drizzle/schema";
import { generateSitemap } from './sitemap';
import { getHullNews } from './news';
import { getCurrentWeather, getWeatherForecast } from './weather';
import { notifyOwner } from './_core/notification';
import { authenticateAdmin, getAdminById } from './admin-auth';
import jwt from 'jsonwebtoken';
import { ENV } from './_core/env';

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie('app_session_id', { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  admin: router({
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const admin = await authenticateAdmin(input.email, input.password);
        
        if (!admin) {
          throw new Error('Invalid email or password');
        }

        // Create JWT token for admin session
        const token = jwt.sign(
          { adminId: admin.id, email: admin.email },
          ENV.jwtSecret,
          { expiresIn: '7d' }
        );

        // Set admin session cookie
        ctx.res.cookie('admin_session', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return { success: true, admin };
      }),

    me: publicProcedure.query(async ({ ctx }) => {
      const token = ctx.req.cookies?.admin_session;
      
      if (!token) return null;

      try {
        const decoded = jwt.verify(token, ENV.jwtSecret) as { adminId: number };
        const admin = await getAdminById(decoded.adminId);
        return admin;
      } catch (error) {
        return null;
      }
    }),

    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie('admin_session');
      return { success: true };
    }),

    // Featured listings management
    toggleFeatured: publicProcedure
      .input(z.object({
        type: z.enum(['attraction', 'restaurant', 'accommodation']),
        id: z.number(),
        featured: z.boolean(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Verify admin authentication
        const token = ctx.req.cookies?.admin_session;
        if (!token) throw new Error('Unauthorized');
        
        try {
          jwt.verify(token, ENV.jwtSecret);
        } catch (error) {
          throw new Error('Unauthorized');
        }

        const database = await db.getDb();
        if (!database) throw new Error('Database not available');

        const { type, id, featured } = input;
        
        if (type === 'attraction') {
          await database.update(attractions)
            .set({ featured })
            .where(eq(attractions.id, id));
        } else if (type === 'restaurant') {
          await database.update(restaurants)
            .set({ featured })
            .where(eq(restaurants.id, id));
        } else {
          await database.update(accommodations)
            .set({ featured })
            .where(eq(accommodations.id, id));
        }

        return { success: true };
      }),

    // Get all submissions
    getSubmissions: publicProcedure.query(async ({ ctx }) => {
      // Verify admin authentication
      const token = ctx.req.cookies?.admin_session;
      if (!token) throw new Error('Unauthorized');
      
      try {
        jwt.verify(token, ENV.jwtSecret);
      } catch (error) {
        throw new Error('Unauthorized');
      }

      return {
        listings: await db.getAllPartnerListings(),
        advertising: await db.getAllAdvertisingInquiries(),
        partnerships: await db.getAllPartnershipInquiries(),
        contacts: await db.getAllContactSubmissions(),
      };
    }),
  }),

  attractions: router({
    list: publicProcedure.query(async () => {
      return await db.getAllAttractions();
    }),
    
    featured: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getFeaturedAttractions(input?.limit);
      }),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getAttractionBySlug(input.slug);
      }),
    
    byCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getAttractionsByCategory(input.category);
      }),
  }),

  events: router({
    list: publicProcedure.query(async () => {
      return await db.getAllEvents();
    }),
    
    upcoming: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getUpcomingEvents(input?.limit);
      }),
    
    featured: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getFeaturedEvents(input?.limit);
      }),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getEventBySlug(input.slug);
      }),
    
    byCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getEventsByCategory(input.category);
      }),
  }),

  restaurants: router({
    list: publicProcedure.query(async () => {
      return await db.getAllRestaurants();
    }),
    
    featured: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getFeaturedRestaurants(input?.limit);
      }),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getRestaurantBySlug(input.slug);
      }),
    
    byCuisine: publicProcedure
      .input(z.object({ cuisine: z.string() }))
      .query(async ({ input }) => {
        return await db.getRestaurantsByCuisine(input.cuisine);
      }),
  }),

  accommodations: router({
    list: publicProcedure.query(async () => {
      return await db.getAllAccommodations();
    }),
    
    featured: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getFeaturedAccommodations(input?.limit);
      }),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getAccommodationBySlug(input.slug);
      }),
  }),

  tours: router({
    list: publicProcedure.query(async () => {
      return await db.getAllTours();
    }),
    
    featured: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getFeaturedTours(input?.limit);
      }),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getTourBySlug(input.slug);
      }),
  }),

  blog: router({
    list: publicProcedure.query(async () => {
      return await db.getAllBlogPosts();
    }),
    
    featured: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getFeaturedBlogPosts(input?.limit);
      }),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getBlogPostBySlug(input.slug);
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        return await db.subscribeToNewsletter(input.email);
      }),
  }),

  search: router({
    query: publicProcedure
      .input(z.object({ q: z.string() }))
      .query(async ({ input }) => {
        return await db.searchContent(input.q);
      }),
    
    suggestions: publicProcedure
      .input(z.object({ q: z.string() }))
      .query(async ({ input }) => {
        if (input.q.length < 2) return [];
        
        const results = await db.searchContent(input.q);
        const suggestions: Array<{ id: number; name: string; type: string }> = [];
        
        // Add top 3 from each category
        results.attractions.slice(0, 3).forEach(a => 
          suggestions.push({ id: a.id, name: a.name, type: 'attraction' })
        );
        results.events.slice(0, 3).forEach(e => 
          suggestions.push({ id: e.id, name: e.title, type: 'event' })
        );
        results.restaurants.slice(0, 2).forEach(r => 
          suggestions.push({ id: r.id, name: r.name, type: 'restaurant' })
        );
        results.accommodations.slice(0, 2).forEach(a => 
          suggestions.push({ id: a.id, name: a.name, type: 'accommodation' })
        );
        
        return suggestions.slice(0, 5);
      }),

    spellcheck: publicProcedure
      .input(z.object({ q: z.string() }))
      .query(async ({ input }) => {
        const { q } = input;
        if (!q || q.length < 3) return null;

        // Get all attraction/event/restaurant names from database
        const [attractions, events, restaurants] = await Promise.all([
          getAllAttractions(),
          getAllEvents(),
          getAllRestaurants(),
        ]);

        const allNames = [
          ...attractions.map(a => a.name),
          ...events.map(e => e.title),
          ...restaurants.map(r => r.name),
          ...COMMON_SEARCH_TERMS,
        ];

        const suggestion = findClosestMatch(q, allNames);
        return suggestion;
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        subject: z.string(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Save to database
        await db.saveContactSubmission({
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
        });
        
        // Send email to contact@lampstand.consulting
        try {
          const { sendContactFormEmail } = await import('./email');
          await sendContactFormEmail({
            name: input.name,
            email: input.email,
            subject: input.subject,
            message: input.message,
          });
        } catch (error) {
          console.error('Failed to send contact email:', error);
          // Continue even if email fails - submission is saved
        }
        
        return { success: true };
      }),
  }),

  partner: router({
    submitListing: publicProcedure
      .input(z.object({
        businessName: z.string(),
        contactName: z.string(),
        email: z.string().email(),
        phone: z.string(),
        listingType: z.string(),
        businessDescription: z.string(),
        website: z.string(),
        address: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Save to database
        await db.savePartnerListing(input);
        
        // Send email to contact@lampstand.consulting
        try {
          const { sendPartnershipEmail } = await import('./email');
          await sendPartnershipEmail({
            organizationName: input.businessName,
            contactName: input.contactName,
            email: input.email,
            phone: input.phone,
            partnershipType: input.listingType,
            proposal: `${input.businessDescription}\n\nWebsite: ${input.website}\nAddress: ${input.address}`,
          });
        } catch (error) {
          console.error('Failed to send partnership email:', error);
          // Continue even if email fails - submission is saved
        }
        
        return { success: true };
      }),

    submitAdvertising: publicProcedure
      .input(z.object({
        companyName: z.string(),
        contactName: z.string(),
        email: z.string().email(),
        phone: z.string(),
        adType: z.string(),
        budget: z.string(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Save to database
        await db.saveAdvertisingInquiry(input);
        
        // Send notification to owner
        const emailContent = `New Advertising Inquiry from ExploreHull.com

**Company Name:** ${input.companyName}
**Contact Name:** ${input.contactName}
**Email:** ${input.email}
**Phone:** ${input.phone}
**Ad Type:** ${input.adType}
**Budget:** ${input.budget}

**Campaign Details:**
${input.message}

---
This advertising inquiry was submitted via the ExploreHull.com Partner page.`;
        
        try {
          await notifyOwner({
            title: `Advertising Inquiry: ${input.companyName}`,
            content: emailContent,
          });
        } catch (error) {
          console.error('Failed to send advertising notification:', error);
        }
        
        return { success: true };
      }),

    submitPartnership: publicProcedure
      .input(z.object({
        organizationName: z.string(),
        contactName: z.string(),
        email: z.string().email(),
        phone: z.string(),
        partnershipType: z.string(),
        proposal: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Save to database
        await db.savePartnershipInquiry(input);
        
        // Send email to contact@lampstand.consulting
        try {
          const { sendPartnershipEmail } = await import('./email');
          await sendPartnershipEmail({
            organizationName: input.organizationName,
            contactName: input.contactName,
            email: input.email,
            phone: input.phone,
            partnershipType: input.partnershipType,
            proposal: input.proposal,
          });
        } catch (error) {
          console.error('Failed to send partnership email:', error);
        }
        
        return { success: true };
      }),
  }),

  news: router({
    getLatest: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        const limit = input?.limit || 10;
        return await getHullNews(limit);
      }),
  }),

  weather: router({
    current: publicProcedure.query(async () => {
      return await getCurrentWeather();
    }),
    forecast: publicProcedure.query(async () => {
      return await getWeatherForecast();
    }),
  }),

  reviews: router({
    create: protectedProcedure
      .input(z.object({
        itemType: z.enum(['attraction', 'restaurant', 'accommodation']),
        itemId: z.number(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.createReview({
          userId: ctx.user.id,
          userName: ctx.user.name || 'Anonymous',
          itemType: input.itemType,
          itemId: input.itemId,
          rating: input.rating,
          comment: input.comment || null,
        });
      }),
    getByItem: publicProcedure
      .input(z.object({
        itemType: z.string(),
        itemId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getReviewsByItem(input.itemType, input.itemId);
      }),
    getAverageRating: publicProcedure
      .input(z.object({
        itemType: z.string(),
        itemId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getAverageRating(input.itemType, input.itemId);
      }),
  }),

  itinerary: router({
    add: protectedProcedure
      .input(z.object({
        itemType: z.enum(['attraction', 'restaurant', 'accommodation']),
        itemId: z.number(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.addToItinerary({
          userId: ctx.user.id,
          itemType: input.itemType,
          itemId: input.itemId,
          notes: input.notes || null,
        });
      }),
    remove: protectedProcedure
      .input(z.object({
        itemType: z.string(),
        itemId: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.removeFromItinerary(ctx.user.id, input.itemType, input.itemId);
      }),
    getMyItinerary: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserItinerary(ctx.user.id);
      }),
    isInItinerary: protectedProcedure
      .input(z.object({
        itemType: z.string(),
        itemId: z.number(),
      }))
      .query(async ({ input, ctx }) => {
        return await db.isInItinerary(ctx.user.id, input.itemType, input.itemId);
      }),
  }),

  sitemap: publicProcedure.query(async () => {
    const xml = await generateSitemap();
    return { xml };
  }),
});

export type AppRouter = typeof appRouter;
