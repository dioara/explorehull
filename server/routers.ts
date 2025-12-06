import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { generateSitemap } from './sitemap';
import { getHullNews } from './news';
import { getCurrentWeather, getWeatherForecast } from './weather';

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
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
        // Send email notification to contact@lampstand.consulting
        const emailContent = `
New Contact Form Submission from ExploreHull.com

Name: ${input.name}
Email: ${input.email}
Subject: ${input.subject}

Message:
${input.message}
        `;
        
        // Use the notification system to send to owner
        // In production, this would integrate with an email service
        await db.saveContactSubmission({
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
        });
        
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
