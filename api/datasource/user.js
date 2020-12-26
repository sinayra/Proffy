const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class UserAPI extends DataSource {
    constructor(db) {
        super();
        this.db = db;
    }

    initialize(config) { }

    async getUsers() {
        return await this.db.find();
    }

    async addUser(user) {
        let {name, email, password, whatsapp, avatar, role} = user;

        //logic to hash the password
        const hash = password;

        if(!avatar){
            avatar = '/default-avatar.png';
        }

        return await this.db.create({
            name,
            email,
            hash,
            whatsapp,
            avatar,
            role
        });
    }

    async getUserById(id) {
        return await this.db.findById(id);
    }

}

module.exports = UserAPI;