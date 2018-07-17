const http = require('http');
const fs = require('fs');

let httpServer = http.createServer((req, res) => {
    let contenType={
        text_html: "text/html",
        text_plain: "text/plain",
        application_json: "application/json",
        application_javascript: "application/javascript"
    }

    console.log(`origin res ${req.url}`);
    let url = req.url.split('?')[0];
    console.log(url);
	if (url === '/') {
        console.log("default url")
		url = '/index.html';
	}
	let fstream = fs.createReadStream(__dirname + url);
	fstream.on('open', () => {
		res.writeHead(200, {
            //'Content-Length': Buffer.byteLength(body),
            //'Content-Type': contenType.text_html
        });
        fstream.pipe(res);
    });
    fstream.on("data", (chunk)=>{
        console.log(chunk);
    });
	fstream.on('error', er => {
		console.log(er);
		res.writeHead(404);
		res.write(`<h1>Page '${url}' not found</h1>`);
	});
})
httpServer.on('error', er => {
	console.log(er);
});
httpServer.listen(8011);
console.log("server start listen on port 8011")
