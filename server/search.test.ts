import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("search router", () => {
  it("should search across all content types", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.search.query({ q: "museum" });

    expect(result).toHaveProperty("attractions");
    expect(result).toHaveProperty("events");
    expect(result).toHaveProperty("restaurants");
    expect(result).toHaveProperty("accommodations");
    expect(result).toHaveProperty("blogPosts");
    
    expect(Array.isArray(result.attractions)).toBe(true);
    expect(Array.isArray(result.events)).toBe(true);
    expect(Array.isArray(result.restaurants)).toBe(true);
    expect(Array.isArray(result.accommodations)).toBe(true);
    expect(Array.isArray(result.blogPosts)).toBe(true);
  });

  it("should find attractions matching search query", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.search.query({ q: "Deep" });

    expect(result.attractions.length).toBeGreaterThan(0);
    const deepAttraction = result.attractions.find(a => a.name.includes("Deep"));
    expect(deepAttraction).toBeDefined();
  });

  it("should return empty results for non-matching query", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.search.query({ q: "xyznonexistentquery123" });

    expect(result.attractions.length).toBe(0);
    expect(result.events.length).toBe(0);
    expect(result.restaurants.length).toBe(0);
    expect(result.accommodations.length).toBe(0);
    expect(result.blogPosts.length).toBe(0);
  });

  it("should limit search results", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.search.query({ q: "Hull" });

    // Each category should return max 5 results (as per db.ts limit)
    expect(result.attractions.length).toBeLessThanOrEqual(5);
    expect(result.events.length).toBeLessThanOrEqual(5);
    expect(result.restaurants.length).toBeLessThanOrEqual(5);
    expect(result.accommodations.length).toBeLessThanOrEqual(5);
    expect(result.blogPosts.length).toBeLessThanOrEqual(5);
  });

  it("should search case-insensitively", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const resultLower = await caller.search.query({ q: "hull" });
    const resultUpper = await caller.search.query({ q: "HULL" });
    const resultMixed = await caller.search.query({ q: "HuLl" });

    // All should return results
    expect(resultLower.attractions.length + resultLower.events.length + 
           resultLower.restaurants.length + resultLower.accommodations.length).toBeGreaterThan(0);
    expect(resultUpper.attractions.length + resultUpper.events.length + 
           resultUpper.restaurants.length + resultUpper.accommodations.length).toBeGreaterThan(0);
    expect(resultMixed.attractions.length + resultMixed.events.length + 
           resultMixed.restaurants.length + resultMixed.accommodations.length).toBeGreaterThan(0);
  });
});
