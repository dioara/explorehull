import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
  return ctx;
}

describe("events router", () => {
  it("should list all events", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const events = await caller.events.list();

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it("should get upcoming events", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const upcoming = await caller.events.upcoming({ limit: 5 });

    expect(Array.isArray(upcoming)).toBe(true);
    
    if (upcoming.length > 0) {
      expect(upcoming[0]).toHaveProperty("title");
      expect(upcoming[0]).toHaveProperty("startDate");
      expect(upcoming[0]).toHaveProperty("category");
    }
  });

  it("should get featured events", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const featured = await caller.events.featured({ limit: 2 });

    expect(Array.isArray(featured)).toBe(true);
    expect(featured.length).toBeLessThanOrEqual(2);
  });

  it("should get event by slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // First get all events to find a valid slug
    const allEvents = await caller.events.list();
    expect(allEvents.length).toBeGreaterThan(0);
    
    const firstEvent = allEvents[0];
    const event = await caller.events.bySlug({ slug: firstEvent.slug });

    expect(event).toBeDefined();
    if (event) {
      expect(event.slug).toBe(firstEvent.slug);
      expect(event.title).toBeDefined();
      expect(event.category).toBeDefined();
    }
  });

  it("should filter events by category", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const festivals = await caller.events.byCategory({ category: "Festival" });

    expect(Array.isArray(festivals)).toBe(true);
    
    festivals.forEach(event => {
      expect(event.category).toBe("Festival");
    });
  });
});
