const http = require('http');
const host = '127.0.0.1'
const port = 300;

const fs = require('fs');
//for operating system (OS) info
const os = require('os');
const { uptime } = require('process');

const server = http.createServer((requ, resp) => {
    console.log(requ.method);
    console.log(requ.url);

    const path = requ.url;
    if (path == '/yes') {
        fs.readFile('./yes7.jpg', function(err, img) {
            resp.writeHead(200, { 'Content-Type': 'image/jpg' });
            resp.end(img);
        });
    } else if (path == '/pet') {
        fs.readFile("./pages/about.html", "UTF-8", function(err, html) {
            resp.writeHead(200, { "Content-Type": "text/html" });
            resp.end(html);
        });

    } else {
        resp.writeHead(404, { "Content-Type": "text/plain" });
        resp.end('Server not found');
    }
});
server.listen(port, host, () => {
    console.log(`server is ruuning on ${port} : ${host}`);
})