const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTask = async (req, res) => {
    const { type, description, state, driverId } = req.body;
    
    try {
        
        // Verificar si el driver existe
        const driver = await prisma.drivers.findUnique({
            where: {
                id: driverId
            }
        });

        if (!driver) {
            return res.status(404).json({ error: 'Driver no encontrado' });
        }

        // Crear la nueva tarea si el driver existe
        const newTask = await prisma.tasks.create({
            data: {
                type: type,
                description: description,
                state: state,
                driverId: driverId
            }
        });

        res.json(newTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
};


const listTask = async (req, res) => {
    try {
        const task = await prisma.tasks.findMany();
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar las tareas' });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await prisma.tasks.findUnique({
            where: {
                id: req.params.id
            }
        });
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};

const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            type,
            description,
            state,
            driverId,
        } = req.body;
        const task = await prisma.tasks.update({
            where: { id: id },
            data: {
                type: type,
                description: description,
                state: state,
                driverId: driverId
            }
        });
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al editar la tarea' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await prisma.tasks.delete({
            where: { id: id }
        });
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};

module.exports = {
    createTask,
    listTask,
    getTask,
    editTask,
    deleteTask,
}