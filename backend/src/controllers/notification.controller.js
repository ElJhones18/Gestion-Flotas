const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createNotification = async (req, res) => {
    const { type, description, read, userId } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Crear la nueva notificacion si el usuario existe
        const newNotification = await prisma.notification.create({
            data: {
                type: type,
                description: description,
                read: read,
                userId: userId
            }
        });

        res.json(newNotification);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear la notificacion' });
    }
};

const listNotifications = async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany();
        res.json(notifications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar las notificaciones' });
    }
};

const getNotification = async (req, res) => {
    try {
        const notification = await prisma.notification.findUnique({
            where: {
                id: req.params.id
            }
        });
        res.json(notification);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la notificación' });
    }
};

const editNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            type,
            description,
            read,
            userId,
        } = req.body;
        const notification = await prisma.notification.update({
            where: { id: id },
            data: {
                type: type,
                description: description,
                read: read,
                userId: userId
            }
        });
        res.json(notification);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al editar la notificación' });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await prisma.notification.delete({
            where: { id: id }
        });
        res.json(notification);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la notificación' });
    }
};

module.exports = {
    createNotification,
    listNotifications,
    getNotification,
    editNotification,
    deleteNotification
};