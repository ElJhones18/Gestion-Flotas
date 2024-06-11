const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createChecklist = async (req, res) => {
    const { coolant, oil_level, tire_pressure, lights, truckId } = req.body;
    try {

        if (!truckId) {
            return res.status(400).json({ error: 'El ID del camión es requerido' });
        }

        //validar que el conductor y el camion existan
        const truckExist = await prisma.truck.findUnique({
            where: {
                id: truckId
            }
        });

        if (!truckExist) {
            return res.status(400).json({ error: 'El camion no existe' });
        }

        const newChecklist = await prisma.checklist.create({
            data: {
                coolant: coolant,
                oil_level: oil_level,
                tire_pressure: tire_pressure,
                lights: lights,
                truckId: truckId
            }
        });
        res.json(newChecklist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el checklist' });
    }
}

const listChecklist = async (req, res) => {
    try {
        const checkout = await prisma.checklist.findMany();
        res.json(checkout);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar los checklist' });
    }
}

const getChecklist = async (req, res) => {
    try {
        const checkout = await prisma.checklist.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                truck: true
            }
        });
        res.json(checkout);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el checklist' });
    }
}

const editChecklist = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            coolant,
            oil_level,
            tire_pressure,
            lights,
            truckId
        } = req.body;

        const checkoutExist = await prisma.checklist.findUnique({
            where: {
                id: id
            }
        });

        if (!checkoutExist) {
            return res.status(404).json({ error: 'El checklist no existe' });
        }

        const checklistEdit = {
            coolant: (coolant !== undefined) ? coolant : checkoutExist.coolant,
            oil_level: (oil_level !== undefined) ? oil_level : checkoutExist.oil_level,
            tire_pressure: (tire_pressure !== undefined) ? tire_pressure : checkoutExist.tire_pressure,
            lights: (lights !== undefined) ? lights : checkoutExist.lights,
            truckId: (truckId !== undefined) ? truckId : checkoutExist.truckId
        };
        

        const checkout = await prisma.checklist.update({
            where: { id: id },
            data: checklistEdit
        });
        res.json(checkout);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al editar el checklist' });
    }
}

const deleteChecklist = async (req, res) => {
    try {
        const { id } = req.params;
        const checklist = await prisma.checklist.delete({
            where: { id: id }
        });
        res.json(checklist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el checklist' });
    }
}

module.exports = {
    createChecklist,
    listChecklist,
    getChecklist,
    editChecklist,
    deleteChecklist
}