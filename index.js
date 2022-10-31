//
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    //Create a dynamic filePath
    let filePath = path.join(__dirname, 'pages', request.url === '/' ? 'index.html' : request.url);

    //Error path
    let errorPagePath = path.join(__dirname, 'pages', '404.html');  

    // reading the file
    fs.readFile(filePath, 'utf8', (error, content) => {
        if (error) {
            if(error === 'ENOENT') {
                fs.readFile(errorPagePath, 'utf8', (error, content) => {
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.end(content)
                });
            } else {
                response.writeHead(500);
                response.end('A Server error has occurred')
            }
        } else {
            response.writeHead(200, {'Content-Type':'text/html'});
            response.end(content);
        }
    })
});

const port = 4000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})