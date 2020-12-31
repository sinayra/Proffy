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
        let { name, email, password, whatsapp, avatar, role } = user;

        const hash = authUtils.hashPassword(password);

        if (!avatar) {
            avatar = '/default-avatar.png';
        }
        email = email.toLowerCase();

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