"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    app.get('/', (req, res) => {
        res.render('index.html');
    });
    app.get('/article.html', (req, res) => {
        res.render('article.html');
    });
    app.get('/details.html', (req, res) => {
        res.render('details.html');
    });
    app.get('/notes.html', (req, res) => {
        res.render('notes.html');
    });
    app.get('/words.html', (req, res) => {
        res.render('words.html');
    });
    app.get('/tag.html', (req, res) => {
        res.render('tag.html');
    });
    app.get('/about.html', (req, res) => {
        res.render('about.html');
    });
}
exports.default = default_1;
