const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const fs = require('fs');

const app = express();

// Define your projects and their paths
const projects = [
  { path: '/erp', target: 'https://develop.localhost.com:4401' },
  { path: '/accounting', target: 'https://develop.localhost.com:4402' },
  { path: '/hr', target: 'https://develop.localhost.com:4403' },
  { path: '/finance', target: 'https://develop.localhost.com:4404' },
  { path: '/sales', target: 'https://develop.localhost.com:4405' },
  { path: '/purchase', target: 'https://develop.localhost.com:4406' },
  { path: '/inventory', target: 'https://develop.localhost.com:4407' },
];

projects.forEach(({ path, target }) => {
  const proxyOptions = {
    target,
    changeOrigin: true,
    secure: false, // Enable SSL
    agent: https.globalAgent, // Use global agent
    // ca: fs.readFileSync('ssl\\localhost.crt') // Provide the certificate authority
  };
  app.use(path, createProxyMiddleware(proxyOptions));
});

const defaultPath = projects.length > 0 ? projects[0].path : '/';
app.get('/', (req, res) => res.redirect(defaultPath));

// SSL certificate options
const options = {
  key: fs.readFileSync('ssl\\localhost.key'),
  cert: fs.readFileSync('ssl\\localhost.crt'),
};

// Start the HTTPS server
const port = 4400; // Default HTTPS port
https.createServer(options, app).listen(port, 'develop.localhost.com', () => {
  console.log(`Gateway server running on https://develop.localhost.com:${port}`);
});
