const { DataSource } = require('apollo-datasource');
const authUtils = require('../util/auth');
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
        const { name, password, whatsapp, avatar } = input;

        if(name){
            await this.db.findByIdAndUpdate(id, { name });
        }

        if(password){
            const hash = authUtils.hashPassword(password);
            await this.db.findByIdAndUpdate(id, { hash });
        }

        if(whatsapp){
            await this.db.findByIdAndUpdate(id, { whatsapp });
        }

        if(avatar){
            await this.db.findByIdAndUpdate(id, { avatar });
        }

        return this.getUserById(id);
    }

}

module.exports = UserAPI;