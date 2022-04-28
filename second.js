const http = require('http');
const host = '127.0.0.1';
const port = '5000';

const serv = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`my second programmming of javascript`);
});
serv.listen(port, host, () => {
    console.log(`server request running at ${port} : ${host}`)
})