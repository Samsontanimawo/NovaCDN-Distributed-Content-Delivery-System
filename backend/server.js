const express = require("express");
const redis = require("redis");
const app = express();

// Use 'redis' as the host instead of 'localhost' for Docker networking
const client = redis.createClient({
  host: "redis", // Change 'localhost' to 'redis'
  port: 6379      // Default Redis port
});

client.on("connect", function () {
  console.log("Connected to Redis...");
});

client.on("error", function (err) {
  console.error("Redis error:", err);
});

// Sample route that uses Redis caching
app.get("/content/:id", (req, res) => {
  const contentId = req.params.id;

  // Check if the content is cached
  client.get(contentId, (err, cachedContent) => {
    if (err) {
      console.error("Redis GET error:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (cachedContent) {
      console.log("Cache hit for content ID:", contentId);
      return res.send(cachedContent);
    } else {
      // Simulate fetching content
      const newContent = `Content for ID ${contentId}: This is freshly fetched content.`;

      // Cache the new content with an expiration time (e.g., 60 seconds)
      client.setex(contentId, 60, newContent);

      console.log("Cache miss for content ID:", contentId);
      return res.send(newContent);
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});