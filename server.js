var express = require('express'); 
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express();

app.engine('handlebars', handlebars({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routes = require('./routes/index');
app.use("/", routes);

app.listen(3000);

