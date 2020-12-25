const { DataSource } = require('apollo-datasource');
const _ = require('lodash');
const users = [];

class UserAPI extends DataSource {
    constructor(db) {
        super();
        this.db = db;
    }

    initialize(config) { }

    getUsers() {
        return this.db.find();
    }

    async addUser(user) {
        const newUser = await this.db.create(user);
        return newUser;
    }

}

module.exports = UserAPI;