module.exports = {
    mongoClient: null,
    app: null,
    database: "musicStore",
    collectionName: "favourites",
    init: function (app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    },

    addFavourite: function (song, callbackFunction) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const favourites = database.collection(this.collectionName);
                favourites.insertOne(song)
                    .then(result => callbackFunction(result.insertedId))
                    .then(() => this.dbClient.close())
                    .catch(err => callbackFunction({error: err.message}));
            })
            .catch(err => callbackFunction({error: err.message}))
    },

    deleteFavourite: function (id) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const favourites = database.collection(this.collectionName);
                favourites.deleteOne({ _id: id }, function(err, result) {
                    if (err) {
                        console.error('Error al eliminar el objeto:', err);
                        return;
                    }

                    console.log('Objeto eliminado correctamente:', result);
                });
            })
    },

    getFavourites: async function (filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favouriteCollection = database.collection(this.collectionName);
            const favourites = await favouriteCollection.find(filter, options).toArray();
            return favourites;
        } catch (error) {
            throw (error);
        }
    },

    findFavourite: async function (filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favouritesCollection = database.collection(this.collectionName);
            const favourite = await favouritesCollection.findOne(filter, options);
            return favourite;
        } catch (error) {
            throw (error);
        }
    },
}