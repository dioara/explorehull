import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { generateSitemap } from "./sitemap";

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

  sitemap: publicProcedure.query(async () => {
    const xml = await generateSitemap();
    return { xml };
  }),
});

export type AppRouter = typeof appRouter;
