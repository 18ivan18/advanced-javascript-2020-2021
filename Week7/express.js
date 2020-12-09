const http = require("http");
const pathToRegex = require('path-to-regex');
const parser = new pathToRegex(':path*');

function express() {
    this.requestTypesWithBody = ['POST', 'GET'];
    this.routers = {
        "GET": [],
        "POST": []
    }
    this.server = http.createServer((req, res) => {
        const requestType = req.method;
        const routeHandler = (this.routers[requestType].find(({regEx}) => regEx.match(req.url)) || null);
        if (!routeHandler) {
            res.statusCode = 404;
            res.end();
            return;
        }
        const {handler, regEx} = routeHandler;
        req.routeParams = regEx.match(req.url);
        if (!this.requestTypesWithBody.includes(requestType)) {
            handler(req, res);  
            return; 
        }
        getBody(req).then(body => handler({...req, body}, res));

    })
} 

const getBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            resolve(body);
        }).on('error', (err) => reject(err));
    }) 
}

express.prototype.get = function(path, handler) {
    const regEx = new pathToRegex(path);
    this.routers.GET.push({regEx, handler});
}

express.prototype.use = function(cb) {

}

express.prototype.post = function(path, handler) {
    const regEx = new pathToRegex(path);
    this.routers.POST.push({regEx, handler});
}

express.prototype.listen = function(port, cb) {
    this.server.listen(port, cb);
}


module.exports = express;