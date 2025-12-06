import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `test-user-${userId}`,
    email: `test${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("reviews.getAverageRating", () => {
  it("returns average rating for an attraction", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.reviews.getAverageRating({
      itemType: "attraction",
      itemId: 1,
    });

    expect(result).toHaveProperty("average");
    expect(result).toHaveProperty("count");
    expect(typeof result.average).toBe("number");
    expect(typeof result.count).toBe("number");
  });
});

describe("reviews.getByItem", () => {
  it("returns reviews for an attraction", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.reviews.getByItem({
      itemType: "attraction",
      itemId: 1,
    });

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("itinerary.getMyItinerary", () => {
  it("returns user's itinerary items", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.itinerary.getMyItinerary();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("itinerary.isInItinerary", () => {
  it("checks if item is in user's itinerary", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.itinerary.isInItinerary({
      itemType: "attraction",
      itemId: 1,
    });

    expect(typeof result).toBe("boolean");
  });
});
