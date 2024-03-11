let express = require('express');
let router = express.Router();

module.exports = function (app) {

    app.get("/authors", function (req, res) {
        let authors = [{
            "nombre":"Alberto García",
            "grupo":"Alberto&García",
            "rol":"Cantante"
        },{
            "nombre":"Manuel García",
            "grupo":"Alberto&García",
            "rol":"Saxofonista"
        },{
            "nombre":"Victor Gil Mateos",
            "grupo":"Alberto&García",
            "rol":"Guitarrista"
        }];

        let response = {
            seller:"Autores",
            authors:authors
        };

        res.render("authors/authors.twig", response);
    });

    app.get("/authors/add", function (req, res){
        res.render("authors/add.twig");
    });

    app.post("/authors/add", function (req, res){
        let response = "Autor agregado: " + "<br>";

        if (req.body.nombre === undefined || req.body.nombre === null || req.body.nombre.trim().length === 0){
            response += "Nombre no enviado en la petición" + "<br>";
        } else {
            response += "Nombre del autor: " + req.body.nombre + "<br>";
        }

        if (req.body.grupo === undefined || req.body.grupo === null || req.body.grupo.trim().length === 0){
            response += "Grupo no enviado en la petición" + "<br>";
        } else {
            response += "Grupo del autor: " + req.body.grupo + "<br>";
        }

        if (req.body.rol === undefined || req.body.rol === null || req.body.rol.trim().length === 0){
            response += "Rol no enviado en la petición" + "<br>";
        } else {
            response += "Rol del autor: " + req.body.rol + "<br>";
        }

        res.send(response);
    });

    app.get('/author*', function (req, res) {
        res.redirect('/authors');
    });
}