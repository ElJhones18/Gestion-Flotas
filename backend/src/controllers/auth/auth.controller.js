const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const signup = async (req, res) => {
    const { email, password, username, lastname, cedula, phone } = req.body;

    let user = await prisma.users.findFirst({
        where: {
            email: email
        }
    });
    if (user) {
        return res.status(400).json({ message: "The user already exists" });
    }
    user = await prisma.users.create({
        data: {
            email: email,
            password: bcrypt.hashSync(password, 10),
            username: username,
            lastname: lastname,
            cedula: cedula,
            phone: phone,
            rol: "Conductor",
            active_user: false
        }
    });
    res.status(200).json(user);
};

module.exports = {
    signup
};