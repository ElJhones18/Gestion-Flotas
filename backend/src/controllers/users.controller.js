const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const { email, username, lastname, rol, active_user } = req.body;
    console.log(req.body);
    const avatar = req.file ? req.file.filename : "cocacola-logo.jpg";
    console.log(avatar);

    try {
        const newUser = await prisma.users.create({
            data: {
                email: email,
                username: username,
                lastname: lastname,
                rol: rol,
                avatar: avatar,
                active_user: false,
            },
        });


        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};


const listUsers = async (req, res) => {
    try {
        const allUsers = await prisma.users.findMany();
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
    }
}

const getUser = async (req, res) => {
    try {
        const user = await prisma.users.findUnique({ where: { id: req.params.id } });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el usuario');
    }
}

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            email,
            username,
            lastname,
            rol,
            active_user,
            createdAt,
            updatesAt,
        } = req.body;

        const existingUser = await prisma.users.findUnique({ where: { id: id } });

        const avatar = req.file ? req.file.filename : existingUser.avatar;

        const userEdit = {
            email: email,
            username: username,
            lastname: lastname,
            rol: rol,
            avatar: avatar,
            active_user: active_user === 'true' ? true : false,
            createdAt: createdAt,
            updatesAt: updatesAt,

        };
        console.log(userEdit);
        const user = await prisma.users.update({
            where: { id: id },
            data: userEdit
        });
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.users.delete({
            where: { id: id }
        });
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

module.exports = {
    createUser,
    listUsers,
    getUser,
    editUser,
    deleteUser
}