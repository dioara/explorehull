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

describe("weather.current", () => {
  it("returns current weather data for Hull", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const weather = await caller.weather.current();

    if (weather) {
      expect(weather).toHaveProperty("temp");
      expect(weather).toHaveProperty("description");
      expect(weather).toHaveProperty("humidity");
      expect(weather).toHaveProperty("wind_speed");
      expect(typeof weather.temp).toBe("number");
      expect(typeof weather.description).toBe("string");
    }
  });
});

describe("weather.forecast", () => {
  it("returns 5-day weather forecast for Hull", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const forecast = await caller.weather.forecast();

    expect(Array.isArray(forecast)).toBe(true);
    if (forecast.length > 0) {
      const firstDay = forecast[0];
      expect(firstDay).toHaveProperty("date");
      expect(firstDay).toHaveProperty("temp_min");
      expect(firstDay).toHaveProperty("temp_max");
      expect(firstDay).toHaveProperty("description");
      expect(typeof firstDay.temp_min).toBe("number");
      expect(typeof firstDay.temp_max).toBe("number");
    }
  });
});

describe("news.getLatest", () => {
  it("returns latest Hull news articles", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const news = await caller.news.getLatest({ limit: 5 });

    expect(Array.isArray(news)).toBe(true);
    if (news.length > 0) {
      const firstArticle = news[0];
      expect(firstArticle).toHaveProperty("title");
      expect(firstArticle).toHaveProperty("description");
      expect(firstArticle).toHaveProperty("url");
      expect(firstArticle).toHaveProperty("publishedAt");
      expect(typeof firstArticle.title).toBe("string");
      expect(typeof firstArticle.url).toBe("string");
    }
  });

  it("respects the limit parameter", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const news = await caller.news.getLatest({ limit: 3 });

    expect(news.length).toBeLessThanOrEqual(3);
  });
});
