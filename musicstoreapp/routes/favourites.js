const {ObjectId} = require("mongodb");
module.exports = function (app, songsRepository, favouritesRepository) {

    app.get('/songs/favourites', function(req, res){
        //Listar los favoritos
        let filter = {};
        let options = {};
        favouritesRepository.getFavourites(filter, options).then(favourites => {
            res.render("favourites/favourites.twig", {favourites: favourites});
        }).catch( error => res.send("Error: " + error))

    })

    app.post('/songs/favourites/add/:id', function(req, res){
        // Método para añadir una cancion a favoritos
        //res.send("Canción " + song + " añadida a favoritos");

        let id = req.params.id;
        let filter = {_id: new ObjectId(id)};
        songsRepository.findSong(filter, {}).then(song => {
            try{
                favouritesRepository.addFavourite(song, (id) => {
                    res.redirect("/songs/favourites")
                })
            } catch{
                res.send("Se ha producido un error al añadir como favorita la canción " + error)
            }
        }).catch(error => {
            res.send("Se ha producido un error al recuperar la canción " + error)
        });
    })

    app.post('/songs/favourites/delete/:id', function(req, res){
        try {
            favouritesRepository.deleteFavourite(new ObjectId(req.params.id));
            res.redirect("/songs/favourites");
        } catch (error) {
            res.send("Se ha producido un error al eliminar de favoritos la canción " + error);
        }
    });

};