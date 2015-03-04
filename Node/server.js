var connect = require('connect');
var serveStatic = require('serve-static')
var app = connect()
app.use(serveStatic("../App",  {'index': ['app.html']}));
app.listen(5000);
console.log("port is open");