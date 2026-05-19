const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

// Route "Santé" pour que Render ne coupe pas le cycle
app.get('/', (req, res) => {
    res.send('Proxy Aura est en ligne. Utilise /proxy?url=https://ton-site.com');
});

// Ton Proxy
app.use('/proxy', createProxyMiddleware({
    router: (req) => req.query.url,
    changeOrigin: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    }
}));

app.listen(port, () => console.log(`Serveur prêt sur le port ${port}`));
