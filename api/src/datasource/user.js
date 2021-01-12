const { DataSource } = require('apollo-datasource');
const authUtils = require('../util/auth');

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

        user.hash = authUtils.hashPassword(user.password);
        delete user.password;

        if (!user.avatar) {
            user.avatar = '/default-avatar.png';
        }
        user.email = user.email.toLowerCase();

        return await this.db.create(user);
    }

    async getUserById(id) {
        return await this.db.findById(id);
    }

    async getUserByEmail(email) {
        return await this.db.findOne({ email });
    }

    async updateUser(id, input) {
        const { _id, ...data } = input;

        if(data.password){
            data.hash = authUtils.hashPassword(data.password);
            delete data.password;
        }

        return await this.db.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
    }

}

module.exports = UserAPI;