const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static('static'));

const indexRouter = require('./routes');

app.use('/', indexRouter);

app.use((req, res, next) => {
    res.status(404).send("404 ERROR")
});

app.listen(80, function() {
    console.log('서버시작')
});