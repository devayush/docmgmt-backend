import request from "supertest";
import { app } from "../index";

describe("API Rate Limiting", () => {
  it("should block requests after exceeding the rate limit", async () => {
    // Send 101 requests (limit is 100 per 15 minutes) exceeding the threshold set in the rate limiter
    let lastResponse;
    for (let i = 0; i < 101; i++) {
      lastResponse = await request(app).get("/ping");
    }
    expect(lastResponse?.status).toBe(429);
    expect(lastResponse?.text).toMatch(/Too many requests/i);
  });
});