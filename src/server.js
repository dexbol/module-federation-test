import http from 'node:http';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const dirName = path.dirname(fileURLToPath(import.meta.url));

http.createServer(async (req, res) => {
    var {pathname} = new URL(req.url, 'http://localhost:3000');

    if (/\.js$/.test(pathname)) {
        return fs.readFile(`.${pathname}`, 'utf-8').then((data) => {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end(data);
        });
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(await fs.readFile(path.join(dirName, 'index.html'), 'utf-8'));
}).listen(3000);

console.log('\nPlease Visit: http://localhost:3000');
