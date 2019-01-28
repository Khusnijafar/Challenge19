var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync("./router/data.json", "utf8"));
var app = express();

const writeData = (data) => {
    fs.writeFileSync("./router/data.json", JSON.stringify(data, null, 3), "utf8")
}

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')))


// berkunjung ke router http://localhost:3000/
app.get('/', (req, res) => {
    res.render('index', {
        data: data
    })
})

// berkunjung ke router http://localhost:3000/add
app.get('/add', (req, res) => {
    res.render('add')
})

app.get('/edit/:id', (req, res) => {
    let id = req.params.id
    let item = data[id]
    // console.log(data);
    res.render('edit', {
        item, id
    })

})

// berkunjung ke router http://localhost:3000/add dengan metode post
app.post('/add', (req, res) => {
    data.push({
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    })
    writeData(data)
    res.redirect('/')
})

app.post('/edit/:id', (req, res) => {
    let id = req.params.id
    data[id] = {
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    }
    writeData(data)
    res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
    let id = req.params.id
    data.splice(id, 1)
    writeData(data)
    res.redirect('/');
})

app.listen(3000, function () {
    console.log('Server started on Port 3000...');

})