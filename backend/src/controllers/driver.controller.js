const { Prisma, PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createDriver = async (req, res) => {
    const { username, lastname, cedula, phone, email, performance_driver, tasks } = req.body;
    try {
        const newDriver = await prisma.drivers.create({
            data: {
                username: username,
                lastname: lastname,
                cedula: cedula,
                phone: phone,
                email: email,
                performance_driver: performance_driver,
                tasks: {
                    create: {
                        type: tasks.type,
                        description: tasks.description,
                        state: tasks.state
                    }
                }
            }
        })
        res.json(newDriver);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el conductor' });
    }
};

const listDriver = async (req, res) => {
    try {
        const driver = await prisma.drivers.findMany();
        res.json(driver);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar los conductores' });
    }
};

const getDriver = async (req, res) => {
    try {
        const driver = await prisma.drivers.findUnique({
            where: {
                id: req.params.id
            }
        });
        res.json(driver);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el conductor' });
    }
};

const editDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            username,
            lastname,
            cedula,
            phone,
            email,
            performance_driver,
            tasks
        } = req.body;

        // Obtener el conductor existente
        const driverExistente = await prisma.drivers.findUnique({
            where: { id: id },
            include: {
                tasks: true,
            },
        });

        if (!driverExistente) {
            return res.status(404).json({ error: 'Conductor no encontrado' });
        }

        // Actualizar solo los campos proporcionados
        const driverEdit = {
            username: username || driverExistente.username,
            lastname: lastname || driverExistente.lastname,
            cedula: cedula || driverExistente.cedula,
            phone: phone || driverExistente.phone,
            email: email || driverExistente.email,
            performance_driver: performance_driver || driverExistente.performance_driver,
        };

        if (tasks && tasks.id) {
            driverEdit.tasks = {
                update: {
                    where: { id: tasks.id },  // Usar tasks.id para identificar la tarea
                    data: {
                        type: tasks.type || undefined,
                        description: tasks.description || undefined,
                        state: tasks.state || undefined,
                    },
                },
            };
        }

        // Actualizar el conductor
        const driverUpdate = await prisma.drivers.update({
            where: { id: id },
            data: driverEdit,
            include: {
                tasks: true,
            },
        });

        res.status(200).json(driverUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al editar el conductor' });
    }
};

const deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;

        //eliminar las tareas asociadas al conductor
        await prisma.Tasks.deleteMany({
            where: { driverId: id }
        });

        const driverDelete = await prisma.drivers.delete({
            where: { id }
        });

        res.status(200).json(driverDelete);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el conductor' });
    }
};

module.exports = {
    createDriver,
    listDriver,
    getDriver,
    editDriver,
    deleteDriver,
}