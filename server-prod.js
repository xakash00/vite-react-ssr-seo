import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import axios from "axios";

// Resolve the current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files from 'dist/client'
app.use(express.static(path.join(__dirname, "dist/client"), { index: false }));

// Universal route handler
app.use("*", async (req, res) => {
  try {
    // Read the HTML template
    const templatePath = path.join(__dirname, "dist/client/index.html");
    const template = fs.readFileSync(templatePath, "utf-8");

    // Extract URL, query parameters, and route parameters
    const url = req.originalUrl;
    const queryParams = req.query;
    const routeParams = req.params;

    console.log("URL:", url);
    console.log("Query Parameters:", queryParams);
    console.log("Route Parameters:", routeParams);

    // Fetch dynamic data from an API
    const apiUrl = `https://fakestoreapi.com${routeParams[0]}`;
    let responseData = {};

    try {
      const response = await axios.get(apiUrl);
      responseData = response.data;
    } catch (apiError) {
      console.warn("API request failed:", apiError.message);
    }

    // Generate dynamic meta tags
    const metaTags = `
      <meta charset="UTF-8">
      <title>${responseData.title || "Vite + React + SEO"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="${responseData.description || "SEO-friendly React SSR App"}">
      <meta name="keywords" content="${responseData.category || "Store"}">
      <meta name="robots" content="index, follow">
      <meta property="og:title" content="${responseData.title || "Vite + React + SEO"}" />
      <meta property="og:type" content="${responseData.category || "Store"}"/>
      <meta property="og:image" content="${responseData.image || ""}" />
    `;

    // Import the server entry file dynamically (ESM compatibility)
    const { render } = await import(path.join(__dirname, "dist/server/entry-server.js"));

    // Render the app and pass the data
    const appHtml = await render({ url, queryParams, routeParams });

    // Replace placeholders in the template
    const html = template
      .replace(`<!--outlet-->`, appHtml)
      .replace(`<!--helmet-->`, metaTags);

    // Send response
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    console.error("SSR Error:", error);
    res.status(500).end("Internal Server Error");
  }
});

// Export the Express app for Vercel
export default app;
