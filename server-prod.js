import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import axios from 'axios';

const app = express();

// Serve static files from the 'dist/client' directory
app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist/client'), { index: false }));

app.use('*', async (req, res) => {
  try {
    // Read the HTML template
    const template = fs.readFileSync('./dist/client/index.html', 'utf-8');

    // Extract URL, query parameters, and route parameters
    const url = req.originalUrl; // Full URL
    const queryParams = req.query; // Query parameters (e.g., ?name=John)
    const routeParams = req.params; // Route parameters (e.g., /users/:id)

    console.log('URL:', url);
    console.log('Query Parameters:', queryParams);
    console.log('Route Parameters:', routeParams);

    // Example: Fetch data from an API using query or route parameters
    const response = await axios.get(`https://fakestoreapi.com${routeParams[0]}`);

    const metaTags = `<meta charset="UTF-8">
    <title>${response.data.title ?? "Vite + React + SEO"}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${response.data.description ?? "The goal is to improve the site’s ranking on search engine results pages (SERP) for specific keywords."}">
    <meta name="keywords" content="${response.data.category ?? "Store"}">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="${response.data.title ?? "Vite + React + SEO"}" />
    <meta property="og:type" content="${response.data.category ?? "Store"}"/>
    <meta property="og:image" content="${response.data.image}" />
    `


    // Dynamically import the server entry point
    const { render } = await import('./dist/server/entry-server.js');

    // Render the app and pass the URL, query, and params to the render function
    const appHtml = render({ url, queryParams, routeParams });

    // Replace placeholders in the template with the rendered app and Helmet data
    const html = template
      .replace(`<!--outlet-->`, appHtml)
      .replace(`<!--helmet-->`, metaTags);

    // Send the final HTML to the client
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
});

app.listen(5173, () => {
  console.log('http://localhost:5173.');
});