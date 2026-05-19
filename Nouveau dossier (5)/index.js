const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Ce proxy imite un navigateur Chrome réel pour éviter le blocage 403
app.use('/', createProxyMiddleware({
    router: (req) => req.query.url,
    changeOrigin: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Referer': 'https://www.google.com/',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7'
    },
    onProxyRes: (proxyRes) => {
        // On supprime les restrictions de sécurité qui causent le "brz" / 404
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    }
}));

app.listen(3000);