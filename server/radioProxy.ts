import type { Express } from "express";
import fetch from "node-fetch";

/**
 * Radio stream proxy endpoint
 * Proxies HTTP radio streams through HTTPS to avoid mixed content issues
 */
export function setupRadioProxy(app: Express) {
  app.get("/api/radio/stream", async (req, res) => {
    const STREAM_URL = "http://88.99.195.180:8031/stream";
    
    try {
      const response = await fetch(STREAM_URL);
      
      if (!response.ok) {
        return res.status(502).json({ error: "Unable to connect to radio stream" });
      }

      // Forward headers
      res.setHeader("Content-Type", response.headers.get("content-type") || "audio/mpeg");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      // Pipe the stream
      if (response.body) {
        response.body.pipe(res);
      } else {
        res.status(502).json({ error: "No stream data" });
      }
    } catch (error) {
      console.error("Radio proxy error:", error);
      res.status(502).json({ error: "Radio stream unavailable" });
    }
  });
}
