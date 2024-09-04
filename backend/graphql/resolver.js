// Create a random id for our "database".
// var id = require("crypto").randomBytes(10).toString("hex")

const bcrypt = require('bcrypt');
const User = require('../model/userModel');

module.exports = {
    test() {
        return 'Hello!!!';
    },
    // Получить список пользователей и их численность
    async getUsers() {
        try {
            // return await User.findAll() or code below:
            const { count, rows } = await User.findAndCountAll();
            return { count, rows };
            // console.log(rows[0].dataValues, count);
        } catch (error) {
            throw new Error('Fetch users is not availible.');
        }
    },
    // Получить одного пользователя (для редактирования)
    async getOneUser({ id_found }) {
        // console.log({ id_found });
        try {
            const user = await User.findOne({
                where: {
                    id: id_found,
                },
            });
            return user;
        } catch (error) {
            throw new Error('Fetch OneUser is not availible.');
        }
    },
    // Создать пользователя
    async createUser({ input }) {
        // console.log(input);
        const hashPassword = await bcrypt.hash(input.password, 10);
        try {
            const user = await User.create({
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                password: hashPassword,
            });
            return user;
        } catch (e) {
            throw new Error('Server error');
        }
    },
    // Обновить пользователя
    async updateUser({ id_found, input }) {
        try {
            await User.update(
                {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                },
                {
                    where: {
                        id: id_found,
                    },
                }
            );
            // console.log('user: ', user);
            return input;
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Server error',
            });
        }
    },
    // Удалить пользователя
    async deleteUser({ id_found }) {
        try {
            await User.destroy({
                where: {
                    id: id_found,
                },
            });
            return true;
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Server error',
            });
        }
    },
};
