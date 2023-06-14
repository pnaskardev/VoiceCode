import express from 'express';

import {createProxyMiddleware} from 'http-proxy-middleware';

const app = express();

const apiProxy = createProxyMiddleware('/log', {
    target: 'http://localhost:3000/api/users',
    changeOrigin: true,
});

app.use('/log', apiProxy);

app.listen(3001, () => {
    console.log('Proxy server is running at port 3001');
});