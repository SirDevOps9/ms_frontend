const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define your projects and their paths
const projects = [
  { path: '/bussiness-owners', target: 'http://localhost:4301' },
  { path: '/admin-portal', target: 'http://localhost:4303' },
  // Add more projects as needed
];

// Create proxy middleware for each project
projects.forEach(({ path, target }) => {
  app.use(path, createProxyMiddleware({ target, changeOrigin: true }));
});
const defaultPath = projects.length > 0 ? projects[0].path : '/';
app.get('/', (req, res) => res.redirect(defaultPath));

// Start the server
const port = 4300;
app.listen(port, () => {
  console.log(`Gateway server running on http://localhost:${port}`);
});
