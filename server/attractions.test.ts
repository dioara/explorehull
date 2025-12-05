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

describe("attractions router", () => {
  it("should list all attractions", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const attractions = await caller.attractions.list();

    expect(Array.isArray(attractions)).toBe(true);
    expect(attractions.length).toBeGreaterThan(0);
  });

  it("should get featured attractions", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const featured = await caller.attractions.featured({ limit: 3 });

    expect(Array.isArray(featured)).toBe(true);
    expect(featured.length).toBeLessThanOrEqual(3);
    
    if (featured.length > 0) {
      expect(featured[0]).toHaveProperty("name");
      expect(featured[0]).toHaveProperty("slug");
      expect(featured[0]).toHaveProperty("description");
      expect(featured[0]).toHaveProperty("category");
    }
  });

  it("should get attraction by slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const attraction = await caller.attractions.bySlug({ slug: "the-deep" });

    expect(attraction).toBeDefined();
    if (attraction) {
      expect(attraction.name).toBe("The Deep");
      expect(attraction.slug).toBe("the-deep");
      expect(attraction.category).toBe("Museums");
    }
  });

  it("should filter attractions by category", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const museums = await caller.attractions.byCategory({ category: "Museums" });

    expect(Array.isArray(museums)).toBe(true);
    
    museums.forEach(attraction => {
      expect(attraction.category).toBe("Museums");
    });
  });

  it("should return empty array for non-existent category", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.attractions.byCategory({ category: "NonExistentCategory" });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});
