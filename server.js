const http = require('http');
var fs = require('fs');

//for operating system (OS) info
const os = require('os');
const { uptime } = require('process');
const host = '127.0.0.1';
const port = 500;

const server = http.createServer((req, res) => {

    console.log(req.method);
    console.log(req.url);

    /*initializing the url, saving the visited route in a constant*/
    const path = req.url;

    if (path == '/') {

        //setting the header type
        res.setHeader('Content-Type', 'text/html');
        fs.readFile("./pages/index.html", "UTF-8", function(err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });

    } else if (path == '/sys') {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');
        //fetching the system info into a constant
        const systemInfo = {

            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            numberOfCPUS: os.cpus(),
            networkInterfaces: os.networkInterfaces(),
            uptime: os.uptime()
        };

        //storing the system info in a different constant
        const sysInfo = JSON.stringify(systemInfo);
        fs.writeFile('osinfo.json', sysInfo, function(err, data) {
            if (err) {
                console.log(JSON.stringify(err));
            }
            console.log(`System info: ${sysInfo}`);


        });
        console.log(sysInfo);

        //writing the success msg info to the client
        res.end("Your OS info has been saved successfully!" + `${sysInfo}`);

    } else if (path == '/about') {

        fs.readFile("./pages/about.html", "UTF-8", function(err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });


    } else {
        fs.readFile("./pages/404.html", "UTF-8", function(err, html) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(html);
        });

    };

}); //closing the request server closure

server.listen(port, host, () => {

    console.log(`Running at port: ${port} on host: ${host}`);

})