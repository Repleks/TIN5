const http = require('http');
const url = require('url');

function calculate(operation, x, y) {
    switch (operation) {
        case 'plus':
            return x + y;
        case 'minus':
            return x - y;
        case 'mnozenie':
            return x * y;
        case 'dzielenie':
            return y !== 0 ? x / y : 'Error: dzielenie przez zero';
        default:
            return 'Nieznana operacja';
    }
}

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const pathname = url.parse(req.url, true).pathname.substring(1);

    const x = parseFloat(queryObject.x);
    const y = parseFloat(queryObject.y);

    if (Number.isNaN(x) || Number.isNaN(y)) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h1>Error: Nieprawidlowe parametry. Uzyj liczb w parametrach x i y.</h1>');
        return;
    }

    const result = calculate(pathname, x, y);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Wynik operacji ${pathname}: ${result}</h1>`);
});

server.listen(3000, () => {
    console.log('Serwer działa na http://localhost:3000');
});
