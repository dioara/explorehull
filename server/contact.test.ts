import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("contact.submit", () => {
  it("saves contact form submission with all required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      subject: "Question about Hull attractions",
      message: "I would like to know more about The Deep aquarium opening hours.",
    });

    expect(result).toEqual({ success: true });
  });

  it("validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "invalid-email",
        subject: "Test",
        message: "Test message",
      })
    ).rejects.toThrow();
  });

  it("accepts contact submission with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "General Inquiry",
      message: "Looking forward to visiting Hull!",
    });

    expect(result).toEqual({ success: true });
  });
});
