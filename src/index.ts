import dotenv from "dotenv";
import app from "./app";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 3000; // This is only for local development; in production, use the PORT from the environment variables.
let server: import("http").Server | undefined;

if (require.main === module) {
  server = app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });

  // Graceful shutdown
  const shutdown = () => {
    logger.info("\n🛑 Gracefully shutting down...");
    if (server) {
      server.close(() => {
        logger.info("✅ HTTP server closed.");
        process.exit(0);
      });
    }
    // Optional: Force close if not shutting in 10 seconds
    setTimeout(() => {
      logger.error("❌ Forced shutdown.");
      process.exit(1);
    }, 10000);
  };

  // Listen for signals
  process.on("SIGINT", shutdown); // Ctrl+C
  process.on("SIGTERM", shutdown); // kill command
}

export { app };
