const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/userModel.js');

const router = Router();

// Создание нового пользователя
router.post('/add', async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.firstName, 10);
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
        });
        res.status(201).json({ user });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error',
        });
    }
});
// Редактирование пользователя
router.put('/edit/:id', async (req, res) => {
    try {
        await User.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            },
            {
                where: {
                    id: +req.params.id,
                },
            }
        );
        res.status(201).send('User updated');
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error',
        });
    }
});

// Удаление пользователя
router.delete('/:id', async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: +req.params.id,
            },
        });
        res.status(204).json({});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error',
        });
    }
});

// Получение списка users
// const { count, rows } = await Project.findAndCountAll({
//   });

router.get('/all', async (req, res) => {
    try {
        const { count, rows } = await User.findAndCountAll();
        res.status(200).send({ count, rows });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error',
        });
    }
});
// router.get('/all', async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.status(200).send(users);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//             message: 'Server error',
//         });
//     }
// });

// ПОлучение выбранного user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                id: +req.params.id,
            },
        });

        res.status(200).send(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error',
        });
    }
});

module.exports = router;
