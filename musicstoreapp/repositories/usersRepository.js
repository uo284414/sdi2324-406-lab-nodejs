module.exports = {
    mongoClient: null,
    app: null,
    database: "musicStore",
    collectionName: "users",
    init: function (app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    }, findUser: async function (filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const usersCollection = database.collection(this.collectionName);
            const user = await usersCollection.findOne(filter, options);
            return user;
        } catch (error) {
            throw (error);
        }
    }
};